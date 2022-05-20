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

// 分页类型定义
export interface LocalPagination {
  currentPage: number;
  pageSize: number;
}

// 列表数据请求结果类型定义
export interface RequestData<T> {
  pageSize?: number;
  currentPage?: number;
  total: number;
  data: T[];
  success: boolean;
}

// 列表数据请求方法类型定义
export type RequestType = (params: SearchFormDataType) => Promise<RequestData<any>>;

export type BeforeSubmitType = (params: SearchFormDataType) => SearchFormDataType;

// 工具栏配置类型定义
export interface ToolbarType {
  show: boolean;
  title?: string;
  setting?: ('refresh' | 'fullScreen' | 'columnsSetup')[];
}

// todo elementPlus 没有导出，临时处理
type ElementColumnType = any;
// 表格column类型定义
type ColumnValueEnumType = {
  [key: string]: {
    text: string;
  };
};
export interface TableColumnType extends ElementColumnType {
  isSearch?: boolean;
  hideInTable?: boolean;
  fieldType?: string;
  valueEnum?: ColumnValueEnumType;
  fieldProps?: object;
  placeholder?: string;
}

// 搜索栏类型定义
interface ColConfigType {
  span?: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}
export interface SearchBarConfigType {
  show?: Boolean;
  gutter?: number;
  span?: number | ColConfigType;
  labelWidth?: number | 'auto';
}

// 搜索栏参数类型定义
export interface SearchFormDataType {
  [key: string]: any;
}

// 搜索项modelValue类型定义
export type SearchItemModelValueType = string | number | Date | Date[];
