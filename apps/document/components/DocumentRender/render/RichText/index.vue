<template>
  <div class="rich-text" v-html="content" :style="richTextStyle" />
</template>

<script>
export default {
  name: 'RichText',
  props: {
    compData: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    content() {
      const { content = '' } = this.compData || {};
      return content;
    },
    // 段落首行是否缩进
    textIndent() {
      const { textIndent = true } = this.compData || {};
      return textIndent;
    },
    richTextStyle() {
      return this.textIndent ? { textIndent: '28px' } : {};
    },
  },
};
</script>

<style scoped lang="less">
.rich-text {
  font-size: 14px;
}
</style>
