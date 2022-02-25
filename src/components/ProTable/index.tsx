export default defineComponent({
  name: 'ProTable',
  props: {
    count: {
      type: Number,
      default: 0,
    },
    num: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    return () => <div>ProTable</div>;
  },
});
