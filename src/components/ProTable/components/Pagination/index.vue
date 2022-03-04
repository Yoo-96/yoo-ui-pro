<script lang="tsx">
/*
 * @module: ProTable组件 - 分页组件
 * @Author: yoo
 * @Date: 2022-03-04 15:56:15
 * @Description:
 */
import { defineComponent, PropType, toRefs, computed } from 'vue';
import useNamespace from '@/hooks/use-namespace';
import { localPagination } from '../../types';

export default defineComponent({
  name: 'Pagination',
  props: {
    pagination: {
      type: Object as PropType<localPagination>,
      default: () => {
        return {
          pageSize: 10,
          currentPage: 1,
        };
      },
    },
    total: {
      type: Number,
      default: 0,
    },
    paginationConfig: {
      type: Object,
      default: () => {},
    },
  },
  emits: {
    changePage: (currentPage: number, pageSize: number) => {
      return { currentPage, pageSize };
    },
  },
  setup(props, { emit }) {
    const ns = useNamespace('table');
    const { pagination, total, paginationConfig } = toRefs(props);

    const handleSizeChange = (pageSize: number) => {
      emit('changePage', pagination.value.currentPage, pageSize);
    };

    const handleCurrentChange = (currentPage: number) => {
      emit('changePage', currentPage, pagination.value.pageSize);
    };

    return () => {
      return (
        <div class={ns.b('pagination')}>
          <el-pagination
            {...paginationConfig.value}
            currentPage={pagination.value.currentPage}
            pageSize={pagination.value.pageSize}
            total={total.value}
            onSizeChange={handleSizeChange}
            onCurrentChange={handleCurrentChange}
          ></el-pagination>
        </div>
      );
    };
  },
});
</script>

<style lang="less">
@import url('./index.less');
</style>
