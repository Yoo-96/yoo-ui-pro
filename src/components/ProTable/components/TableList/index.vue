<script lang="tsx">
/*
 * @module: ProTable组件 - 表格列表组件
 * @Author: yoo
 * @Date: 2022-03-04 15:55:49
 * @Description:
 */
import { defineComponent, toRefs, ref, PropType } from 'vue';
import useNamespace from '@/hooks/use-namespace';
import type { ElTable } from 'element-plus';
import { DEFAULT_ROW_KEY } from '../../const';
import type { TableColumnType } from '../../types';

export default defineComponent({
  name: 'TableList',
  props: {
    columns: {
      type: Array as PropType<TableColumnType[]>,
      default: () => [],
    },
    dataSource: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    rowKey: {
      type: String,
      default: DEFAULT_ROW_KEY,
    },
  },
  setup(props, { expose }) {
    const proTableRef = ref<InstanceType<typeof ElTable>>();
    const ns = useNamespace('table');
    const { dataSource, columns, loading, rowKey } = toRefs(props);

    // 清空选中
    const clearSelection = () => {
      proTableRef.value?.clearSelection();
    };

    // 对外暴露属性和方法
    expose({
      clearSelection,
    });

    return () => {
      return (
        <div class={ns.b('list')}>
          <el-table
            ref={proTableRef}
            data={dataSource.value}
            rowKey={rowKey.value}
            v-loading={loading.value}
          >
            {(columns.value || []).map((column: TableColumnType) => {
              const { render, ...restColumn } = column;

              if (typeof render === 'function') {
                return (
                  <el-table-column
                    key={restColumn.prop}
                    {...restColumn}
                    v-slots={{
                      default: (scope: any) =>
                        render(scope.row[column.prop], scope.row, scope.$index),
                    }}
                  />
                );
              }
              return <el-table-column key={restColumn.prop} {...restColumn} />;
            })}
          </el-table>
        </div>
      );
    };
  },
});
</script>

<style lang="less">
@import url('./index.less');
</style>
