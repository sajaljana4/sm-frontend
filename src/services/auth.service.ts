import {
  GetOtpSchemaForRegistrationType,
  LoginSchemaType,
  RegistrationSchemaType,
  VerifyOtpSchemaForRegistrationType,
} from "@/validators/auth.schema";
import fetchAPI from "./config/fetch-api";
import { AUTH_URLS } from "./config/query-urls";
import {
  LoginResponseType,
  UserProfileResponseType,
  VerifyOtpForRegistrationResponseType,
} from "@/types/auth/auth-response.type";
import {
  BaseResponseType,
  MediaUploadResponseType,
} from "@/types/common/base-response.type";
import { RegistrationProfile } from "@/types/auth/registration-params.type";

export const authService = {
  login: async (data: LoginSchemaType): Promise<LoginResponseType> => {
    return await fetchAPI.post<LoginResponseType>({
      endpoint: AUTH_URLS.LOGIN,
      body: data,
    });
  },
  sendOtpForRegistration: async (
    data: GetOtpSchemaForRegistrationType,
  ): Promise<BaseResponseType> => {
    return await fetchAPI.post({
      endpoint: AUTH_URLS.SEND_OTP_FOR_REGISTRATION,
      body: data,
    });
  },
  verifyOtpForRegistration: async (
    data: VerifyOtpSchemaForRegistrationType,
  ): Promise<VerifyOtpForRegistrationResponseType> => {
    return await fetchAPI.post({
      endpoint: AUTH_URLS.VERIFY_OTP_FOR_REGISTRATION,
      body: data,
    });
  },
  uploadAccountDocuments: async ({
    file,
    registrationToken,
  }: {
    file: File;
    registrationToken: string;
  }): Promise<MediaUploadResponseType> => {
    const formData = new FormData();
    formData.append("file", file);
    return await fetchAPI.mediaUpload({
      endpoint: AUTH_URLS.UPLOAD_ACCOUNT_DOCUMENTS,
      formData,
      options: {
        headers: {
          "x-registration-token": registrationToken,
        },
      },
    });
  },
  register: async (data: RegistrationSchemaType): Promise<BaseResponseType> => {
    return await fetchAPI.post({
      endpoint: AUTH_URLS.REGISTER,
      body: data,
    });
  },
  profile: async (): Promise<UserProfileResponseType> => {
    return await fetchAPI.get({
      endpoint: AUTH_URLS.PROFILE,
    });
  },
  updateProfile: async (
    body: Partial<RegistrationProfile>,
  ): Promise<UserProfileResponseType> => {
    return await fetchAPI.patch<UserProfileResponseType>({
      endpoint: AUTH_URLS.UPDATE_PROFILE,
      body,
    });
  },
};
