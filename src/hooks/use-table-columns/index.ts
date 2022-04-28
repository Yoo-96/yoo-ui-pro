/*
 * @module: use-table-columns hooks
 * @Author: yoo
 * @Date: 2022-04-28 16:58:49
 * @Description:
 */
import { inject } from 'vue';

const useTableColumns = () => {
  const columns = inject('columns', []);
  return {
    columns,
  };
};

export default useTableColumns;
