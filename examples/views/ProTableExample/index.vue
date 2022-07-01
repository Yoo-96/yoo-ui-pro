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
import ProTable from '@packages/components/ProTable';
import { UserRequestResultType, RequestData } from '@examples/types/user';
import { fetchUsetList } from '@examples/api/user';
import { UserInfoType } from '@examples/types/user';

export default defineComponent({
  name: 'ProTableExample',
  components: {
    ProTable,
  },
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
