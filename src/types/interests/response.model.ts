import { BaseResponseType } from "@/types/common/base-response.type";
import { UserType } from "@/types/common/user.type";

export type InterestStatusType = "pending" | "accepted" | "rejected";

export interface InterestType {
  _id: string;
  sender: string | UserType;
  receiver: string | UserType;
  isMutual: boolean;
  status: InterestStatusType;
  createdAt: string;
  updatedAt: string;
}

export interface SendOrUpdateInterestResponseType extends BaseResponseType {
  data: InterestType;
}

export interface InterestHistoryResponseType extends BaseResponseType {
  totalCount: number;
  data: InterestType[];
}
