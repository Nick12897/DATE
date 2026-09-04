import React from "react";
import { Sparkles, Heart } from "lucide-react";
import { DATING_CONFIG, ActivityOption } from "@/config/dating";

interface ActivitySelectorProps {
  selectedActivity: string | null;
  onSelectActivity: (id: string) => void;
  customActivity: string;
  onChangeCustomActivity: (val: string) => void;
}

export default function ActivitySelector({
  selectedActivity,
  onSelectActivity,
  customActivity,
  onChangeCustomActivity,
}: ActivitySelectorProps) {
  const { activities } = DATING_CONFIG;

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-romantic-100/90 shadow-romantic mb-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-xl bg-romantic-50 text-romantic-500">
          <Heart className="w-5 h-5 fill-current" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-foreground">
            3. Chọn hoạt động buổi hẹn
          </h2>
          <p className="text-xs text-dusty-500">
            Em thích làm gì cùng nhau nhất nè?
          </p>
        </div>
      </div>

      {/* Lưới các hoạt động */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
        {activities.map((item: ActivityOption) => {
          const isSelected = selectedActivity === item.label;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectActivity(item.label)}
              className={`flex flex-col items-start p-3 sm:p-3.5 rounded-2xl border text-left transition-all duration-200 ${
                isSelected
                  ? "bg-romantic-50/90 border-romantic-500 shadow-sm ring-2 ring-romantic-400/20 scale-[1.02]"
                  : "bg-white hover:bg-dusty-50/80 border-romantic-100/80 hover:border-romantic-200"
              }`}
            >
              <div className="text-2xl sm:text-3xl mb-1.5">{item.emoji}</div>
              <span
                className={`text-sm font-bold block ${
                  isSelected ? "text-romantic-600" : "text-foreground"
                }`}
              >
                {item.label}
              </span>
              <span
                className={`text-[11px] line-clamp-2 mt-0.5 leading-snug ${
                  isSelected ? "text-romantic-500" : "text-dusty-500"
                }`}
              >
                {item.description}
              </span>
            </button>
          );
        })}
      </div>

      {/* Ô nhập khi chọn "Hoạt động khác" */}
      {selectedActivity === "Hoạt động khác" && (
        <div className="mt-4 pt-3 border-t border-romantic-100/80 animate-fade-in-up">
          <label className="block text-xs font-semibold text-romantic-600 mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-romantic-500" />
            Nhập hoạt động mà em muốn:
          </label>
          <input
            type="text"
            value={customActivity}
            onChange={(e) => onChangeCustomActivity(e.target.value)}
            placeholder="Ví dụ: Cùng đi triển lãm tranh, đi bắn cung, nấu ăn tại nhà..."
            className="w-full px-4 py-2.5 rounded-xl border border-romantic-200 focus:border-romantic-500 focus:ring-2 focus:ring-romantic-200 outline-none text-sm bg-white shadow-sm placeholder:text-dusty-400 text-foreground transition-all"
            maxLength={100}
            autoFocus
          />
        </div>
      )}
    </div>
  );
}
