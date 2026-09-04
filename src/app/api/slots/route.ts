import { NextRequest, NextResponse } from "next/server";
import { getBookedSlotsForDate } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      { error: "Vui lòng cung cấp ngày hẹn (date=YYYY-MM-DD)" },
      { status: 400 }
    );
  }

  try {
    const bookedSlots = await getBookedSlotsForDate(date);
    return NextResponse.json({
      success: true,
      date,
      bookedSlots,
    });
  } catch (error: any) {
    console.error("Lỗi khi lấy danh sách slot:", error);
    return NextResponse.json(
      { error: "Không thể kiểm tra khung giờ trống: " + error.message },
      { status: 500 }
    );
  }
}
