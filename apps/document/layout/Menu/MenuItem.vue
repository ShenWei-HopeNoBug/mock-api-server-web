<template>
  <div class="menu-item">
    <i v-if="options?.icon" :class="options.icon" />
    <span slot="title">{{ options?.title }}</span>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style scoped lang="less">
.menu-item {
  display: flex;
  width: 100%;
  align-items: center;
  user-select: none;
}
</style>
