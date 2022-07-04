# ProTable 组件说明

ProTable 是基于 [element-plus table](https://element-plus.org/zh-CN/component/table.html) 组件上封装的高级表格组件，通过配置即可完成项目中表格列表界面的开发。

主要由搜索栏、工具栏、表格列表、分页栏四个模块构成。

## 代码示例

```vue
<template>
  <div class="example">
    <el-button @click="onRefresh(false)">当前页刷新</el-button>
    <el-button @click="onRefresh(true)">刷新并返回首页</el-button>
    <el-button @click="onClearSelection()">清空多选</el-button>
    <pro-table
      ref="proTable"
      :columns="columns"
      :request="getData"
      :before-submit="beforeSubmit"
      row-key="id"
      :toolbar="{
        show: true,
        title: 'ProTableExample',
        setting: ['refresh', 'fullScreen', 'columnsSetup'],
      }"
      :pagination-config="{
        pageSizes: [10, 20, 30, 40],
        layout: 'total, sizes, prev, pager, next, jumper',
        small: true,
      }"
      :search-bar-config="{
        show: true,
        gutter: 12,
        span: 8,
        labelWidth: 80,
      }"
    >
    </pro-table>
  </div>
</template>

<script lang="tsx">
import { defineComponent, ref } from 'vue';
import { UserRequestResultType, RequestData } from '@/types/user';
import { fetchUsetList } from '@/api/user';
import { UserInfoType } from '@/types/user';

export default defineComponent({
  name: 'ProTableExample',
  setup() {
    const proTable = ref();

    const columns = [
      {
        type: 'selection',
        width: 50,
        label: '列选择',
      },
      {
        type: 'index',
        label: '序号',
        width: 80,
      },
      {
        prop: 'name',
        label: '姓名',
        // width: 150,
        isSearch: true,
        fieldType: 'text',
      },
      {
        prop: 'gender',
        label: '性别',
        isSearch: true,
        // width: 150,
        fieldType: 'select',
        valueEnum: {
          0: { text: '女' },
          1: { text: '男' },
        },
        placeholder: '请选择性别',
        render: (text: number) => (text === 1 ? '男' : '女'),
      },
      {
        prop: 'age',
        label: '年龄',
        // width: 150,
      },
      {
        prop: 'email',
        label: '邮箱',
        isSearch: true,
        // width: 150,
      },
      {
        prop: 'phone',
        label: '手机号',
        isSearch: true,
        // width: 150,
      },
      {
        prop: 'wx',
        label: '微信号',
        isSearch: true,
        // width: 150,
      },
      {
        prop: 'address',
        label: '地址',
        isSearch: true,
        // width: 150,
      },
      {
        prop: 'age',
        label: '创建时间',
        isSearch: true,
        fieldType: 'data',
        hideInTable: true,
        fieldProps: {
          type: 'daterange',
          startPlaceholder: '开始日期',
          endPlaceholder: '结束日期',
        },
      },
      {
        prop: 'action',
        label: '操作',
        // width: 150,
        render: (text: number, record: UserInfoType) => {
          return (
            <>
              <el-button text size="small">
                编辑
              </el-button>
              <el-button text size="small">
                删除
              </el-button>
            </>
          );
        },
      },
    ];

    const beforeSubmit = (params: { [key: string]: any }): { [key: string]: any } => {
      const fetchParams = {
        ...params,
        action: '列表请求',
      };
      return fetchParams;
    };

    const getData = async (params: { [key: string]: any }): Promise<RequestData> => {
      console.log('request params: ', params);
      const {
        success,
        result: { pageSize, currentPage, total, data },
      }: UserRequestResultType = await fetchUsetList(params);
      return {
        pageSize,
        currentPage,
        total,
        data,
        success,
      };
    };

    // 触发表格刷新
    const onRefresh = (reset?: boolean) => {
      proTable.value.refresh(reset);
    };

    // 清空表格多选
    const onClearSelection = () => {
      proTable.value.clearSelection();
    };

    return {
      proTable,
      columns,
      getData,
      beforeSubmit,
      onRefresh,
      onClearSelection,
    };
  },
});
</script>
<style lang="less" scoped></style>
```

## API

### request

`request` 是组件列表数据请求唯一方法，接收一个方法，需要返回 `data`、`success`、`total`，组件内已实现列表 `loading`。

初始化/查询/重置/分页变化 时，会重新执行 `request` 方法，并传入最新的 `params`，可通过 `before-submit` api 在请求前对参数进行处理

### ProTable

| 参数               | 说明              | 类型                 | 是否必填           | 默认值             |
| :---------------- | :---------------- | :------------------- | :----------------- | :-------------- |
| request           | 列表数据请求 | `(params: { [key: string]: any }) => {pageSize?: number, currentPage?: number, total: number, data: T[], success: boolean}` | 是 | - |
| before-submit | 列表数据请求前触发，可对参数进行处理 | `(params: { [key: string]: any }) => { [key: string]: any }` | 是 | - |
| row-key           | 表格行 `key` 的取值               | `string`                  | 否              | id |
| columns           | [`Columns`](#Columns) 列定义，详情见下文               | `TableColumnType[]`                  | 是              |
| toolbar           | [`Toolbar`](#Toolbar) 工具栏配置属性，详情见下文        | `ToolbarType`      | 否              |
| pagination-config | [`Pagination`](#Pagination)分页栏配置属性，详情见下文     | -     | 否              |
| search-bar-config | [`SearchBarConfig`](#SearchBarConfig) 配置属性，详情见下文     | `SearchBarConfigType`     | 否              |
#### <span id="Columns">Columns 列定义</span>

支持 [table](https://element-plus.org/zh-CN/component/table.html#table-column-attributes) 组件列配置属性

| 参数               | 说明              | 类型                 | 是否必填           | 默认值             |
| :---------------- | :---------------- | :------------------- | :----------------- | :-------------- |
| render | 自定义render | `function(text, record, index) {}` | 否 | - |
| isSearch | 是否搜索项 | `boolean` | 否 | false |
| hideInTable | 在 Table 中不展示此列 | `boolean` | 否 | false |
| fieldType | 搜索项组件类型 | `select` / `text` / `date` | 否 | text |
| fieldProps | 搜索项的 props，会透传给搜索项，支持对应 `fieldType` 类型组件的所有props | `object` | 否 | {} |

#### <span id="SearchBarConfig">搜索栏</span>

| 参数               | 说明              | 类型                 | 是否必填           | 默认值             |
| :---------------- | :---------------- | :------------------- | :----------------- | :-------------- |
| show | 是否显示搜索栏 | `boolean` | 否 | true |
| gutter | 栅格间隔 | `number` | 否 | 10 |
| span | 搜索栏列数 | `number` / [`ColConfigType`](#ColConfigType) | 否 | 8 |
| labelWidth | 标签的长度 label 长度 | `number` / `auto` | 否 | 80 |

##### <span id="ColConfigType">ColConfigType</span>

```js
const colConfig = {
  span: '8';
  xs: '24';
  sm: '24';
  md: '12';
  lg: '8';
  xl: '8';
}
```

#### <span id="Toolbar">工具栏</span>

| 参数               | 说明              | 类型                 | 是否必填           | 默认值             |
| :---------------- | :---------------- | :------------------- | :----------------- | :-------------- |
| show           | 是否显示工具栏               | `boolean`                | 是               | - |
| title           | 表格标题               | `string`                | 否               | - |
| setting           | 操作区icon功能设置               | ` ('refresh' | 'fullScreen' | 'columnsSetup')[]`                | 否               | - |

#### <span id="Pagination">分页栏</span>

| 参数               | 说明              | 类型                 | 是否必填           | 默认值             |
| :---------------- | :---------------- | :------------------- | :----------------- | :-------------- |
| paginationConfig | 分页栏额外配置，支持 [pagination](https://element-plus.org/zh-CN/component/pagination.html#%E5%B1%9E%E6%80%A7) 组件属性 | `object` | 否 | - |

### Table 方法

| 名称               | 说明              | 参数                  |
| :---------------- | :---------------- | :------------------- |
| refresh   | 刷新列表数据    | `reset?: boolean` 是否刷新返回第一页        |
| clearSelection | 用于多选表格，清空用户的选择 | - |

