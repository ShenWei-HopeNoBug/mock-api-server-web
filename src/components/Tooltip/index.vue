<template>
  <span>
    <el-tooltip v-if="visible" v-bind="getBindAttrs('tooltip', tooltipBindAttrs)">
      <div slot="content" :style="contentStyle">
        <span v-html="content" />
        <slot name="content"></slot>
      </div>
      <slot name="triggerContent">
        <i class="el-icon-question move-right"></i>
      </slot>
    </el-tooltip>
    <slot v-if="!visible && reserveTriggerContent && !slotContent " name="triggerContent">
      <i class="el-icon-question move-right"></i>
    </slot>
  </span>
</template>

<script>
const bindAttrsMap = {
  tooltip: {
    effect: 'light',
    placement: 'top',
  },
};

const defaultTooltipContentStyle = {
  maxWidth: '400px',
  wordBreak: 'break-word',
};

export default {
  name: 'Tooltip',
  props: {
    content: {
      default: ''
    },
    // 是否使用插槽自定义tip内容
    slotContent: {
      type: Boolean,
      default: false,
    },
    tooltipBindAttrs: {
      type: Object,
      default: () => ({}),
    },
    // tooltip 内容的样式
    tooltipContentStyle: {
      type: Object,
      default: () => ({}),
    },
    // 没有tooltip内容时是否保留触发content
    reserveTriggerContent: {
      type: Boolean,
      default: false,
    }
  },
  data () {
    return {
      contentStyle: {},
    };
  },
  computed: {
    visible () {
      const checkSet = new Set([undefined, null, '']);
      return this.slotContent || !checkSet.has(this.content);
    },
  },
  watch:{
    tooltipContentStyle: {
      handler(obj) {
        this.contentStyle = {
          ...defaultTooltipContentStyle,
          ...obj,
        };
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    getBindAttrs (type, bindAttrs = {}) {
      const attrs = bindAttrs || {};
      const defaultAttrs = bindAttrsMap[type] || {};
      return {
        ...defaultAttrs,
        ...attrs,
      };
    },
  },
};
</script>
