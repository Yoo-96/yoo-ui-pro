<template>
  <div class="example">
    <el-button @click="onRefresh(false)">当前页刷新</el-button>
    <el-button @click="onRefresh(true)">刷新并返回首页</el-button>
    <pro-table
      ref="proTable"
      :columns="columns"
      :request="getData"
      show-toolbar
      header-title="ProTableExample"
      :pagination-config="{
        pageSizes: [10, 20, 30, 40],
        layout: 'total, sizes, prev, pager, next, jumper',
        small: true,
      }"
    >
    </pro-table>
  </div>
</template>

<script lang="tsx">
import { defineComponent, onMounted, ref } from 'vue';
import { UserRequestResultType } from '@/types/user';
import { fetchUsetList } from '@/api/user';

export default defineComponent({
  name: 'ProTableExample',
  setup() {
    const proTable = ref();

    const columns = [
      {
        type: 'index',
        prop: 'index',
        label: '序号',
        width: 80,
      },
      {
        prop: 'name',
        label: '姓名',
        // width: 150,
      },
      {
        prop: 'gender',
        label: '性别',
        // width: 150,
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
        // width: 150,
      },
      {
        prop: 'phone',
        label: '手机号',
        // width: 150,
      },
      {
        prop: 'wx',
        label: '微信号',
        // width: 150,
      },
      {
        prop: 'address',
        label: '地址',
        // width: 150,
      },
      {
        prop: 'action',
        label: '操作',
        // width: 150,
        render: (text: number, record: UserInfoType) => {
          return (
            <>
              <el-button type="text" size="small">
                编辑
              </el-button>
              <el-button type="text" size="small">
                删除
              </el-button>
            </>
          );
        },
      },
    ];

    const getData = async (params: any) => {
      const result: UserRequestResultType = await fetchUsetList(params);
      return result;
    };

    // 触发表格刷新
    const onRefresh = (reset?: boolean) => {
      proTable.value.refresh(reset);
    };

    return {
      proTable,
      columns,
      getData,
      onRefresh,
    };
  },
});
</script>
<style lang="less" scoped></style>
