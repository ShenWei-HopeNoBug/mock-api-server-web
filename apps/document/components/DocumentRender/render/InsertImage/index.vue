<template>
  <img class="image" :src="src" alt="" :style="style" />
</template>

<script>
export default {
  name: 'Image',
  props: {
    compData: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    src() {
      const { src = '' } = this.compData || {};
      return src;
    },
    style() {
      const { style = {} } = this.compData || {};
      return style;
    },
  },
};
</script>

<style scoped lang="less">
.image {
  max-width: 100%;
  min-width: 200px;
  border-radius: 8px;
}
</style>
