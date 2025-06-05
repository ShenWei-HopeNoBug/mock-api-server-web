<template>
  <el-container class="layout">
    <el-aside width="200px">
      <Menu class="menu" />
    </el-aside>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import Menu from './Menu/index.vue';

export default {
  name: 'Layout',
  components: { Menu },
  data() {
    return {};
  },
};
</script>

<style scoped lang="less">
.layout {
  width: 100%;
  height: 100%;
}

.menu {
  height: 100%;
}
</style>
