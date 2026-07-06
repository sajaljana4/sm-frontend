import { BaseResponseType } from "../common/base-response.type";

export interface SubCastType {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubCastResponseType extends BaseResponseType {
  data: SubCastType[];
}

export interface GothraType {
  _id: string;
  name: string;
  subcast: string;
  createdAt: string;
  updatedAt: string;
}

export interface GothraResponseType extends BaseResponseType {
  data: GothraType[];
}
