import { GothraResponseType, SubCastResponseType } from "@/types/generals/reponse.type";
import fetchAPI from "./config/fetch-api";
import { GENERAL_URLS } from "./config/query-urls";

export const generalService = {
  getSubCasts: async (): Promise<SubCastResponseType> => {
    return await fetchAPI.get<SubCastResponseType>({
      endpoint: GENERAL_URLS.SUB_CASTS,
    });
  },
  getGothra: async (castId: string): Promise<GothraResponseType> => {
    return await fetchAPI.get<GothraResponseType>({
      endpoint: GENERAL_URLS.GOTHRA(castId),
    });
  },
};
