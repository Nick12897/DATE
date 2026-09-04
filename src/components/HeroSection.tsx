import React from "react";
import Image from "next/image";
import { DATING_CONFIG } from "@/config/dating";
import { Heart } from "lucide-react";

export default function HeroSection() {
  const { hero, ownerName } = DATING_CONFIG;

  return (
    <div className="text-center mb-8 animate-fade-in-up">
      {/* Ảnh đại diện Couple với viền phát sáng nhẹ */}
      <div className="relative inline-block mb-4">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-romantic-400 via-romantic-200 to-dusty-300 shadow-romantic">
          <div className="w-full h-full rounded-full overflow-hidden relative bg-white border-2 border-white">
            {hero.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={hero.avatarUrl}
                alt="Couple Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-romantic-50 text-romantic-400">
                <Heart className="w-10 h-10 fill-current animate-heart-beat" />
              </div>
            )}
          </div>
        </div>

        {/* Huy hiệu trái tim nhỏ góc ảnh */}
        <div className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md border border-romantic-100 animate-heart-beat">
          <Heart className="w-4 h-4 text-romantic-500 fill-current" />
        </div>
      </div>

      {/* Tiêu đề chính */}
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3 leading-snug">
        {hero.title}
      </h1>

      {/* Lời nhắn ngọt ngào */}
      <div className="max-w-md mx-auto bg-white/70 backdrop-blur-sm px-4 py-3 rounded-2xl border border-romantic-100/80 shadow-sm">
        <p className="text-sm sm:text-base text-dusty-600 leading-relaxed">
          {hero.subtitle}
        </p>
      </div>
    </div>
  );
}
