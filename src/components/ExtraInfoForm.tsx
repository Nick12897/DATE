import React from "react";
import { User, MapPin, PhoneCall } from "lucide-react";
import { DATING_CONFIG } from "@/config/dating";

interface ExtraInfoFormProps {
  partnerName: string;
  onChangePartnerName: (val: string) => void;
  desiredLocation: string;
  onChangeDesiredLocation: (val: string) => void;
  message: string;
  onChangeMessage: (val: string) => void;
  contactInfo: string;
  onChangeContactInfo: (val: string) => void;
  botTrap: string;
  onChangeBotTrap: (val: string) => void;
}

export default function ExtraInfoForm({
  partnerName,
  onChangePartnerName,
  desiredLocation,
  onChangeDesiredLocation,
  message,
  onChangeMessage,
  contactInfo,
  onChangeContactInfo,
  botTrap,
  onChangeBotTrap,
}: ExtraInfoFormProps) {
  const { partnerPronoun } = DATING_CONFIG;

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-romantic-100/90 shadow-romantic mb-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-xl bg-romantic-50 text-romantic-500">
          <User className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-foreground">
            4. Thông tin buổi hẹn
          </h2>
          <p className="text-xs text-dusty-500">
            Để anh chuẩn bị chu đáo nhất cho tụi mình nha
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* 1. Tên người đặt (BẮT BUỘC) */}
        <div>
          <label className="block text-xs font-bold text-foreground mb-1.5">
            Tên hoặc biệt danh của bạn <span className="text-romantic-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={partnerName}
              onChange={(e) => onChangePartnerName(e.target.value)}
              placeholder={`Tên hoặc biệt danh dễ thương của ${partnerPronoun.toLowerCase()}...`}
              className="w-full px-4 py-2.5 rounded-xl border border-romantic-200 focus:border-romantic-500 focus:ring-2 focus:ring-romantic-200 outline-none text-sm bg-white shadow-sm placeholder:text-dusty-400 text-foreground transition-all"
              maxLength={50}
            />
          </div>
        </div>

        {/* 2. Địa điểm mong muốn (TÙY CHỌN) */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-romantic-400" />
            Địa điểm em mong muốn{" "}
            <span className="text-[11px] font-normal text-dusty-400">
              (tùy chọn)
            </span>
          </label>
          <input
            type="text"
            value={desiredLocation}
            onChange={(e) => onChangeDesiredLocation(e.target.value)}
            placeholder="Ví dụ: Quán cà phê gần Hồ Tây, rạp CGV Landmark..."
            className="w-full px-4 py-2.5 rounded-xl border border-romantic-200 focus:border-romantic-500 focus:ring-2 focus:ring-romantic-200 outline-none text-sm bg-white shadow-sm placeholder:text-dusty-400 text-foreground transition-all"
            maxLength={150}
          />
        </div>

        {/* 3. Lời nhắn gửi chủ link (TÙY CHỌN) */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
            <span className="text-sm">💌</span>
            Lời nhắn dành riêng cho anh{" "}
            <span className="text-[11px] font-normal text-dusty-400">
              (tùy chọn)
            </span>
          </label>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => onChangeMessage(e.target.value)}
            placeholder="Em muốn dặn anh điều gì không? (Ví dụ: Nhớ đón em lúc 7h, mặc đồ tone trắng nhé...)"
            className="w-full px-4 py-2.5 rounded-xl border border-romantic-200 focus:border-romantic-500 focus:ring-2 focus:ring-romantic-200 outline-none text-sm bg-white shadow-sm placeholder:text-dusty-400 text-foreground transition-all resize-none"
            maxLength={500}
          />
        </div>

        {/* 4. Email hoặc số điện thoại (TÙY CHỌN) */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5 flex items-center gap-1.5">
            <PhoneCall className="w-3.5 h-3.5 text-romantic-400" />
            Email hoặc Số điện thoại{" "}
            <span className="text-[11px] font-normal text-dusty-400">
              (tùy chọn, để anh tiện liên lạc)
            </span>
          </label>
          <input
            type="text"
            value={contactInfo}
            onChange={(e) => onChangeContactInfo(e.target.value)}
            placeholder="09xx xxx xxx hoặc email của em..."
            className="w-full px-4 py-2.5 rounded-xl border border-romantic-200 focus:border-romantic-500 focus:ring-2 focus:ring-romantic-200 outline-none text-sm bg-white shadow-sm placeholder:text-dusty-400 text-foreground transition-all"
            maxLength={80}
          />
        </div>

        {/* BẪY CHỐNG BOT SPAM (HONEYPOT) - Người thật không thấy trường này */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="bot_trap">Do not fill this</label>
          <input
            id="bot_trap"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={botTrap}
            onChange={(e) => onChangeBotTrap(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
