/*
 * @module: ProTable组件类型声明
 * @Author: yoo
 * @Date: 2022-03-04 15:54:14
 * @Description:
 */
export interface listResultType {
  data: any[];
  total: number;
  currentPage: number;
  pageSize: number;
}

export interface localPagination {
  currentPage: number;
  pageSize: number;
}
