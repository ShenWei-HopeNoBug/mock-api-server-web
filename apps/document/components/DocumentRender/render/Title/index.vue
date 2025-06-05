<template>
  <component :is="type" class="title">{{ content }}</component>
</template>

<script>
// 标题用的标签类型计划
const typeSet = new Set(['h1', 'h2', 'h3', 'h4', 'h5']);

export default {
  name: 'Title',
  props: {
    compData: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    // 标题用的标签类型
    type() {
      const { type } = this.compData || {};
      return typeSet.has(type) ? type : 'h1';
    },
    content() {
      const { content = '' } = this.compData || {};
      return content;
    },
  },
};
</script>

<style scoped lang="less">
.title {
  margin-bottom: 14px;
}
</style>
