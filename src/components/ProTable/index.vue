<script lang="tsx">
/*
 * @module: ProTable组件
 * @Author: yoo
 * @Date: 2022-03-04 15:54:33
 * @Description:
 */
import { defineComponent, toRefs, onMounted, computed, ref, reactive } from 'vue';
import ProTableList from './components/TableList/index.vue';
import ProTableToolbar from './components/Toolbar/index.vue';
import ProTablePagination from './components/Pagination/index.vue';
import useNamespace from '@/hooks/use-namespace';
import { listResultType, localPagination } from './types';

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
      type: Function,
      required: true,
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
  setup(props, { attrs, expose }) {
    const ns = useNamespace('table');
    const proTableRef = ref();

    const { columns, showToolbar, headerTitle, request, paginationConfig } = toRefs(props);
    // 列表数据
    let localDataSource = ref<any[]>([]);
    // 列表加载
    let loading = ref<boolean>(false);
    // 数据总量
    let dataTotal = ref<number>(0);
    // 分页信息
    let localPagination = reactive<localPagination>({ pageSize: 10, currentPage: 1 });

    // 计算列配置
    const tableColumns = computed(() => {
      return columns.value;
    });

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
        .then((res: listResultType) => {
          const { pageSize, currentPage, total, data } = res;
          localDataSource.value = data;
          dataTotal.value = total;
          localPagination = {
            pageSize,
            currentPage,
          };
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
          {showToolbar.value && <ProTableToolbar headerTitle={headerTitle.value} />}

          <ProTableList
            ref={proTableRef}
            dataSource={localDataSource.value}
            columns={tableColumns.value}
            loading={loading.value}
          />

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
