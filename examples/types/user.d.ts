import { listResultType } from './type';
export interface UserInfoType {
  id: number;
  name: string;
  gender: number;
  age: number;
  email: string;
  phone: string;
  wx: string;
  address: string;
}

export interface UserRequestResultType extends listResultType<UserInfoType> {}

export interface RequestData {
  pageSize?: number;
  currentPage?: number;
  total: number;
  data: UserInfoType[];
  success: boolean;
}
