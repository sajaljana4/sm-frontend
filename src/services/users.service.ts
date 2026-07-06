import { UsersResponseType } from "@/types/users/users-response.type";
import fetchAPI from "./config/fetch-api";
import { USER_URLS } from "./config/query-urls";
import { UserProfileResponseType } from "@/types/auth/auth-response.type";
import { GetAllUsersParamsType } from "@/types/users/params.type";
import queryParamsFormatter from "@/utils/query-params-formatter";

export const userService = {
  getAllUsers: async (
    params: GetAllUsersParamsType,
  ): Promise<UsersResponseType> =>
    fetchAPI.get<UsersResponseType>({
      endpoint: `${USER_URLS.GET_ALL_USERS}?${queryParamsFormatter(params)}`,
    }),
  viewProfile: async (userId: string): Promise<UserProfileResponseType> =>
    fetchAPI.get<UserProfileResponseType>({
      endpoint: USER_URLS.VIEW_PROFILE(userId),
    }),
};
