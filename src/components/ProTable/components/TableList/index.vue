<script lang="tsx">
/*
 * @module: ProTable组件 - 表格列表组件
 * @Author: yoo
 * @Date: 2022-03-04 15:55:49
 * @Description:
 */
import { defineComponent, toRefs } from 'vue';
import useNamespace from '@/hooks/use-namespace';

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
  setup(props) {
    const ns = useNamespace('table');
    const { dataSource, columns, loading } = toRefs(props);

    return () => {
      return (
        <div class={ns.b('list')}>
          <el-table data={dataSource.value} v-loading={loading.value}>
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
