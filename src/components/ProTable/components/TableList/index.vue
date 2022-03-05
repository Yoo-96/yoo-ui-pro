<script lang="tsx">
/*
 * @module: ProTable组件 - 表格列表组件
 * @Author: yoo
 * @Date: 2022-03-04 15:55:49
 * @Description:
 */
import { defineComponent, toRefs, ref } from 'vue';
import useNamespace from '@/hooks/use-namespace';
import type { ElTable } from 'element-plus';

export default defineComponent({
  name: 'Table',
  props: {
    columns: {
      type: Array,
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
  },
  setup(props, { expose }) {
    const proTableRef = ref<InstanceType<typeof ElTable>>();
    const ns = useNamespace('table');
    const { dataSource, columns, loading } = toRefs(props);

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
          <el-table ref="proTableRef" data={dataSource.value} v-loading={loading.value}>
            {(columns.value || []).map((column: any) => {
              const { render, ...restColumn } = column;

              if (typeof render === 'function') {
                return (
                  <el-table-column
                    {...restColumn}
                    v-slots={{
                      default: (scope: any) =>
                        render(scope.row[column.prop], scope.row, scope.$index),
                    }}
                  />
                );
              }
              return <el-table-column {...restColumn} />;
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
