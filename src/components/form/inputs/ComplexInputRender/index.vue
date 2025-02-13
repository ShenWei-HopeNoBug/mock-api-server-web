<template>
  <span>
    <BaseInputRender
      v-if="inputCoreTypeSet.has(options.inputType)"
      class="input"
      v-model="value"
      :size="size"
      :options="options"
      :publicBindAttrs="publicBindAttrs"
      v-bind="getBindAttrs('baseInputRender')"
      @change="onChange"
    />
    <CheckBoxGroupInput
      v-else-if="options.inputType === 'checkBoxGroupInput'"
      class="input"
      v-model="value"
      :size="size"
      :options="options"
      v-bind="getBindAttrs(options.inputType)"
      @change="onChange"
    />
  </span>
</template>

<script>
import { defaultAttrsMap, inputCoreTypeSet } from './config';
import BaseInputRender from '../BaseInputRender';
import CheckBoxGroupInput from '../CheckBoxGroupInput';

export default {
  name: 'ComplexInputRender',
  components: {
    BaseInputRender,
    CheckBoxGroupInput,
  },
  model: {
    prop: 'inputValue',
    event: 'change'
  },
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
    inputValue: {},
    size: {
      type: String,
      default: 'small'
    },
    publicBindAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      inputCoreTypeSet,
      value: undefined,
    };
  },
  watch: {
    inputValue: {
      handler(val) {
        this.value = val;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // 获取绑定的标签属性
    getBindAttrs(inputType) {
      const defaultAttrs = defaultAttrsMap[inputType] || {};
      const { bindAttrs = {} } = this.options || {};
      return {
        ...defaultAttrs,
        ...bindAttrs,
      };
    },
    onChange(val) {
      this.$emit('change', val);
    }
  }
};
</script>

<style scoped lang="less">
.input {
  width: 100%;
}
</style>
