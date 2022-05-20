<script lang="tsx">
/*
 * @module: ProTable组件 - 搜索项
 * @Author: yoo
 * @Date: 2022-04-28 16:59:58
 * @Description:
 */
import { defineComponent, PropType, toRefs, ref, watch, isRef, computed } from 'vue';
import type { TableColumnType } from '../../../types';
import {
  DEFAULT_FORM_ITEM_TYPE,
  DEFAULT_PLACEHOLDER,
  DEFAULT_DATA_FIELD_TYPE,
} from '@yui/components/ProTable/const';
import { SearchItemModelValueType } from '@yui/components/ProTable/types';
import useNamespace from '@yui/hooks/use-namespace';

export default defineComponent({
  name: 'SearchItem',
  props: {
    column: {
      type: Object as PropType<TableColumnType>,
      default: () => {},
    },
    modelValue: {
      type: [String, Number, Date, Array],
      default: () => '',
    },
  },
  setup(props, { emit }) {
    const ns = useNamespace('table');
    const { modelValue, column } = toRefs(props);
    const { fieldType, valueEnum, placeholder, fieldProps } = toRefs(column.value);
    let localValue = ref();

    const valueEnumArray = computed(() => {
      if (!valueEnum?.value) return [];
      return Object.keys(valueEnum.value).map((key: string) => {
        return {
          ...valueEnum?.value?.[key],
          key,
        };
      });
    });

    const formItemPlaceholder = computed(() => {
      if (placeholder?.value) {
        return placeholder.value;
      }
      if (fieldType?.value) {
        return DEFAULT_PLACEHOLDER[fieldType.value];
      }
      return DEFAULT_PLACEHOLDER[DEFAULT_FORM_ITEM_TYPE];
    });

    watch(
      () => modelValue.value,
      (newVal) => {
        localValue.value = newVal;
      },
      {
        immediate: true,
      },
    );

    const onInput = (value: SearchItemModelValueType) => {
      emit('update:modelValue', value);
    };

    const renderField = () => {
      const style = { width: '100%' };
      const currentFieldType = fieldType?.value;

      const currentFieldProps = {
        style,
        placeholder: formItemPlaceholder.value,
        ...fieldProps?.value,
      };

      if (currentFieldType === 'select') {
        return (
          <el-select {...currentFieldProps} v-model={localValue.value} onChange={onInput}>
            {valueEnumArray.value.map((item) => {
              return <el-option label={item.text} value={item.key} />;
            })}
          </el-select>
        );
      } else if (currentFieldType === 'data') {
        const dataFieldProps = {
          type: DEFAULT_DATA_FIELD_TYPE,
          size: 'default',
          ...currentFieldProps,
        };
        return <el-date-picker {...dataFieldProps} v-model={localValue.value} onChange={onInput} />;
      }
      return <el-input {...currentFieldProps} model-value={localValue.value} onInput={onInput} />;
    };

    return () => {
      return <div class={ns.b('search-item')}>{renderField()}</div>;
    };
  },
});
</script>

<style lang="less">
@import url('./index.less');
</style>
