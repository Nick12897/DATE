"use client";

import React, { useState, useEffect } from "react";
import { format, startOfToday } from "date-fns";
import { Heart, Loader2, AlertCircle } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import DateSelector from "@/components/DateSelector";
import TimeSlotSelector from "@/components/TimeSlotSelector";
import ActivitySelector from "@/components/ActivitySelector";
import ExtraInfoForm from "@/components/ExtraInfoForm";
import NoticeCard from "@/components/NoticeCard";
import SuccessModal from "@/components/SuccessModal";
import { BookingPayload } from "@/lib/types";
import { DATING_CONFIG } from "@/config/dating";

export default function DatingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => startOfToday());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState<boolean>(false);

  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [customActivity, setCustomActivity] = useState<string>("");

  const [partnerName, setPartnerName] = useState<string>("");
  const [desiredLocation, setDesiredLocation] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [contactInfo, setContactInfo] = useState<string>("");
  const [botTrap, setBotTrap] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedBooking, setSubmittedBooking] = useState<BookingPayload | null>(
    null
  );
  const [isDemoResult, setIsDemoResult] = useState<boolean>(false);

  // Khi người dùng đổi ngày, truy vấn các khung giờ đã kín trong ngày đó
  useEffect(() => {
    if (!selectedDate) {
      setBookedSlots([]);
      return;
    }

    const dateStr = format(selectedDate, "yyyy-MM-dd");
    setIsLoadingSlots(true);
    setSelectedSlot(null); // Reset slot đã chọn khi đổi ngày
    setErrorMessage(null);

    fetch(`/api/slots?date=${dateStr}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.bookedSlots) {
          setBookedSlots(data.bookedSlots);
        } else {
          setBookedSlots([]);
        }
      })
      .catch((err) => {
        console.error("Lỗi khi tải danh sách slots:", err);
        setBookedSlots([]);
      })
      .finally(() => {
        setIsLoadingSlots(false);
      });
  }, [selectedDate]);

  // Xử lý gửi biểu mẫu đặt lịch
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Kiểm tra dữ liệu
    if (!selectedDate) {
      setErrorMessage("Em hãy chọn ngày hẹn trước nhé ❤️");
      window.scrollTo({ top: 180, behavior: "smooth" });
      return;
    }

    if (!selectedSlot) {
      setErrorMessage("Em chọn một khung giờ còn trống nhé ❤️");
      return;
    }

    if (!selectedActivity) {
      setErrorMessage("Em chọn một hoạt động mà em thích nhé ❤️");
      return;
    }

    if (
      selectedActivity === "Hoạt động khác" &&
      customActivity.trim().length === 0
    ) {
      setErrorMessage("Em hãy nhập tên hoạt động mà em muốn vào ô nhé ❤️");
      return;
    }

    if (!partnerName || partnerName.trim().length === 0) {
      setErrorMessage("Em chưa nhập tên hoặc biệt danh kìa ❤️");
      return;
    }

    const payload: BookingPayload = {
      booking_date: format(selectedDate, "yyyy-MM-dd"),
      time_slot: selectedSlot,
      activity: selectedActivity,
      custom_activity:
        selectedActivity === "Hoạt động khác" ? customActivity.trim() : undefined,
      partner_name: partnerName.trim(),
      desired_location: desiredLocation.trim() || undefined,
      message: message.trim() || undefined,
      contact_info: contactInfo.trim() || undefined,
      bot_trap: botTrap,
    };

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setErrorMessage(
          result.message || "Có lỗi xảy ra, em vui lòng thử lại nhé!"
        );
        setIsSubmitting(false);
        return;
      }

      // Thành công!
      setSubmittedBooking(payload);
      setIsDemoResult(!!result.isDemo);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      console.error("Lỗi khi gửi lịch:", err);
      setErrorMessage(
        "Không thể kết nối đến máy chủ. Em vui lòng kiểm tra mạng và thử lại nha!"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedBooking(null);
    setSelectedSlot(null);
    setSelectedActivity(null);
    setCustomActivity("");
    setMessage("");
  };

  return (
    <div className="w-full pb-16">
      {/* 1. PHẦN MỞ ĐẦU */}
      <HeroSection />

      {submittedBooking ? (
        /* MÀN HÌNH THÀNH CÔNG */
        <SuccessModal
          booking={submittedBooking}
          onReset={handleReset}
          isDemo={isDemoResult}
        />
      ) : (
        /* BIỂU MẪU ĐẶT LỊCH CHÍNH */
        <form onSubmit={handleSubmit} className="w-full">
          {/* 2. CHỌN LỊCH (NGÀY) */}
          <DateSelector
            selectedDate={selectedDate}
            onSelectDate={(d) => setSelectedDate(d)}
          />

          {/* 3. CHỌN KHUNG GIỜ */}
          {selectedDate && (
            <TimeSlotSelector
              selectedSlot={selectedSlot}
              onSelectSlot={(slot) => setSelectedSlot(slot)}
              bookedSlots={bookedSlots}
              isLoadingSlots={isLoadingSlots}
            />
          )}

          {/* 4. CHỌN HOẠT ĐỘNG */}
          <ActivitySelector
            selectedActivity={selectedActivity}
            onSelectActivity={(act) => setSelectedActivity(act)}
            customActivity={customActivity}
            onChangeCustomActivity={(val) => setCustomActivity(val)}
          />

          {/* 5. THÔNG TIN BỔ SUNG */}
          <ExtraInfoForm
            partnerName={partnerName}
            onChangePartnerName={(val) => setPartnerName(val)}
            desiredLocation={desiredLocation}
            onChangeDesiredLocation={(val) => setDesiredLocation(val)}
            message={message}
            onChangeMessage={(val) => setMessage(val)}
            contactInfo={contactInfo}
            onChangeContactInfo={(val) => setContactInfo(val)}
            botTrap={botTrap}
            onChangeBotTrap={(val) => setBotTrap(val)}
          />

          {/* 6. THÔNG BÁO TRƯỚC NÚT GỬI */}
          <NoticeCard />

          {/* THÔNG BÁO LỖI NẾU CÓ */}
          {errorMessage && (
            <div className="p-3.5 mb-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* 7. NÚT XÁC NHẬN */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-romantic-500 via-romantic-600 to-dusty-500 hover:from-romantic-600 hover:to-dusty-600 text-white font-bold text-base sm:text-lg shadow-romantic hover:shadow-romantic-hover active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Đang gửi lịch cho bạn ấy...</span>
              </>
            ) : (
              <>
                <Heart className="w-5 h-5 fill-current text-white/90 group-hover:scale-110 transition-transform" />
                <span>{DATING_CONFIG.submitButtonText}</span>
              </>
            )}
          </button>

          {/* Dòng chữ trang trí chân trang */}
          <div className="mt-8 text-center">
            <p className="text-xs text-dusty-400 flex items-center justify-center gap-1">
              <span>Made with love</span>
              <Heart className="w-3 h-3 text-romantic-400 fill-current inline" />
              <span>Dating Scheduler</span>
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
