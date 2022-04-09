# ProTable 组件说明

ProTable 是基于 [element-plus table](https://element-plus.org/zh-CN/component/table.html) 组件上封装的高级表格组件，通过配置即可完成项目中表格列表界面的开发。

主要由搜索栏、工具栏、表格列表、分页栏四个模块构成。

## API

### request

```js
<template>
<pro-table
  ref="proTable"
  :request="getData"
>
</template>
<script lang="tsx">
export default defineComponent({
  setup() {
    const getData = async (params: { [key: string]: any }) => {
      // params 中一定会有 pageSize 和 currentPage 两个参数
      const {
        success,
        result: { pageSize, currentPage, total, data },
      }: UserRequestResultType = await fetchUsetList(params);
      return {
        // 每页条数（非必须）
        pageSize,
        // 当前页（非必须）
        currentPage,
        // 数据总数
        total,
        // 数据源
        data,
        // 请求成功标识，true为成功，才会加载数据
        success,
      };
    };

    return {
      getData,
    };
  }
});
</script>
```

### ProTable

| 参数               | 说明              | 类型                 | 是否必填           | 默认值             |
| :---------------- | :---------------- | :------------------- | :----------------- | :-------------- |
| request           | 列表数据请求 | `(params: {pageSize,currentPage}) => {pageSize, currentPage, total, data, success}` | 是 | - |
| row-key           | 表格行 `key` 的取值               | `string`                  | 否              | id |
| columns           | Columns 列定义，详情见下文               | `any[]`                  | 是              |
| toolbar           | Toolbar 工具栏配置属性，详情见下文        | `ToolbarType`      | 否              |
| pagination-config | Pagination 分页栏配置属性，详情见下文     | -     | 否              |
### Columns 列定义

支持 [table](https://element-plus.org/zh-CN/component/table.html#table-column-attributes) 组件列配置属性

| 参数               | 说明              | 类型                 | 是否必填           | 默认值             |
| :---------------- | :---------------- | :------------------- | :----------------- | :-------------- |
| render | 自定义render | `function(text, record, index) {}` | 否 | - |

### 搜索栏

| 参数               | 说明              | 类型                 | 是否必填           | 默认值             |
| :---------------- | :---------------- | :------------------- | :----------------- | :-------------- |

### 工具栏

| 参数               | 说明              | 类型                 | 是否必填           | 默认值             |
| :---------------- | :---------------- | :------------------- | :----------------- | :-------------- |
| show           | 是否显示工具栏               | `boolean`                | 是               | - |
| title           | 表格标题               | `string`                | 否               | - |
| setting           | 操作区icon功能设置               | ` ('refresh' | 'fullScreen' | 'columnsSetup')[]`                | 否               | - |

### 表格列表

| 参数               | 说明              | 类型                 | 是否必填           | 默认值             |
| :---------------- | :---------------- | :------------------- | :----------------- | :-------------- |

### 分页栏

| 参数               | 说明              | 类型                 | 是否必填           | 默认值             |
| :---------------- | :---------------- | :------------------- | :----------------- | :-------------- |
| paginationConfig | 分页栏额外配置，支持 [pagination](https://element-plus.org/zh-CN/component/pagination.html#%E5%B1%9E%E6%80%A7) 组件属性 | `object` | 否 | - |

## Table Methods

| 名称               | 说明              | 参数                  |
| :---------------- | :---------------- | :------------------- |
| refresh   | 刷新列表数据    | `reset?: boolean` 是否刷新返回第一页        |
| clearSelection | 用于多选表格，清空用户的选择 | - |

