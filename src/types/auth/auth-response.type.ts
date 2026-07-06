import { BaseResponseType } from "../common/base-response.type";
import { UserType } from "../common/user.type";

export interface LoginResponseType extends BaseResponseType {
  data?: {
    accessToken: string;
    user: UserType;
  };
}

export interface VerifyOtpForRegistrationResponseType extends BaseResponseType {
  data: {
    registrationToken: string;
  };
}

export interface UserProfileResponseType extends BaseResponseType {
  data: UserType;
}
