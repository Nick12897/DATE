-- ==============================================================================
-- SUPABASE SCHEMA CHO WEBSITE ĐẶT LỊCH HẸN HÒ
-- Copy toàn bộ nội dung file này và dán vào: Supabase Dashboard -> SQL Editor -> Run
-- ==============================================================================

-- 1. Tạo bảng lưu trữ thông tin đặt lịch hẹn hò
CREATE TABLE IF NOT EXISTS public.dating_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('Asia/Ho_Chi_Minh'::text, now()) NOT NULL,
    
    -- Ngày hẹn (định dạng YYYY-MM-DD)
    booking_date DATE NOT NULL,
    
    -- Khung giờ hẹn (ví dụ: '19:30 - 22:00')
    time_slot TEXT NOT NULL,
    
    -- Tên đối phương đặt lịch
    partner_name TEXT NOT NULL,
    
    -- Hoạt động đã chọn
    activity TEXT NOT NULL,
    
    -- Chi tiết nếu chọn "Hoạt động khác"
    custom_activity TEXT,
    
    -- Địa điểm mong muốn (tùy chọn)
    desired_location TEXT,
    
    -- Lời nhắn ngọt ngào dành cho bạn (tùy chọn)
    message TEXT,
    
    -- Email hoặc Số điện thoại (tùy chọn)
    contact_info TEXT,
    
    -- Trạng thái buổi hẹn: confirmed, completed, cancelled
    status TEXT DEFAULT 'confirmed' NOT NULL,

    -- Ràng buộc: Mỗi khung giờ trong 1 ngày chỉ được đặt 1 lần duy nhất!
    CONSTRAINT unique_booking_slot UNIQUE (booking_date, time_slot)
);

-- 2. Tạo chỉ mục để tăng tốc độ truy vấn lịch hẹn theo ngày
CREATE INDEX IF NOT EXISTS idx_dating_bookings_date ON public.dating_bookings (booking_date);

-- 3. Kích hoạt Row Level Security (RLS)
ALTER TABLE public.dating_bookings ENABLE ROW LEVEL SECURITY;

-- 4. Chính sách cho phép khách gửi lịch hẹn (INSERT)
CREATE POLICY "Cho phep khach gui lich hen"
    ON public.dating_bookings
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        length(trim(partner_name)) > 0 AND
        length(trim(time_slot)) > 0 AND
        length(trim(activity)) > 0
    );

-- 5. Chính sách cho phép đọc khung giờ đã đặt để vô hiệu hóa trên giao diện (SELECT)
CREATE POLICY "Cho phep xem cac khung gio da dat"
    ON public.dating_bookings
    FOR SELECT
    TO anon, authenticated
    USING (true);

-- 6. Thông báo thành công
COMMENT ON TABLE public.dating_bookings IS 'Bảng lưu trữ thông tin các buổi hẹn hò';
