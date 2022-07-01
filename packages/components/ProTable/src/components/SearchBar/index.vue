<script lang="tsx">
/*
 * @module: ProTable组件 - 搜索栏
 * @Author: yoo
 * @Date: 2022-04-28 16:59:29
 * @Description:
 */
import { defineComponent, toRefs, PropType, computed, reactive, isRef, ref } from 'vue';
import useNamespace from '@yui/hooks/use-namespace';
import useTableColumns from '@yui/hooks/use-table-columns/index';
import SearchItem from './SearchItem/index.vue';
import type { TableColumnType, SearchBarConfigType, SearchFormDataType } from '../../types';
import {
  DEFAULT_SEARCH_BAR_CONFIG,
  DEFAULT_SEARCH_COL_SPAN,
  DEFAULT_LABEL_WIDTH,
} from '../../const';
import { emit } from 'process';

export default defineComponent({
  name: 'SearchBar',
  components: {
    SearchItem,
  },
  props: {
    searchBarConfig: {
      type: Object as PropType<SearchBarConfigType>,
      default: DEFAULT_SEARCH_BAR_CONFIG,
    },
  },
  emits: ['search', 'reset'],
  setup(props, { emit }) {
    const ns = useNamespace('table');
    const { columns } = useTableColumns();
    const { searchBarConfig } = toRefs(props);
    let formData = reactive<SearchFormDataType>({});
    let searchFormRef = ref();

    const gutter = computed(() => {
      return searchBarConfig.value.gutter || DEFAULT_SEARCH_BAR_CONFIG.gutter;
    });

    const colConfig = computed(() => {
      if (searchBarConfig.value.span) {
        if (typeof searchBarConfig.value.span === 'number') {
          return {
            span: searchBarConfig.value.span,
          };
        }
        return searchBarConfig.value.span;
      }
      return {
        span: DEFAULT_SEARCH_COL_SPAN,
      };
    });

    const labelWidth = computed(() => {
      if (searchBarConfig.value.labelWidth) {
        if (typeof searchBarConfig.value.labelWidth === 'string') {
          return searchBarConfig.value.labelWidth;
        }
        return `${searchBarConfig.value.labelWidth}px`;
      }
      return `${DEFAULT_LABEL_WIDTH}px`;
    });

    const onSubmit = () => {
      emit('search', formData);
    };

    const onReset = () => {
      searchFormRef.value?.resetFields();
      emit('reset', formData);
    };

    return () => {
      return (
        <div class={ns.b('search-bar')}>
          <el-form ref={searchFormRef} model={formData} labelWidth={labelWidth.value}>
            <el-row gutter={gutter.value}>
              {columns
                .filter((column: TableColumnType) => !!column.isSearch)
                .map((column: TableColumnType) => {
                  return (
                    <el-col {...colConfig.value}>
                      <el-form-item label={column.label} prop={column.prop}>
                        <SearchItem column={column} v-model={formData[column.prop]}>
                          {column.label}
                        </SearchItem>
                      </el-form-item>
                    </el-col>
                  );
                })}
              <el-col {...colConfig.value}>
                <el-form-item>
                  <el-button type="primary" onClick={onSubmit}>
                    搜索
                  </el-button>
                  <el-button onClick={onReset}>重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      );
    };
  },
});
</script>

<style lang="less">
@import url('./index.less');
</style>
