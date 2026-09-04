import React, { useState } from "react";
import {
  format,
  addDays,
  isBefore,
  isSameDay,
  startOfToday,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isWeekend,
  addMonths,
  subMonths,
  isSameMonth,
} from "date-fns";
import { vi } from "date-fns/locale";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { DATING_CONFIG } from "@/config/dating";

interface DateSelectorProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

export default function DateSelector({
  selectedDate,
  onSelectDate,
}: DateSelectorProps) {
  const today = startOfToday();
  const maxDate = addDays(today, DATING_CONFIG.availableDaysAhead);

  const [currentMonth, setCurrentMonth] = useState(today);
  const [viewMode, setViewMode] = useState<"quick" | "calendar">("quick");

  // Kiểm tra ngày có được phép chọn không
  const isDateAvailable = (date: Date) => {
    if (isBefore(date, today)) return false;
    if (date > maxDate) return false;
    if (DATING_CONFIG.onlyWeekends && !isWeekend(date)) return false;
    return true;
  };

  // Tạo danh sách các ngày khả dụng trong 14 ngày tới để hiển thị nhanh
  const quickDays: Date[] = [];
  for (let i = 0; i <= DATING_CONFIG.availableDaysAhead; i++) {
    const d = addDays(today, i);
    if (isDateAvailable(d)) {
      quickDays.push(d);
    }
  }

  // Tạo lưới ngày của tháng đang xem
  const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 }); // Thứ 2 bắt đầu
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const weekDayHeaders = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-romantic-100/90 shadow-romantic mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-romantic-50 text-romantic-500">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-foreground">
              1. Chọn ngày hẹn hò
            </h2>
            <p className="text-xs text-dusty-500">
              {DATING_CONFIG.onlyWeekends
                ? "Chỉ mở lịch vào các ngày cuối tuần"
                : `Mở lịch trong ${DATING_CONFIG.availableDaysAhead} ngày tới`}
            </p>
          </div>
        </div>

        {/* Nút chuyển đổi xem lịch đầy đủ / xem nhanh */}
        <button
          type="button"
          onClick={() =>
            setViewMode((prev) => (prev === "quick" ? "calendar" : "quick"))
          }
          className="text-xs font-medium text-romantic-600 bg-romantic-50 hover:bg-romantic-100 px-3 py-1.5 rounded-full transition-colors"
        >
          {viewMode === "quick" ? "Mở lịch tháng" : "Chọn nhanh"}
        </button>
      </div>

      {/* CHẾ ĐỘ 1: CHỌN NHANH DẠNG CUỘN NGANG / CHIPS (Rất tiện trên điện thoại) */}
      {viewMode === "quick" ? (
        <div>
          <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none snap-x">
            {quickDays.slice(0, 10).map((d) => {
              const isSelected = selectedDate ? isSameDay(d, selectedDate) : false;
              const isToday = isSameDay(d, today);
              const isTomorrow = isSameDay(d, addDays(today, 1));

              let badgeText = "";
              if (isToday) badgeText = "Hôm nay";
              else if (isTomorrow) badgeText = "Ngày mai";
              else if (isWeekend(d)) badgeText = "Cuối tuần";

              return (
                <button
                  key={d.toISOString()}
                  type="button"
                  onClick={() => onSelectDate(d)}
                  className={`flex-shrink-0 snap-start flex flex-col items-center justify-between py-3 px-3.5 rounded-2xl min-w-[76px] transition-all duration-200 border ${
                    isSelected
                      ? "bg-romantic-500 text-white border-romantic-500 shadow-md scale-105"
                      : "bg-dusty-50/70 hover:bg-romantic-50 text-foreground border-romantic-100/60"
                  }`}
                >
                  <span
                    className={`text-[11px] font-medium uppercase tracking-wider ${
                      isSelected ? "text-romantic-100" : "text-dusty-500"
                    }`}
                  >
                    {format(d, "EEE", { locale: vi })}
                  </span>

                  <span className="text-xl font-bold my-1">
                    {format(d, "dd")}
                  </span>

                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-white/20 text-white font-medium"
                        : badgeText
                        ? "bg-romantic-100 text-romantic-600 font-medium"
                        : "text-dusty-400"
                    }`}
                  >
                    {badgeText || format(d, "MM/yy")}
                  </span>
                </button>
              );
            })}
          </div>

          {quickDays.length > 10 && (
            <p className="text-[11px] text-center text-dusty-400 mt-2">
              Vuốt sang phải để xem thêm các ngày khác 👉
            </p>
          )}
        </div>
      ) : (
        /* CHẾ ĐỘ 2: LỊCH THÁNG TRỰC QUAN */
        <div className="bg-dusty-50/50 rounded-2xl p-3 border border-romantic-100/50">
          <div className="flex items-center justify-between mb-3 px-1">
            <button
              type="button"
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              disabled={isBefore(currentMonth, today)}
              className="p-1.5 rounded-lg hover:bg-white text-dusty-600 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-semibold capitalize text-foreground">
              {format(currentMonth, "MMMM yyyy", { locale: vi })}
            </span>
            <button
              type="button"
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              disabled={addMonths(currentMonth, 1) > addMonths(maxDate, 1)}
              className="p-1.5 rounded-lg hover:bg-white text-dusty-600 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {weekDayHeaders.map((header) => (
              <span
                key={header}
                className="text-[11px] font-semibold text-dusty-400 py-1"
              >
                {header}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((d) => {
              const isAvailable = isDateAvailable(d);
              const isCurrentMonth = isSameMonth(d, currentMonth);
              const isSelected = selectedDate ? isSameDay(d, selectedDate) : false;

              return (
                <button
                  key={d.toISOString()}
                  type="button"
                  disabled={!isAvailable}
                  onClick={() => onSelectDate(d)}
                  className={`aspect-square flex items-center justify-center rounded-xl text-xs font-medium transition-all ${
                    !isCurrentMonth
                      ? "text-dusty-300 opacity-40 cursor-not-allowed"
                      : !isAvailable
                      ? "text-dusty-300 cursor-not-allowed line-through"
                      : isSelected
                      ? "bg-romantic-500 text-white shadow-sm font-bold scale-105"
                      : "hover:bg-romantic-100 text-foreground"
                  }`}
                >
                  {format(d, "d")}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Hiển thị ngày đã chọn */}
      {selectedDate && (
        <div className="mt-4 pt-3 border-t border-romantic-100/60 flex items-center justify-between">
          <span className="text-xs text-dusty-500">Ngày bạn đang chọn:</span>
          <span className="text-sm font-bold text-romantic-600 flex items-center gap-1.5 bg-romantic-50 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            {format(selectedDate, "EEEE, dd 'tháng' MM, yyyy", { locale: vi })}
          </span>
        </div>
      )}
    </div>
  );
}
