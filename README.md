# 💕 Dating Scheduler - Website Đặt Lịch Hẹn Hò Đơn Giản & Tinh Tế

> **“Lên lịch cho buổi hẹn tiếp theo của chúng mình ❤️”**  
> Một website nhỏ xinh, chạy trực tiếp bằng một đường link duy nhất, tối ưu tuyệt đối cho điện thoại di động (Mobile-first). Không cần tải app, không cần đăng ký tài khoản hay đăng nhập rườm rà.

---

## 🌟 Tính năng nổi bật

1. **Trải nghiệm mượt mà & Lãng mạn:**
   - Màu chủ đạo: Hồng đất (`#C2968C`), Đỏ san hô (`#E05A47`), và Trắng kem (`#FFFDF9`).
   - Giao diện 1 trang duy nhất, bo góc mềm mại, bóng đổ nhẹ nhàng, nút bấm có hiệu ứng nhịp đập trái tim.
   - Hiệu ứng pháo hoa trái tim rơi nhẹ nhàng khi đặt lịch thành công.

2. **Đặt lịch thông minh:**
   - Chọn ngày trực tiếp trên thanh ngày nhanh (chips) hoặc mở lịch tháng trực quan.
   - Chỉ cho phép chọn các ngày được thiết lập trước (hoặc các ngày cuối tuần).
   - Tự động kiểm tra và khóa (vô hiệu hóa) các khung giờ đã được đặt trước đó hoặc ngày đã qua.
   - Mỗi khung giờ chỉ được đặt 1 lần duy nhất để tránh trùng lịch.

3. **Chọn hoạt động linh hoạt:**
   - ☕ Đi cà phê
   - 🍽️ Ăn tối
   - 🎬 Xem phim
   - 🌙 Đi dạo
   - ✨ Một buổi hẹn bất ngờ
   - ✍️ Hoạt động khác (tự nhập theo ý thích)

4. **Bảo mật & Tôn trọng quyền riêng tư:**
   - Tuyệt đối không thu thập vị trí (GPS), danh bạ, dấu vân tay thiết bị hay bất kỳ dữ liệu ngầm nào.
   - Chỉ lưu những thông tin mà người đặt chủ động nhập.
   - Cơ chế bẫy honeypot chống bot tự động spam.
   - Toàn bộ khóa bảo mật Supabase và Resend đều được xử lý an toàn ở phía Server (Server-side / API Route), không bao giờ lộ ra trình duyệt.

5. **Chế độ Demo (Xem trước) sẵn sàng:**
   - Bạn có thể mở web và trải nghiệm ngay lập tức mà chưa cần đăng ký Supabase hay Resend.
   - Dữ liệu sẽ được mô phỏng mượt mà trong bộ nhớ.

---

## 🚀 Hướng dẫn chạy thử nghiệm tại máy (Local)

### 1. Cài đặt thư viện (nếu chưa cài):
```bash
npm install
```

### 2. Khởi chạy máy chủ phát triển:
```bash
npm run dev
```

