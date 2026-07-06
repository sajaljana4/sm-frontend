import { BaseResponseType } from "@/types/common/base-response.type";
import {
  ShortlistsResponseType,
  SingleShortlistResponseType,
} from "@/types/shortlists/response.type";
import fetchAPI from "./config/fetch-api";
import { SHORTLIST_URLS } from "./config/query-urls";
import { BasePaginationParamsType } from "@/types/common/base-params.type";
import queryParamsFormatter from "@/utils/query-params-formatter";

export const shortlistService = {
  addToShortlist: async (
    shortlistedUser: string,
  ): Promise<SingleShortlistResponseType> =>
    fetchAPI.post<SingleShortlistResponseType>({
      endpoint: SHORTLIST_URLS.SHORTLISTS,
      body: { shortlistedUser },
    }),
  getMyShortlists: async (
    params: BasePaginationParamsType,
  ): Promise<ShortlistsResponseType> =>
    fetchAPI.get<ShortlistsResponseType>({
      endpoint: `${SHORTLIST_URLS.SHORTLISTS}?${queryParamsFormatter(params)}`,
    }),
  removeFromShortlist: async (shortlistId: string): Promise<BaseResponseType> =>
    fetchAPI.delete<BaseResponseType>({
      endpoint: SHORTLIST_URLS.SHORTLIST_BY_ID(shortlistId),
    }),
};
