import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { BookingPayload } from "./types";

// Bộ nhớ tạm thời (In-memory mock store) khi chạy ở chế độ Demo (chưa cấu hình Supabase)
const inMemoryBookings: Array<{
  booking_date: string;
  time_slot: string;
  partner_name: string;
  activity: string;
  custom_activity?: string;
  desired_location?: string;
  message?: string;
  contact_info?: string;
  created_at: string;
}> = [
  // Một số dữ liệu mẫu giả lập đã được đặt để người dùng thấy tính năng vô hiệu hóa khung giờ
];

// Kiểm tra xem URL có phải là URL mẫu hoặc không hợp lệ hay không
function isValidSupabaseUrl(url: string | undefined): boolean {
  if (!url) return false;
  const clean = url.trim().toLowerCase();
  if (
    clean.includes("your-project") ||
    clean.includes("xxx.supabase.co") ||
    clean.includes("example.com") ||
    !clean.startsWith("https://")
  ) {
    return false;
  }
  try {
    const parsed = new URL(clean);
    return parsed.hostname.endsWith(".supabase.co");
  } catch {
    return false;
  }
}

// Khởi tạo Supabase Client an toàn trên Server
function getSupabaseClient(): SupabaseClient | null {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const rawKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!rawUrl || !rawKey || !isValidSupabaseUrl(rawUrl)) {
    return null; // Đang chạy ở chế độ Demo / URL chưa được cấu hình thật
  }

  const supabaseUrl = rawUrl.trim();
  const supabaseKey = rawKey.trim();

  return createClient(supabaseUrl, supabaseKey);
}

/**
 * Lấy danh sách các khung giờ đã được đặt trong ngày
 */
export async function getBookedSlotsForDate(date: string): Promise<string[]> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    // Chế độ Demo: Lấy từ inMemoryBookings
    return inMemoryBookings
      .filter((b) => b.booking_date === date)
      .map((b) => b.time_slot);
  }

  try {
    const { data, error } = await supabase
      .from("dating_bookings")
      .select("time_slot")
      .eq("booking_date", date)
      .neq("status", "cancelled");

    if (error) {
      console.warn("Lỗi khi truy vấn Supabase (fallback về rỗng):", error.message);
      return [];
    }

    return (data || []).map((row) => row.time_slot);
  } catch (err) {
    console.error("Lỗi kết nối Supabase:", err);
    return [];
  }
}

/**
 * Lưu lịch hẹn mới vào Supabase hoặc Demo Store
 */
export async function saveBooking(payload: BookingPayload): Promise<{
  success: boolean;
  data?: any;
  error?: string;
  isDemo?: boolean;
}> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    // Chế độ Demo
    console.log("🌸 [DEMO MODE] Đang lưu lịch hẹn vào bộ nhớ tạm thời:", payload);
    
    // Kiểm tra xem khung giờ đã bị đặt chưa trong bộ nhớ tạm
    const isAlreadyBooked = inMemoryBookings.some(
      (b) =>
        b.booking_date === payload.booking_date &&
        b.time_slot === payload.time_slot
    );

    if (isAlreadyBooked) {
      return {
        success: false,
        error: "Khung giờ này vừa có người đặt mất rồi. Em chọn khung giờ khác nhé!",
      };
    }

    const mockBooking = {
      ...payload,
      id: "demo-" + Math.random().toString(36).substring(2, 9),
      created_at: new Date().toISOString(),
    };

    inMemoryBookings.push(mockBooking);

    return {
      success: true,
      data: mockBooking,
      isDemo: true,
    };
  }

  try {
    // Kiểm tra trùng lịch trên Supabase
    const { data: existing } = await supabase
      .from("dating_bookings")
      .select("id")
      .eq("booking_date", payload.booking_date)
      .eq("time_slot", payload.time_slot)
      .neq("status", "cancelled")
      .maybeSingle();

    if (existing) {
      return {
        success: false,
        error: "Khung giờ này vừa có người đặt rồi. Em chọn khung giờ khác nhé!",
      };
    }

    const { data, error } = await supabase
      .from("dating_bookings")
      .insert([
        {
          booking_date: payload.booking_date,
          time_slot: payload.time_slot,
          partner_name: payload.partner_name,
          activity: payload.activity,
          custom_activity: payload.custom_activity || null,
          desired_location: payload.desired_location || null,
          message: payload.message || null,
          contact_info: payload.contact_info || null,
          status: "confirmed",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Lỗi Supabase khi lưu:", error);
      if (error.code === "23505") {
        return {
          success: false,
          error: "Khung giờ này đã được đặt trước đó rồi! Em chọn khung giờ khác nhé ❤️",
        };
      }

      // Nếu lỗi do URL sai, mất mạng hoặc fetch failed, tự động chuyển sang lưu tạm để không làm gián đoạn người đặt
      if (error.message?.includes("fetch failed") || error.message?.includes("network")) {
        console.warn("⚠️ [SUPABASE KẾT NỐI THẤT BẠI - TỰ ĐỘNG LƯU DỰ PHÒNG]:", error.message);
        const mockBooking = {
          ...payload,
          id: "fallback-" + Math.random().toString(36).substring(2, 9),
          created_at: new Date().toISOString(),
        };
        inMemoryBookings.push(mockBooking);
        return {
          success: true,
          data: mockBooking,
          isDemo: true,
        };
      }

      return {
        success: false,
        error: "Không thể kết nối cơ sở dữ liệu: " + error.message,
      };
    }

    return {
      success: true,
      data,
      isDemo: false,
    };
  } catch (err: any) {
    console.error("Lỗi ngoại lệ khi lưu Supabase:", err);
    
    // Nếu gặp lỗi mạng / fetch failed ở tầng ngoại lệ, cũng tự động lưu dự phòng
    if (err.message?.includes("fetch failed") || err.message?.includes("network")) {
      console.warn("⚠️ [NGOẠI LỆ FETCH FAILED - TỰ ĐỘNG LƯU DỰ PHÒNG]:", err.message);
      const mockBooking = {
        ...payload,
        id: "fallback-" + Math.random().toString(36).substring(2, 9),
        created_at: new Date().toISOString(),
      };
      inMemoryBookings.push(mockBooking);
      return {
        success: true,
        data: mockBooking,
        isDemo: true,
      };
    }

    return {
      success: false,
      error: "Không thể kết nối đến máy chủ: " + err.message,
    };
  }
}