Mở trình duyệt truy cập: [http://localhost:3000](http://localhost:3000)  
*(Mẹo: Nhấn phím `F12` và chọn biểu tượng điện thoại (Toggle Device Toolbar) để xem giao diện tối ưu trên iPhone hoặc Android).*

---

## ⚙️ Tùy chỉnh thông tin của bạn

Toàn bộ thông tin cá nhân được đặt trong file:  
👉 [`src/config/dating.ts`](file:///src/config/dating.ts)

Bạn có thể chỉnh sửa rất dễ dàng:
- **`ownerName`**: Tên của bạn (ví dụ: "Anh Sang", "Hoàng", "Minh"...).
- **`hero.title`**: Tiêu đề trang (mặc định: “Lên lịch cho buổi hẹn tiếp theo của chúng mình ❤️”).
- **`hero.subtitle`**: Lời nhắn gửi bạn ấy.
- **`hero.avatarUrl`**: Link ảnh đại diện của bạn hoặc ảnh hai người. Bạn cũng có thể copy ảnh vào thư mục `public/` và điền đường dẫn ví dụ `/avatar.jpg`.
- **`timeSlots`**: Danh sách các khung giờ bạn muốn mở để đối phương chọn.
- **`availableDaysAhead`**: Số ngày tới cho phép đặt lịch (mặc định 21 ngày).
- **`onlyWeekends`**: Đặt `true` nếu bạn chỉ rảnh vào Thứ 7 và Chủ Nhật; đặt `false` nếu rảnh cả tuần.
- **`activities`**: Thêm/bớt các hoạt động hẹn hò yêu thích.

---

## 🗄️ Cấu hình Supabase (Lưu lịch hẹn thực tế)

Supabase cung cấp cơ sở dữ liệu PostgreSQL hoàn toàn miễn phí và cực kỳ nhanh.

### Bước 1: Tạo dự án Supabase
1. Truy cập [https://supabase.com](https://supabase.com) và đăng nhập (bằng GitHub hoặc Email).
2. Bấm **New Project**, đặt tên (ví dụ: `dating-scheduler`), chọn mật khẩu Database và vùng gần Việt Nam (ví dụ: `Singapore`).

### Bước 2: Chạy câu lệnh tạo bảng
1. Trong giao diện Supabase, bấm vào menu **SQL Editor** ở thanh bên trái.
2. Mở file [`supabase_schema.sql`](file:///supabase_schema.sql) trong thư mục dự án này, copy toàn bộ nội dung và dán vào ô soạn thảo của Supabase.
3. Bấm nút **Run** (màu xanh). Bảng `dating_bookings` sẽ được tạo kèm các quy tắc bảo mật RLS.

### Bước 3: Lấy API Keys
1. Vào **Project Settings** (biểu tượng bánh răng) -> Chọn **API**.
2. Copy 2 thông số:
   - **Project URL** -> điền vào `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** -> điền vào `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret key** (bấm Reveal để thấy) -> điền vào `SUPABASE_SERVICE_ROLE_KEY`

---

## 📧 Cấu hình Resend (Nhận email thông báo về máy)

Resend là dịch vụ gửi email hiện đại, miễn phí 3,000 email/tháng, gửi tức thì sau 1 giây.

### Bước 1: Lấy API Key Resend
1. Truy cập [https://resend.com](https://resend.com) và đăng ký tài khoản miễn phí.
2. Vào mục **API Keys** -> Bấm **Create API Key**.
3. Copy mã khóa (dạng `re_...`).

### Bước 2: Điền vào file `.env.local`
Tạo file `.env.local` trong thư mục dự án (dựa theo `.env.example`):
```env
NEXT_PUBLIC_OWNER_NAME="Anh Sang"
OWNER_EMAIL="email_that_cua_ban@gmail.com"

NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOi..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOi..."

RESEND_API_KEY="re_xxxxxxxxxxxx"
RESEND_FROM_EMAIL="onboarding@resend.dev"
```

> **Lưu ý:** Với tài khoản Resend miễn phí khi chưa gắn tên miền riêng, bạn có thể gửi thông báo trực tiếp đến chính email mà bạn đã dùng để đăng ký tài khoản Resend bằng địa chỉ `onboarding@resend.dev`.

---

## ☁️ Hướng dẫn triển khai lên Vercel (Lấy link gửi đối phương)

Vercel là nền tảng tối ưu nhất cho Next.js, hoàn toàn miễn phí và tự động cấp chứng chỉ HTTPS (ổ khóa xanh).

1. Đưa mã nguồn lên một kho lưu trữ **GitHub** (chọn chế độ Private nếu muốn giữ riêng tư).
2. Truy cập [https://vercel.com](https://vercel.com) và đăng nhập bằng tài khoản GitHub.
3. Bấm **Add New...** -> **Project**.
4. Chọn kho lưu trữ `dating-scheduler` vừa tải lên và bấm **Import**.
5. Ở phần **Environment Variables**, bấm mở rộng và điền các biến môi trường như trong file `.env.example` (gồm tên, email, các khóa Supabase và Resend).
6. Bấm nút **Deploy**!
7. Sau khoảng 1 phút, Vercel sẽ cung cấp cho bạn một đường link dạng:  
   👉 `https://hen-ho-cua-chung-minh.vercel.app`

Bây giờ, bạn chỉ cần copy đường link này gửi qua tin nhắn Zalo, Messenger hoặc iMessage cho đối phương và chờ tin vui thôi! ❤️
