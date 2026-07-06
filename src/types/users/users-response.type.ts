import { BaseResponseType } from "../common/base-response.type";
import { UserType } from "../common/user.type";

export interface UsersResponseType extends BaseResponseType {
  totalCount: number;
  data: UserType[];
}
