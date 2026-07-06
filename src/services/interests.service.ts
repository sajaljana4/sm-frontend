import { GetMyInterestsParamsType, UpdateInterestParamsType } from "@/types/interests/params.type";
import fetchAPI from "./config/fetch-api";
import { INTEREST_URLS } from "./config/query-urls";
import {
  InterestHistoryResponseType,
  SendOrUpdateInterestResponseType,
} from "@/types/interests/response.model";
import { BaseResponseType } from "@/types/common/base-response.type";
import { BasePaginationParamsType } from "@/types/common/base-params.type";
import queryParamsFormatter from "@/utils/query-params-formatter";

export const interestsService = {
  sendInterest: async (
    receiver: string,
  ): Promise<SendOrUpdateInterestResponseType> =>
    fetchAPI.post<SendOrUpdateInterestResponseType>({
      endpoint: INTEREST_URLS.SEND_INTEREST,
      body: { receiver },
    }),
  getMyInterests: async (
    params: GetMyInterestsParamsType,
  ): Promise<InterestHistoryResponseType> =>
    fetchAPI.get<InterestHistoryResponseType>({
      endpoint: `${INTEREST_URLS.MY_INTERESTS}?${queryParamsFormatter(params)}`,
    }),
  getMySentInterests: async (
    params: BasePaginationParamsType,
  ): Promise<InterestHistoryResponseType> =>
    fetchAPI.get<InterestHistoryResponseType>({
      endpoint: `${INTEREST_URLS.MY_SENT_INTERESTS}?${queryParamsFormatter(params)}`,
    }),
  updateInterest: async ({
    interestId,
    body,
  }: {
    interestId: string;
    body: UpdateInterestParamsType;
  }): Promise<SendOrUpdateInterestResponseType> =>
    fetchAPI.patch<SendOrUpdateInterestResponseType>({
      endpoint: INTEREST_URLS.INTEREST_BY_ID(interestId),
      body,
    }),
  deleteInterest: async (interestId: string): Promise<BaseResponseType> =>
    fetchAPI.delete<BaseResponseType>({
      endpoint: INTEREST_URLS.INTEREST_BY_ID(interestId),
    }),
};
