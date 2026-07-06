import { ProfileVisitorsResponseType } from "@/types/profile-visitors/response.type";
import fetchAPI from "./config/fetch-api";
import { PROFILE_VISITORS_URLS } from "./config/query-urls";
import { BaseResponseType } from "@/types/common/base-response.type";

export const profileVisitorService = {
  getMyProfileVisitors: async (): Promise<ProfileVisitorsResponseType> =>
    fetchAPI.get<ProfileVisitorsResponseType>({
      endpoint: PROFILE_VISITORS_URLS.GET_MY_PROFILE_VISITORS,
    }),
  visitProfile: async (targetUser: string): Promise<BaseResponseType> =>
    fetchAPI.post<BaseResponseType>({
      endpoint: PROFILE_VISITORS_URLS.VISIT_PROFILE,
      body: { targetUser },
    }),
};
