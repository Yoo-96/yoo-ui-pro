<script lang="tsx">
/*
 * @module: ProTable组件 - 工具栏组件
 * @Author: yoo
 * @Date: 2022-03-04 15:55:30
 * @Description:
 */
import { defineComponent, toRefs } from 'vue';
import { RefreshRight, FullScreen, Setting } from '@element-plus/icons-vue';
import useNamespace from '@/hooks/use-namespace';

export default defineComponent({
  name: 'ProTableToolbar',
  components: {
    RefreshRight,
    FullScreen,
    Setting,
  },
  props: {
    headerTitle: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const ns = useNamespace('table');
    const { headerTitle } = toRefs(props);

    return () => {
      return (
        <div class={ns.b('toolbar')}>
          <div class={ns.be('toolbar', 'left')}>{headerTitle.value || ''}</div>
          <div class={ns.be('toolbar', 'right')}>
            <el-space size={12}>
              <el-button type="primary">Primary</el-button>
              <div class={ns.be('toolbar', 'setting')}>
                <el-space size={8}>
                  <el-icon>
                    <refresh-right />
                  </el-icon>
                  <el-icon>
                    <full-screen />
                  </el-icon>
                  <el-icon>
                    <setting />
                  </el-icon>
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
