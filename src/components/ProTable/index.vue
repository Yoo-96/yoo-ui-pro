<script lang="tsx">
/*
 * @module: ProTable组件
 * @Author: yoo
 * @Date: 2022-03-04 15:54:33
 * @Description:
 */
import {
  defineComponent,
  toRefs,
  onMounted,
  ref,
  reactive,
  PropType,
  provide,
  readonly,
} from 'vue';
import ProTableList from './components/TableList/index.vue';
import ProTableToolbar from './components/Toolbar/index.vue';
import ProTablePagination from './components/Pagination/index.vue';
import SearchBar from './components/SearchBar/index.vue';
import useNamespace from '@/hooks/use-namespace';
import type {
  LocalPagination,
  RequestData,
  RequestType,
  BeforeSubmitType,
  ToolbarType,
  TableColumnType,
  SearchBarConfigType,
  SearchFormDataType,
} from './types';
import {
  DEFAULT_ROW_KEY,
  DEFAULT_SEARCH_BAR_CONFIG,
  DEFAULT_PAGE_SIZE,
  DEFAULT_CURRENT_PAGE,
} from './const';

export default defineComponent({
  name: 'ProTable',
  components: {
    ProTableList,
    ProTableToolbar,
    ProTablePagination,
    SearchBar,
  },
  props: {
    // -------- 表格模块属性 --------
    // 表格列配置
    columns: {
      type: Array as PropType<TableColumnType[]>,
      required: true,
      default: () => [],
    },
    request: {
      type: Function as PropType<RequestType>,
      required: true,
    },
    beforeSubmit: {
      type: Function as PropType<BeforeSubmitType>,
      required: true,
    },
    rowKey: {
      type: String,
      default: DEFAULT_ROW_KEY,
    },

    // -------- 工具栏模块属性 --------
    toolbar: {
      type: Object as PropType<ToolbarType>,
      default: () => {},
    },

    // -------- 分页模块属性 --------
    paginationConfig: {
      type: Object,
      default: () => {},
    },

    // -------- 搜索栏模块属性 --------
    searchBarConfig: {
      type: Object as PropType<SearchBarConfigType>,
      default: DEFAULT_SEARCH_BAR_CONFIG,
    },
  },
  setup(props, { expose }) {
    const ns = useNamespace('table');
    const proTableRef = ref();

    const { columns, toolbar, request, beforeSubmit, paginationConfig, rowKey, searchBarConfig } =
      toRefs(props);
    provide('columns', readonly(columns.value));

    // 列表数据
    let localDataSource = ref<any[]>([]);
    // 列表加载
    let loading = ref<boolean>(false);
    // 数据总量
    let dataTotal = ref<number>(0);
    // 分页信息
    let localPagination = reactive<LocalPagination>({
      pageSize: DEFAULT_PAGE_SIZE,
      currentPage: DEFAULT_CURRENT_PAGE,
    });
    // 搜索表单值
    let searchFormData = reactive<SearchFormDataType>({});

    // -------- 计算列配置开始 --------
    let currentColumns = ref<TableColumnType[]>([]); // 需要显示的列

    const handleUpdateColumns = (value: TableColumnType[]) => {
      currentColumns.value = value;
    };
    // -------- 计算列配置结束 --------

    onMounted(() => {
      fetchData(localPagination);
    });

    // 请求数据
    const fetchData = ({ pageSize = DEFAULT_PAGE_SIZE, currentPage = DEFAULT_CURRENT_PAGE }) => {
      loading.value = true;
      const params = {
        ...searchFormData,
        pageSize,
        currentPage,
      };
      const fetchParams = beforeSubmit.value(params);
      request
        .value(fetchParams)
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
        pageSize: reset ? DEFAULT_PAGE_SIZE : localPagination.pageSize,
        currentPage: reset ? DEFAULT_CURRENT_PAGE : localPagination.currentPage,
      };
      fetchData(params);
    };

    // 清空选中
    const clearSelection = () => {
      proTableRef.value?.clearSelection();
    };

    // 搜索
    const onSearch = (formData: SearchFormDataType) => {
      Object.assign(searchFormData, formData);
      fetchData(localPagination);
    };

    // 重置
    const onReset = () => {
      const params = {
        pageSize: DEFAULT_PAGE_SIZE,
        currentPage: DEFAULT_CURRENT_PAGE,
      };
      searchFormData = {};
      fetchData(params);
    };

    // 对外暴露属性和方法
    expose({
      refresh,
      clearSelection,
    });

    return () => {
      return (
        <div class={ns.b()}>
          {searchBarConfig.value.show && (
            <SearchBar
              searchBarConfig={searchBarConfig.value}
              onSearch={onSearch}
              onReset={onReset}
            />
          )}

          {toolbar.value.show && (
            <ProTableToolbar
              toolbar={toolbar.value}
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
