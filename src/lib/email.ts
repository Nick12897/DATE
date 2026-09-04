import { Resend } from "resend";
import { BookingPayload } from "./types";
import { DATING_CONFIG } from "../config/dating";

interface SendEmailParams {
  booking: BookingPayload;
  created_at?: string;
}

/**
 * Gửi email thông báo cho chủ link khi đối phương đặt lịch
 */
export async function sendNotificationEmail({
  booking,
  created_at,
}: SendEmailParams): Promise<{ success: boolean; error?: string; isDemo?: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const ownerEmail = process.env.OWNER_EMAIL;
  const ownerName = process.env.NEXT_PUBLIC_OWNER_NAME || DATING_CONFIG.ownerName;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "Dating Alert <onboarding@resend.dev>";

  // Nếu chưa cấu hình Resend hoặc Email người nhận, chạy chế độ mô phỏng (Demo)
  if (!apiKey || !ownerEmail || apiKey.includes("re_123456789")) {
    console.log("💌 [DEMO MODE - EMAIL MÔ PHỎNG] Nhận lịch hẹn mới:");
    console.log(`- Người gửi: ${booking.partner_name}`);
    console.log(`- Ngày hẹn: ${booking.booking_date}`);
    console.log(`- Giờ hẹn: ${booking.time_slot}`);
    console.log(`- Hoạt động: ${booking.activity} ${booking.custom_activity ? `(${booking.custom_activity})` : ""}`);
    console.log(`- Địa điểm: ${booking.desired_location || "Tùy bạn chọn"}`);
    console.log(`- Lời nhắn: ${booking.message || "Không có lời nhắn"}`);
    console.log(`- Liên hệ: ${booking.contact_info || "Không cung cấp"}`);
    console.log(`=> (Để nhận email thật vào hòm thư, bạn chỉ cần điền RESEND_API_KEY & OWNER_EMAIL trong .env)`);

    return { success: true, isDemo: true };
  }

  try {
    const resend = new Resend(apiKey);

    const formattedDate = new Date(booking.booking_date).toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Ho_Chi_Minh",
    });

    const activityDisplay =
      booking.activity === "Hoạt động khác" && booking.custom_activity
        ? `${booking.activity}: ${booking.custom_activity}`
        : booking.activity;

    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 580px; margin: 0 auto; background-color: #FFFDF9; border: 1px solid #FCD6D4; border-radius: 20px; padding: 28px; color: #3D2B2E;">
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="font-size: 38px; margin-bottom: 8px;">💌</div>
          <h1 style="color: #E05A47; font-size: 22px; font-weight: 700; margin: 0 0 8px 0;">
            Có một lịch hẹn hò mới dành cho bạn!
          </h1>
          <p style="color: #8C6A66; font-size: 15px; margin: 0;">
            <strong>${booking.partner_name}</strong> vừa gửi một lời hẹn qua đường link của bạn.
          </p>
        </div>

        <div style="background-color: #FFFFFF; border-radius: 16px; padding: 20px; border: 1px solid #FEEDEC; margin-bottom: 24px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 10px 0; color: #8C6A66; width: 130px; vertical-align: top;">📅 Ngày hẹn:</td>
              <td style="padding: 10px 0; color: #3D2B2E; font-weight: 600; text-transform: capitalize;">${formattedDate}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #8C6A66; vertical-align: top;">⏰ Khung giờ:</td>
              <td style="padding: 10px 0; color: #E05A47; font-weight: 700; font-size: 15px;">${booking.time_slot}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #8C6A66; vertical-align: top;">✨ Hoạt động:</td>
              <td style="padding: 10px 0; color: #3D2B2E; font-weight: 600;">${activityDisplay}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #8C6A66; vertical-align: top;">📍 Địa điểm:</td>
              <td style="padding: 10px 0; color: #3D2B2E;">${booking.desired_location || "<i>Để bạn quyết định</i>"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #8C6A66; vertical-align: top;">💬 Lời nhắn:</td>
              <td style="padding: 10px 0; color: #5C3D42; font-style: italic; background: #FAF5F0; border-radius: 8px; padding-left: 12px; padding-right: 12px;">
                "${booking.message || "Không có lời nhắn riêng"}"
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #8C6A66; vertical-align: top;">📞 Liên hệ lại:</td>
              <td style="padding: 10px 0; color: #3D2B2E;">${booking.contact_info || "<i>Không điền</i>"}</td>
            </tr>
          </table>
        </div>

        <div style="text-align: center; color: #B07A6F; font-size: 13px; border-top: 1px dashed #FCD6D4; padding-top: 16px;">
          <p style="margin: 0 0 4px 0;">Chúc hai bạn có một buổi hẹn thật ngọt ngào và đáng nhớ! ❤️</p>
          <p style="margin: 0; font-size: 12px; color: #A8918D;">Dating Scheduler by ${ownerName}</p>
        </div>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [ownerEmail],
      subject: `❤️ ${booking.partner_name} vừa lên lịch hẹn hò với bạn (${booking.booking_date} lúc ${booking.time_slot})`,
      html: emailHtml,
    });

    if (error) {
      console.error("Lỗi khi gửi email qua Resend:", error);
      return { success: false, error: error.message };
    }

    return { success: true, isDemo: false };
  } catch (err: any) {
    console.error("Lỗi ngoại lệ khi gửi email:", err);
    return { success: false, error: err.message };
  }
}
