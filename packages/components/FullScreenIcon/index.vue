<script lang="tsx">
import { defineComponent } from 'vue';
import { FullScreen } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import screenfull from 'screenfull';

export default defineComponent({
  name: 'FullScreenIcon',
  components: {
    FullScreen,
  },
  setup() {
    // 全屏
    const onFullScreen = () => {
      if (screenfull.isEnabled) {
        screenfull.toggle();
      } else {
        ElMessage.warning({
          message: '抱歉，当前浏览器不支持该全屏功能，可尝试使用F11触发全屏',
          type: 'warning',
        });
      }
    };

    return () => {
      return (
        <el-icon onClick={onFullScreen}>
          <full-screen />
        </el-icon>
      );
    };
  },
});
</script>

<style lang="less">
@import url('./index.less');
</style>
