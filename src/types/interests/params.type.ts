import { BasePaginationParamsType } from "../common/base-params.type";
import { InterestStatusType } from "./response.model";

export interface UpdateInterestParamsType {
  status: InterestStatusType;
}

export interface GetMyInterestsParamsType extends BasePaginationParamsType {
  status?: InterestStatusType;
}
