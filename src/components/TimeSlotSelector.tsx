import React from "react";
import { Clock, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { DATING_CONFIG } from "@/config/dating";

interface TimeSlotSelectorProps {
  selectedSlot: string | null;
  onSelectSlot: (slot: string) => void;
  bookedSlots: string[];
  isLoadingSlots: boolean;
}

export default function TimeSlotSelector({
  selectedSlot,
  onSelectSlot,
  bookedSlots,
  isLoadingSlots,
}: TimeSlotSelectorProps) {
  const { timeSlots } = DATING_CONFIG;

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-romantic-100/90 shadow-romantic mb-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-xl bg-romantic-50 text-romantic-500">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-foreground">
            2. Chọn khung giờ hẹn
          </h2>
          <p className="text-xs text-dusty-500">
            Mỗi khung giờ chỉ dành riêng cho một buổi hẹn
          </p>
        </div>
      </div>

      {isLoadingSlots ? (
        <div className="py-8 flex flex-col items-center justify-center text-dusty-400">
          <div className="w-6 h-6 border-2 border-romantic-400 border-t-transparent rounded-full animate-spin mb-2" />
          <p className="text-xs">Đang kiểm tra các giờ còn trống...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {timeSlots.map((slot) => {
            const isBooked = bookedSlots.includes(slot.label);
            const isSelected = selectedSlot === slot.label;

            return (
              <button
                key={slot.id}
                type="button"
                disabled={isBooked}
                onClick={() => onSelectSlot(slot.label)}
                className={`relative flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all duration-200 ${
                  isBooked
                    ? "bg-dusty-100/60 border-dusty-200/50 opacity-60 cursor-not-allowed"
                    : isSelected
                    ? "bg-romantic-50/90 border-romantic-500 shadow-sm ring-2 ring-romantic-400/20"
                    : "bg-white hover:bg-dusty-50/80 border-romantic-100/80 hover:border-romantic-200"
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-sm sm:text-base font-bold ${
                        isSelected
                          ? "text-romantic-600"
                          : isBooked
                          ? "text-dusty-400 line-through"
                          : "text-foreground"
                      }`}
                    >
                      {slot.label}
                    </span>
                    {isSelected && (
                      <Sparkles className="w-3.5 h-3.5 text-romantic-500 animate-pulse" />
                    )}
                  </div>
                  <p
                    className={`text-xs mt-0.5 ${
                      isSelected
                        ? "text-romantic-500 font-medium"
                        : "text-dusty-500"
                    }`}
                  >
                    {slot.desc}
                  </p>
                </div>

                <div>
                  {isBooked ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-dusty-200 text-dusty-600">
                      <XCircle className="w-3 h-3" />
                      Đã kín
                    </span>
                  ) : isSelected ? (
                    <div className="w-6 h-6 rounded-full bg-romantic-500 text-white flex items-center justify-center shadow-sm">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  ) : (
                    <span className="text-[11px] text-romantic-500 bg-romantic-50 font-medium px-2 py-0.5 rounded-full">
                      Còn trống
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
