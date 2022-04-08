<script lang="tsx">
/*
 * @module: ProTable组件
 * @Author: yoo
 * @Date: 2022-03-04 15:54:33
 * @Description:
 */
import { defineComponent, toRefs, onMounted, computed, ref, reactive, PropType, watch } from 'vue';
import ProTableList from './components/TableList/index.vue';
import ProTableToolbar from './components/Toolbar/index.vue';
import ProTablePagination from './components/Pagination/index.vue';
import useNamespace from '@/hooks/use-namespace';
import type { LocalPagination, RequestData, RequestType } from './types';
import { DEFAULT_ROW_KEY } from './const';

export default defineComponent({
  name: 'ProTable',
  components: {
    ProTableList,
    ProTableToolbar,
    ProTablePagination,
  },
  props: {
    // -------- 表格模块属性 --------
    // 表格列配置
    columns: {
      type: Array,
      required: true,
      default: () => [],
    },
    request: {
      type: Function as PropType<RequestType>,
      required: true,
    },
    rowKey: {
      type: String,
      default: DEFAULT_ROW_KEY,
    },

    // -------- 工具栏模块属性 --------
    showToolbar: {
      type: Boolean,
      default: true,
    },
    headerTitle: {
      type: String,
      default: '',
    },
    paginationConfig: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { expose }) {
    const ns = useNamespace('table');
    const proTableRef = ref();

    const { columns, showToolbar, headerTitle, request, paginationConfig, rowKey } = toRefs(props);
    // 列表数据
    let localDataSource = ref<any[]>([]);
    // 列表加载
    let loading = ref<boolean>(false);
    // 数据总量
    let dataTotal = ref<number>(0);
    // 分页信息
    let localPagination = reactive<LocalPagination>({ pageSize: 10, currentPage: 1 });

    // -------- 计算列配置开始 --------
    let currentColumns = ref<any>([]); // 需要显示的列

    const handleUpdateColumns = (value: any[]) => {
      currentColumns.value = value;
    };
    // -------- 计算列配置结束 --------

    onMounted(() => {
      fetchData(localPagination);
    });

    // 请求数据
    const fetchData = ({ pageSize = 10, currentPage = 1 }) => {
      loading.value = true;
      const params = {
        pageSize,
        currentPage,
      };
      request
        .value(params)
        .then((res: RequestData<any>) => {
          const { total, data, success, ...rest } = res;

          if (success) {
            localDataSource.value = data;
            dataTotal.value = total;
            localPagination = {
              pageSize: rest.pageSize || pageSize,
              currentPage: rest.currentPage || currentPage,
            };
          }
        })
        .finally(() => {
          loading.value = false;
        });
    };

    // 分页操作
    const handleChangePage = (currentPage: number, pageSize: number) => {
      fetchData({ pageSize, currentPage });
    };

    /**
     * 刷新列表
     * @param {Boolean} reset 是否重置回第一页
     */
    const refresh = (reset?: boolean) => {
      const params = {
        pageSize: reset ? 10 : localPagination.pageSize,
        currentPage: reset ? 1 : localPagination.currentPage,
      };
      fetchData(params);
    };

    // 清空选中
    const clearSelection = () => {
      proTableRef.value?.clearSelection();
    };

    // 对外暴露属性和方法
    expose({
      refresh,
      clearSelection,
    });

    return () => {
      return (
        <div class={ns.b()}>
          {showToolbar.value && (
            <ProTableToolbar
              columns={columns.value}
              headerTitle={headerTitle.value}
              onRefresh={refresh}
              onUpdateColumns={handleUpdateColumns}
            />
          )}

          {currentColumns.value.length > 0 && (
            <ProTableList
              rowKey={rowKey.value}
              ref={proTableRef}
              dataSource={localDataSource.value}
              columns={currentColumns.value}
              loading={loading.value}
            />
          )}

          <ProTablePagination
            paginationConfig={paginationConfig}
            total={dataTotal.value}
            pagination={localPagination}
            onChangePage={handleChangePage}
          />
        </div>
      );
    };
  },
});
</script>
