export interface BookingPayload {
  booking_date: string; // YYYY-MM-DD
  time_slot: string;
  partner_name: string;
  activity: string;
  custom_activity?: string;
  desired_location?: string;
  message?: string;
  contact_info?: string;
  bot_trap?: string; // Honeypot field for anti-spam
}

export interface BookingResponse {
  success: boolean;
  message: string;
  booking?: {
    id?: string;
    booking_date: string;
    time_slot: string;
    partner_name: string;
    activity: string;
    custom_activity?: string;
    desired_location?: string;
    message?: string;
    contact_info?: string;
    created_at?: string;
  };
  isDemo?: boolean;
}
