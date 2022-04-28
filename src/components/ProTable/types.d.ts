/*
 * @module: ProTable组件类型声明
 * @Author: yoo
 * @Date: 2022-03-04 15:54:14
 * @Description:
 */
export interface ListResultType {
  data: { [key: string]: any };
  total: number;
  currentPage: number;
  pageSize: number;
  success: boolean;
}

export interface LocalPagination {
  currentPage: number;
  pageSize: number;
}

export interface RequestData<T> {
  pageSize?: number;
  currentPage?: number;
  total: number;
  data: T[];
  success: boolean;
}

export type RequestType = (params: {
  pageSize: number;
  currentPage: number;
}) => Promise<RequestData<any>>;

export interface ToolbarType {
  show: boolean;
  title?: string;
  setting?: ('refresh' | 'fullScreen' | 'columnsSetup')[];
}

// todo elementPlus 没有导出，临时处理
type ElementColumnType = any;
export interface TableColumnType extends ElementColumnType {
  isSearch?: boolean;
}
