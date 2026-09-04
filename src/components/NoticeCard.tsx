import React from "react";
import { ShieldCheck } from "lucide-react";
import { DATING_CONFIG } from "@/config/dating";

interface NoticeCardProps {
  ownerName?: string;
}

export default function NoticeCard({ ownerName }: NoticeCardProps) {
  const name = ownerName || DATING_CONFIG.ownerName;

  return (
    <div className="flex items-start gap-2.5 p-3.5 sm:p-4 rounded-2xl bg-dusty-50 border border-romantic-100/70 text-dusty-600 text-xs sm:text-sm mb-6">
      <ShieldCheck className="w-5 h-5 text-romantic-500 flex-shrink-0 mt-0.5" />
      <p className="leading-relaxed">
        {DATING_CONFIG.noticeText(name)}
      </p>
    </div>
  );
}
