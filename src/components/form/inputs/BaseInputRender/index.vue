<template>
  <span>
    <el-input
      class="input"
      v-if="textInputTypeSet.has(options.inputType)"
      v-model="value"
      :size="size"
      v-bind="getBindAttrs(options.inputType)"
      @input="onChange"
    />
    <el-date-picker
      class="input"
      v-else-if="dateInputTypeSet.has(options.inputType)"
      v-model="value"
      :size="size"
      v-bind="getBindAttrs(options.inputType)"
      @input="onChange"
    />
    <el-select
      class="input"
      v-else-if="options.inputType === 'selectInput'"
      v-model="value"
      :size="size"
      v-bind="getBindAttrs(options.inputType)"
      @input="onChange"
    >
      <el-option
        v-for="(o,j) in options.valueEnum"
        :key="`${options.key}_option_${j}`"
        :label="o.label"
        :value="o.value"
        v-bind="o.bindAttrs"
      />
    </el-select>
    <el-radio-group
      class="input"
      v-else-if="options.inputType === 'radioGroupInput'"
      v-model="value"
      :size="size"
      v-bind="getBindAttrs(options.inputType)"
      @input="onChange"
    >
      <el-radio
        class="radio"
        v-for="(o,j) in options.valueEnum"
        :key="`${options.key}_option_${j}`"
        :label="o.value"
        v-bind="o.bindAttrs"
      >
        {{ o.label }}
      </el-radio>
    </el-radio-group>
    <el-checkbox
      class="input"
      v-else-if="options.inputType === 'checkboxInput'"
      v-model="value"
      :size="size"
      v-bind="getBindAttrs(options.inputType)"
      @input="onChange"
    >{{ options.checkBoxLabel }}
    </el-checkbox>
    <el-input-number
      class="input"
      v-else-if="options.inputType === 'numberInput'"
      v-model="value"
      :size="size"
      v-bind="getBindAttrs(options.inputType)"
      @input="onChange"
    />
    <el-time-picker
      class="input"
      v-else-if="timeInputTypeSet.has(options.inputType)"
      v-model="value"
      :size="size"
      v-bind="getBindAttrs(options.inputType)"
      @input="onChange"
    />
    <span class="sliderContainer" v-else-if="options.inputType === 'sliderInput'">
      <el-slider
        class="sliderInput"
        v-model="value"
        :input-size="size"
        v-bind="getBindAttrs(options.inputType)"
        @change="onChange"
      />
      <div v-if="options.displayValue" class="sliderValue">{{ value }}</div>
    </span>
  </span>
</template>

<script>
import {
  getDefaultAttrsMap,
  inputDefaultValueMap,
  dateInputTypeSet,
  timeInputTypeSet,
  textInputTypeSet
} from './config';

export default {
  name: 'BaseInputRender',
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
      dateInputTypeSet,
      timeInputTypeSet,
      textInputTypeSet,
      value: undefined,
    };
  },
  watch: {
    inputValue: {
      handler(val) {
        const { inputType = '' } = this.options || {};

        let setValue = val;
        if (inputType === 'selectInput' && !this.checkSelectInputValueValid(val, this.options)) {
          setValue = undefined;
        }

        // 判断是否设置了参数，没设置则取内置默认参数进行设置
        setValue = typeof setValue === 'undefined' ? inputDefaultValueMap[inputType] : setValue;

        const updateValue = () => {
          this.value = setValue;
          if (val !== setValue) {
            this.onChange(this.value);
          }
        };

        // 更新外层双向绑定数据
        updateValue();
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.initValue();
  },
  methods: {
    initValue() {
      const { defaultValue, inputType = '' } = this.options || {};
      const initValue = typeof defaultValue === 'undefined' ? inputDefaultValueMap[inputType] : defaultValue;
      this.value = initValue;

      if (typeof this.value === 'undefined') {
        return;
      }

      // 单选输入框初始值不在枚举列表的值置空，多选输入框不做处理
      if (inputType === 'selectInput' && !this.checkSelectInputValueValid(initValue, this.options)) {
        this.value = undefined;
      }
    },
    // 检查枚举选中值是否合法
    checkSelectValid(value, valueEnum = []) {
      return valueEnum.some(item => item.value === value);
    },
    // 检查 selectInput 选中值是否合法
    checkSelectInputValueValid(value, options = {}) {
      const { valueEnum = [], bindAttrs = {} } = options || {};
      const { multiple = false } = bindAttrs;
      // 暂时不校验多选情况下的输入值
      if (multiple) {
        return true;
      }

      return this.checkSelectValid(value, valueEnum);
    },
    // 获取绑定的标签属性
    getBindAttrs(inputType) {
      const defaultAttrsMap = getDefaultAttrsMap();
      const publicBindAttrs = this.publicBindAttrs || {};
      const defaultAttrs = defaultAttrsMap[inputType] || {};
      const { bindAttrs = {} } = this.options || {};
      return {
        ...publicBindAttrs,
        ...defaultAttrs,
        ...bindAttrs,
      };
    },
    onChange(val) {
      const { onChange } = this.options || {};
      if (typeof onChange === 'function') {
        onChange(val, this.options);
      }
      this.$emit('change', val);
    },
  }
};
</script>

<style scoped lang="less">
.input {
  width: 100%;
}

.sliderContainer {
  width: 100%;
  display: flex;

  .sliderInput {
    width: 100%;
    flex: 1;
  }

  .sliderValue {
    text-align: center;
    width: 80px;
  }
}

.radio {
  margin-bottom: 6px;
}
</style>
