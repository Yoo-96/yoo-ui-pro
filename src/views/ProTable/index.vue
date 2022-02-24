<template>
  <div>pro-table</div>
  <div>{{ count }}</div>
  <el-button>I am ElButton</el-button>
</template>

<script lang="ts">
export default defineComponent({
  name: 'ProTable',
  setup() {
    const count = ref<number>(2);
    return {
      count,
    };
  },
});
</script>
<style lang="less" scoped></style>
