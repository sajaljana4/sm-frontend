import { RegistrationProfile } from "../auth/registration-params.type";
import { InterestType } from "../interests/response.model";
import { ShortlistResponseType } from "../shortlists/response.type";

export interface UserType extends RegistrationProfile {
  _id: string;
  fullName: string;
  isPublished: boolean;
  isDeleted: boolean;
  interestStatus: InterestType | null;
  shortlistStatus: ShortlistResponseType | null;
}
