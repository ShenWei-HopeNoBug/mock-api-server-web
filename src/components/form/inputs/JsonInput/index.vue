<template>
  <span class="jsonInput">
    <div class="header">
      <el-button
        v-bind="getBindAttrs('formatCodeButton', formatCodeButtonOptions.bindAttrs)"
        @click="formatCode"
      >
      {{ getButtonText(formatCodeButtonOptions, '格式化') }}
    </el-button>
    <el-button
      v-if="copy"
      v-bind="getBindAttrs('copyButtonOptions', copyButtonOptions.bindAttrs)"
      @click="onCopy"
    >
      {{ getButtonText(copyButtonOptions, '复制') }}
    </el-button>
    </div>
    <div class="codeEditorContainer" :style="codeEditorContainerStyle">
      <b-code-editor
        v-model="value"
        ref="codeEditor"
        v-bind="getBindAttrs('codeEditor', codeEditorBindAttrs)"
        @on-change="onChange"
      />
    </div>
  </span>
</template>

<script>
import { isObject } from 'lodash';
import { defaultAttrsMap, defaultCodeEditorStyle } from './config';
import { copy, isJsonString } from 'src/assets/js/utils';

export default {
  name: 'JsonInput',
  model: {
    prop: 'inputValue',
    event: 'change',
  },
  props: {
    inputValue: {},
    codeEditorBindAttrs: {
      type: Object,
      default: () => ({}),
    },
    formatCodeButtonOptions: {
      type: Object,
      default: () => ({}),
    },
    copyButtonOptions: {
      type: Object,
      default: () => ({}),
    },
    codeEditorStyle: {
      type: Object,
      default: () => ({}),
    },
    defaultCopyContent: {
      type: String,
      default: '',
    },
    copy: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value: '{}',
      codeEditorContainerStyle: {},
    };
  },
  watch: {
    inputValue: {
      handler(val) {
        if (typeof val !== 'string') {
          this.onChange(this.value);
          return;
        }

        this.value = val;
      },
      deep: true,
      immediate: true,
    },
    codeEditorStyle: {
      handler(obj) {
        if (!isObject(obj)) {
          return;
        }

        this.codeEditorContainerStyle = {
          ...defaultCodeEditorStyle,
          ...obj,
        };
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // 获取绑定的标签属性
    getBindAttrs(type, bindAttrs = {}) {
      const defaultAttrs = defaultAttrsMap[type] || {};
      const elemAttrs = bindAttrs || {};
      return {
        ...defaultAttrs,
        ...elemAttrs,
      };
    },
    // 获取按钮文本
    getButtonText(buttonOptions = {}, defaultText = '按钮') {
      const { text = '' } = buttonOptions || {};
      return text || defaultText;
    },
    // 手动格式化
    formatCode() {
      this.$refs.codeEditor && this.$refs.codeEditor.formatCode();
    },
    // 手动获取值
    getValue() {
      this.$refs.codeEditor && this.$refs.codeEditor.getValue();
    },
    // 手动刷新
    refresh() {
      this.$refs.codeEditor && this.$refs.codeEditor.refresh();
    },
    // 是否合法
    validate() {
      return isJsonString(this.value);
    },
    onCopy() {
      const content = isJsonString(this.value) ?
        JSON.stringify(JSON.parse(this.value)) : this.defaultCopyContent;
      copy(content);
      this.$message.success('复制成功');
    },
    onChange(val) {
      this.$emit('change', val);
    },
  },
};
</script>

<style lang="less">
.jsonInput {
  /* 插件样式有点问题，设置代码编辑器的高度，内容区域不会自适应变化，这里手动处理下 */

  .CodeMirror {
    height: 100%;
  }
}
</style>

<style scoped lang="less">
.jsonInput {
  width: 100%;
}

.header {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}

.codeEditorContainer {
  width: 100%;
}
</style>
