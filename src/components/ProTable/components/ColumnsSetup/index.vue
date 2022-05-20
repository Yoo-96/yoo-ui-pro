<script lang="tsx">
/*
 * @module: ProTable组件 - 表格列设置
 * @Author: yoo
 * @Date: 2022-04-05 11:19:05
 * @Description:
 */
import { defineComponent, ref, onMounted, watch } from 'vue';
import { Setting } from '@element-plus/icons-vue';
import useNamespace from '@/hooks/use-namespace';
import { SELECTION_COLUMN_KEY, INDEX_COLUMN_KEY } from '../../const';
import useTableColumns from '@/hooks/use-table-columns/index';
import type { TableColumnType } from '../../types';

export default defineComponent({
  name: 'ColumnsSetup',
  components: {
    Setting,
  },
  emits: ['updateColumns'],
  setup(props, { emit }) {
    const ns = useNamespace('table');
    const { columns } = useTableColumns();
    const checkAll = ref(true);
    const isIndeterminate = ref(false);
    const checkedColumns = ref<string[]>([]);
    const localColumns = ref<TableColumnType[]>([]);

    onMounted(() => {
      watch(
        () => columns,
        (val) => {
          setLocalColumns(val);
        },
        { immediate: true },
      );
    });

    const setLocalColumns = (val: TableColumnType[]) => {
      const keys: string[] = [];
      localColumns.value = val
        .filter((item: TableColumnType) => !item.hideInTable)
        .map((item: TableColumnType) => {
          let c = { ...item };
          if (!item.prop) {
            if (item.type === SELECTION_COLUMN_KEY) {
              c.prop = SELECTION_COLUMN_KEY;
            } else if (item.type === INDEX_COLUMN_KEY) {
              c.prop = INDEX_COLUMN_KEY;
            }
          }
          keys.push(c.prop);
          return c;
        });
      checkedColumns.value = keys;
      handleEmitUpdate();
    };

    const onChangeColumns = (value: string[]) => {
      const checkedCount = value.length;
      checkAll.value = checkedCount === localColumns.value.length;
      isIndeterminate.value = checkedCount > 0 && checkedCount < localColumns.value.length;
      checkedColumns.value = value;
      handleEmitUpdate();
    };

    const handleCheckAllChange = (checked: boolean) => {
      checkedColumns.value = checked
        ? localColumns.value.map((item: TableColumnType) => item.prop)
        : [];
      isIndeterminate.value = false;
      checkAll.value = checked;
      handleEmitUpdate();
    };

    const handleEmitUpdate = () => {
      const resColumns = localColumns.value.filter((item: TableColumnType) => {
        return checkedColumns.value.includes(item.prop);
      });
      emit('updateColumns', resColumns);
    };

    return () => {
      return (
        <div class={ns.b('columns-setup')}>
          <el-popover
            placement="bottom-end"
            popperClass={ns.be('columns-setup', 'poppver')}
            title={null}
            width={150}
            trigger="click"
            v-slots={{
              reference: () => {
                return (
                  <el-icon>
                    <setting />
                  </el-icon>
                );
              },
            }}
          >
            <div class={ns.be('columns-setup', 'container')}>
              <div class={ns.be('columns-setup', 'header')}>
                <el-checkbox
                  modelValue={checkAll.value}
                  indeterminate={isIndeterminate.value}
                  onChange={handleCheckAllChange}
                >
                  列显示
                </el-checkbox>
              </div>
              <div class={ns.be('columns-setup', 'content')}>
                <el-checkbox-group modelValue={checkedColumns.value} onChange={onChangeColumns}>
                  {localColumns.value.map((column: TableColumnType) => {
                    return (
                      <el-checkbox key={column.prop} label={column.prop}>
                        {column.label}
                      </el-checkbox>
                    );
                  })}
                </el-checkbox-group>
              </div>
            </div>
          </el-popover>
        </div>
      );
    };
  },
});
</script>

<style lang="less">
@import url('./index.less');
</style>
