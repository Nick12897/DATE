export interface ActivityOption {
  id: string;
  label: string;
  emoji: string;
  description: string;
}

export const DATING_CONFIG = {
  // 1. TÊN VÀ THÔNG ĐIỆP CHỦ LINK
  ownerName: process.env.NEXT_PUBLIC_OWNER_NAME || "Anh Sang",
  partnerPronoun: "Em", // Đại từ gọi đối phương (Em / Bạn / Cậu)
  
  hero: {
    title: "Lên lịch cho buổi hẹn tiếp theo của chúng mình ❤️",
    subtitle: "Em hãy chọn thời gian và hoạt động em thích nhé. Anh sẽ nhận được lịch ngay sau khi em gửi.",
    // Ảnh đại diện của hai bạn hoặc ảnh đại diện lãng mạn (có thể đổi thành ảnh của 2 bạn hoặc link ảnh)
    avatarUrl: "/avatar.svg",
  },

  // 2. CẤU HÌNH KHUNG GIỜ HẸN
  // Bạn có thể tùy chỉnh các khung giờ bạn thường rảnh rỗi
  timeSlots: [
    { id: "slot-1", label: "09:00 - 11:30", desc: "Buổi sáng nhẹ nhàng" },
    { id: "slot-2", label: "14:00 - 16:30", desc: "Buổi chiều thảnh thơi" },
    { id: "slot-3", label: "17:30 - 20:00", desc: "Chiều tà & Ăn tối" },
    { id: "slot-4", label: "19:30 - 22:00", desc: "Buổi tối lãng mạn" },
  ],

  // 3. CẤU HÌNH NGÀY KHẢ DỤNG
  // Số ngày tới mà bạn muốn mở lịch (ví dụ: 14 ngày tới)
  availableDaysAhead: 21,
  // Có chỉ cho phép chọn cuối tuần (Thứ 7 & Chủ Nhật) hay tất cả các ngày?
  // false: cho phép tất cả các ngày trong khoảng availableDaysAhead
  // true: chỉ cho phép Thứ 7 và Chủ Nhật
  onlyWeekends: false,

  // 4. DANH SÁCH HOẠT ĐỘNG HẸN HÒ
  activities: [
    {
      id: "coffee",
      label: "Đi cà phê",
      emoji: "☕",
      description: "Ngồi một góc xinh, uống trà và tâm sự",
    },
    {
      id: "dinner",
      label: "Ăn tối",
      emoji: "🍽️",
      description: "Thưởng thức bữa tối ấm cúng cùng nhau",
    },
    {
      id: "cinema",
      label: "Xem phim",
      emoji: "🎬",
      description: "Chọn một bộ phim hay và ăn bắp rang",
    },
    {
      id: "walk",
      label: "Đi dạo",
      emoji: "🌙",
      description: "Dạo phố đêm mát mẻ, ngắm nhìn phố phường",
    },
    {
      id: "surprise",
      label: "Buổi hẹn bất ngờ",
      emoji: "✨",
      description: "Mọi thứ để anh bí mật chuẩn bị từ A đến Z",
    },
    {
      id: "other",
      label: "Hoạt động khác",
      emoji: "✍️",
      description: "Em có ý tưởng nào mới lạ không, kể anh nghe nhé!",
    },
  ] as ActivityOption[],

  // 5. THÔNG ĐIỆP KẾT THÚC & THÀNH CÔNG
  noticeText: (ownerName: string) =>
    `Thông tin bạn nhập sẽ được gửi trực tiếp cho ${ownerName} để chuẩn bị cho buổi hẹn.`,
  submitButtonText: "Hẹn nhau nhé ❤️",
  successMessage: "Lịch hẹn đã được gửi rồi! Anh sẽ sớm xác nhận với em ❤️",
};
