import { NextRequest, NextResponse } from "next/server";
import { BookingPayload, BookingResponse } from "@/lib/types";
import { saveBooking } from "@/lib/supabase";
import { sendNotificationEmail } from "@/lib/email";
import { DATING_CONFIG } from "@/config/dating";

export async function POST(request: NextRequest) {
  try {
    const body: BookingPayload = await request.json();

    // 1. CHỐNG SPAM BẰNG HONEYPOT
    // Nếu bot tự động điền trường ẩn bot_trap, chúng ta từ chối yêu cầu
    if (body.bot_trap && body.bot_trap.trim() !== "") {
      console.warn("🛡️ Phát hiện spam qua honeypot field, đã chặn request.");
      return NextResponse.json(
        { success: false, message: "Yêu cầu không hợp lệ." },
        { status: 400 }
      );
    }

    // 2. KIỂM TRA DỮ LIỆU ĐẦU VÀO (INPUT VALIDATION)
    const { partner_name, booking_date, time_slot, activity, custom_activity } = body;

    if (!partner_name || partner_name.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: "Em chưa nhập tên hoặc biệt danh kìa ❤️" },
        { status: 400 }
      );
    }

    if (partner_name.trim().length > 50) {
      return NextResponse.json(
        { success: false, message: "Tên nhập tối đa 50 ký tự nhé em." },
        { status: 400 }
      );
    }

    if (!booking_date || !time_slot) {
      return NextResponse.json(
        { success: false, message: "Vui lòng chọn ngày và khung giờ hẹn nhé." },
        { status: 400 }
      );
    }

    // Kiểm tra không được chọn ngày trong quá khứ
    const selectedDate = new Date(booking_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return NextResponse.json(
        { success: false, message: "Ngày hẹn không thể là một ngày trong quá khứ được nè!" },
        { status: 400 }
      );
    }

    if (!activity || activity.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: "Em hãy chọn một hoạt động mà em thích nhé." },
        { status: 400 }
      );
    }

    if (activity === "Hoạt động khác" && (!custom_activity || custom_activity.trim().length === 0)) {
      return NextResponse.json(
        { success: false, message: "Em hãy nhập gợi ý hoạt động vào ô bên dưới nhé ❤️" },
        { status: 400 }
      );
    }

    // Làm sạch dữ liệu, chỉ lưu những thông tin người đặt chủ động nhập
    const cleanPayload: BookingPayload = {
      partner_name: partner_name.trim(),
      booking_date,
      time_slot: time_slot.trim(),
      activity: activity.trim(),
      custom_activity: custom_activity ? custom_activity.trim() : undefined,
      desired_location: body.desired_location ? body.desired_location.trim().slice(0, 200) : undefined,
      message: body.message ? body.message.trim().slice(0, 1000) : undefined,
      contact_info: body.contact_info ? body.contact_info.trim().slice(0, 100) : undefined,
    };

    // 3. LƯU VÀO CƠ SỞ DỮ LIỆU (SUPABASE / DEMO STORE)
    const saveResult = await saveBooking(cleanPayload);

    if (!saveResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: saveResult.error || "Không thể đặt khung giờ này, vui lòng thử lại.",
        },
        { status: 400 }
      );
    }

    // 4. GỬI EMAIL THÔNG BÁO CHO CHỦ LINK
    // Chạy ngầm hoặc bất đồng bộ để phản hồi cho người đặt lịch nhanh nhất
    sendNotificationEmail({
      booking: cleanPayload,
      created_at: saveResult.data?.created_at,
    }).catch((emailErr) => {
      console.error("Lỗi khi gửi email thông báo ngầm:", emailErr);
    });

    const responseData: BookingResponse = {
      success: true,
      message: DATING_CONFIG.successMessage,
      booking: saveResult.data,
      isDemo: saveResult.isDemo,
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error: any) {
    console.error("Lỗi xử lý đặt lịch:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Có lỗi xảy ra khi xử lý đặt lịch. Vui lòng thử lại sau.",
      },
      { status: 500 }
    );
  }
}
