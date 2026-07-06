import { BaseResponseType } from "../common/base-response.type";
import { UserType } from "../common/user.type";

export interface ShortlistResponseType {
  _id: string;
  userId: string;
  shortlistedUser: string | UserType;
  createdAt: string;
  updatedAt: string;
}

export interface ShortlistsResponseType extends BaseResponseType {
  totalCount: number;
  data: ShortlistResponseType[];
}

export interface SingleShortlistResponseType extends BaseResponseType {
  data: ShortlistResponseType;
}
