import React from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Heart, Calendar, Clock, MapPin, Sparkles, CheckCircle, RotateCcw } from "lucide-react";
import { BookingPayload } from "@/lib/types";
import { DATING_CONFIG } from "@/config/dating";
import HeartConfetti from "./HeartConfetti";

interface SuccessModalProps {
  booking: BookingPayload;
  onReset: () => void;
  isDemo?: boolean;
}

export default function SuccessModal({
  booking,
  onReset,
  isDemo,
}: SuccessModalProps) {
  const formattedDate = booking.booking_date
    ? format(new Date(booking.booking_date), "EEEE, dd 'tháng' MM, yyyy", {
        locale: vi,
      })
    : "";

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-romantic-200 shadow-romantic-hover animate-fade-in-up text-center">
      <HeartConfetti />

      {/* Biểu tượng trái tim lớn có hiệu ứng nhịp đập */}
      <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-tr from-romantic-500 to-romantic-300 flex items-center justify-center text-white shadow-lg shadow-romantic-300/40 animate-heart-beat">
        <Heart className="w-10 h-10 fill-current" />
      </div>

      {/* Thông báo theo đúng yêu cầu */}
      <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 leading-snug">
        {DATING_CONFIG.successMessage}
      </h2>

      <p className="text-sm text-dusty-500 mb-6">
        Thông tin buổi hẹn đã được lưu lại và gửi thông báo trực tiếp đến bạn ấy rồi nhé.
      </p>

      {/* Thẻ tóm tắt chi tiết lịch hẹn */}
      <div className="bg-dusty-50/70 rounded-2xl p-4 sm:p-5 border border-romantic-100 text-left mb-6 space-y-3 text-sm">
        <div className="flex items-start gap-3">
          <Calendar className="w-4 h-4 text-romantic-500 flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-xs text-dusty-400 block">Thời gian:</span>
            <span className="font-semibold text-foreground capitalize">
              {formattedDate}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="w-4 h-4 text-romantic-500 flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-xs text-dusty-400 block">Khung giờ:</span>
            <span className="font-semibold text-romantic-600">
              {booking.time_slot}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-romantic-500 flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-xs text-dusty-400 block">Hoạt động:</span>
            <span className="font-semibold text-foreground">
              {booking.activity === "Hoạt động khác" && booking.custom_activity
                ? `${booking.activity}: ${booking.custom_activity}`
                : booking.activity}
            </span>
          </div>
        </div>

        {booking.desired_location && (
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-romantic-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-xs text-dusty-400 block">Địa điểm gợi ý:</span>
              <span className="font-medium text-foreground">
                {booking.desired_location}
              </span>
            </div>
          </div>
        )}

        {booking.message && (
          <div className="pt-2 border-t border-romantic-100/60">
            <span className="text-xs text-dusty-400 block mb-0.5">Lời nhắn của em:</span>
            <p className="italic text-dusty-600 bg-white/80 p-2.5 rounded-xl border border-romantic-100/50 text-xs sm:text-sm">
              &ldquo;{booking.message}&rdquo;
            </p>
          </div>
        )}
      </div>

      {isDemo && (
        <div className="mb-6 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs text-left">
          <strong>💡 Chế độ Demo (Xem trước):</strong> Lịch này đang được lưu vào bộ nhớ tạm thời trên máy. Khi bạn thêm mã Supabase và Resend vào file <code>.env</code>, lịch sẽ được lưu vào cơ sở dữ liệu thật và gửi email trực tiếp cho bạn!
        </div>
      )}

      {/* Nút đặt lịch khác hoặc đổi ý */}
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-dusty-600 hover:text-foreground bg-dusty-100/70 hover:bg-dusty-200/80 transition-colors"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        Chọn lại hoặc đặt buổi hẹn khác
      </button>
    </div>
  );
}
