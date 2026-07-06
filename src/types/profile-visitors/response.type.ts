import { BaseResponseType } from "../common/base-response.type";
import { UserType } from "../common/user.type";

export interface ProfileVisitorType {
  _id: string;
  userId: string;
  user: UserType;
  targetUser: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileVisitorsResponseType extends BaseResponseType {
  totalCount: number;
  data: ProfileVisitorType[];
}
