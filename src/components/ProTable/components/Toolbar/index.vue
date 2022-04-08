<script lang="tsx">
/*
 * @module: ProTable组件 - 工具栏组件
 * @Author: yoo
 * @Date: 2022-03-04 15:55:30
 * @Description:
 */
import { defineComponent, toRefs, PropType } from 'vue';
import { RefreshRight } from '@element-plus/icons-vue';
import FullScreenIcon from '@/components/FullScreenIcon/index.vue';
import ColumnsSetup from '../ColumnsSetup/index.vue';
import useNamespace from '@/hooks/use-namespace';
import type { ToolbarType } from '../../types';

export default defineComponent({
  name: 'ProTableToolbar',
  components: {
    RefreshRight,
    FullScreenIcon,
    ColumnsSetup,
  },
  props: {
    toolbar: {
      type: Object as PropType<ToolbarType>,
      default: () => {
        return {
          show: true,
        };
      },
    },
  },
  emits: ['refresh'],
  setup(props, { emit, attrs }) {
    const ns = useNamespace('table');
    const { toolbar } = toRefs(props);

    // 刷新列表
    const onRefresh = () => {
      emit('refresh', false);
    };

    return () => {
      return (
        <div class={ns.b('toolbar')}>
          <div class={ns.be('toolbar', 'left')}>{toolbar.value.title || ''}</div>
          <div class={ns.be('toolbar', 'right')}>
            <el-space size={12}>
              <el-button type="primary">Primary</el-button>
              <div class={ns.be('toolbar', 'operation')}>
                <el-space size={8}>
                  <el-icon onClick={onRefresh}>
                    <refresh-right />
                  </el-icon>

                  <FullScreenIcon />

                  <ColumnsSetup {...attrs} />
                </el-space>
              </div>
            </el-space>
          </div>
        </div>
      );
    };
  },
});
</script>

<style lang="less">
@import url('./index.less');
</style>
