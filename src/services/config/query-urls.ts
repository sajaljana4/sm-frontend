export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "";
export const BASE_MEDIA_URL = process.env.NEXT_PUBLIC_BASE_MEDIA_URL ?? "";

export const AUTH_URLS = {
  LOGIN: "/auth/login",
  SEND_OTP_FOR_REGISTRATION: "/auth/get-otp-for-registration",
  VERIFY_OTP_FOR_REGISTRATION: "/auth/verify-otp-for-registration",
  REGISTER: "/auth/register",
  GET_OTP_FOR_FORGOT_PASSWORD: "/auth/get-otp-for-forgot-password",
  VERIFY_OTP_FOR_FORGOT_PASSWORD: "/auth/verify-otp-for-forgot-password",
  PROFILE: "/auth/profile",
  UPDATE_PROFILE: "/auth/profile",
  UPLOAD_ACCOUNT_DOCUMENTS: "/auth/upload-account-documents",
};

export const MEDIA_URLS = {
  UPLOAD: "/media/upload",
};

export const GENERAL_URLS = {
  SUB_CASTS: "/generals/subcasts",
  GOTHRA: (castId: string) => `/generals/gothra/${castId}`,
};

export const USER_URLS = {
  GET_ALL_USERS: "/users",
  DAILY_RECOMMENDATIONS: "/users/recommended-matches",
  VIEW_PROFILE: (userId: string) => `/users/${userId}`,
};

export const PROFILE_VISITORS_URLS = {
  VISIT_PROFILE: "/profile-visitors",
  GET_MY_PROFILE_VISITORS: "/profile-visitors/my-visitors",
};

export const INTEREST_URLS = {
  SEND_INTEREST: "/interests",
  MY_INTERESTS: "/interests/my-interests",
  MY_SENT_INTERESTS: "/interests/my-sent-interests",
  INTEREST_BY_ID: (interestId: string) => `/interests/${interestId}`,
};

export const SHORTLIST_URLS = {
  SHORTLISTS: "/shortlists",
  SHORTLIST_BY_ID: (shortlistId: string) => `/shortlists/${shortlistId}`,
};
