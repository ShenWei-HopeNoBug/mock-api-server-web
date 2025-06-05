<template>
  <div class="app">
    <Layout />
  </div>
</template>

<script>
import Layout from 'apps/document/layout/index.vue';

export default {
  name: 'App',
  components: { Layout },
};
</script>

<style lang="less">
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  background: #b4b5b7;
  border-radius: 3px;
}
</style>

<style scoped lang="less">
.app {
  width: 100%;
  height: 100%;
}
</style>
