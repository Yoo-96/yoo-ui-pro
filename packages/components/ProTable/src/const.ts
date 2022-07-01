/*
 * @module: ProTable组件 - 常量
 * @Author: yoo
 * @Date: 2022-04-06 09:22:01
 * @Description:
 */
import type { SearchBarConfigType } from './types';

// 默认分页
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_CURRENT_PAGE = 1;

// 表格column中选择列prop默认值
export const SELECTION_COLUMN_KEY: string = 'selection';

// 表格column中序号列prop默认值
export const INDEX_COLUMN_KEY: string = 'index';

// 表格rowkey默认值
export const DEFAULT_ROW_KEY: string = 'id';

// 搜索栏默认配置
export const DEFAULT_SEARCH_COL_GUTTER: number = 10;
export const DEFAULT_SEARCH_COL_SPAN: number = 8;
export const DEFAULT_LABEL_WIDTH: number = 80;
export const DEFAULT_SEARCH_BAR_CONFIG: SearchBarConfigType = {
  show: true,
  gutter: DEFAULT_SEARCH_COL_GUTTER,
  span: DEFAULT_SEARCH_COL_SPAN,
};

// 搜索栏默认表单项type
export const DEFAULT_FORM_ITEM_TYPE: string = 'text';

// 搜索栏默认placeholder
export const DEFAULT_PLACEHOLDER: { [key: string]: string } = {
  text: '请输入',
  select: '请选择',
  data: '请选择',
};

// 搜索栏 data 项默认类型
export const DEFAULT_DATA_FIELD_TYPE = 'date';

// 搜索栏 DatePicker 默认size
export const DATE_PICKER_DEFAULT_SIZE = 'small';
