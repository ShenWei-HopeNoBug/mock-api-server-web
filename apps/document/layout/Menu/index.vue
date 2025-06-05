<template>
  <el-menu mode="vertical" :default-active="defaultActiveMenuOption?.key" @select="onSelect">
    <template v-for="item in menuList">
      <el-submenu v-if="item.children?.length > 0" :index="item.key">
        <template #title>
          <MenuItem :options="item" />
        </template>
        <el-menu-item v-for="subItem in item.children" :index="subItem.key">
          <MenuItem :options="subItem" />
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else :index="item.key">
        <MenuItem :options="item" />
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import MenuItem from './MenuItem.vue';
import { menuList, defaultActiveMenuOption } from './config';
import { searchMenuOptions } from 'apps/document/layout/Menu/tools';

export default {
  name: 'Menu',
  components: { MenuItem },
  data() {
    return {
      menuList,
      defaultActiveMenuOption,
    };
  },
  methods: {
    onSelect(key) {
      const menu = searchMenuOptions(key, menuList);
      const { path = '' } = menu || {};
      console.log(menu, path);
      if (!path) {
        return;
      }

      this.$router.push({ path });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.onSelect(defaultActiveMenuOption?.key);
    });
  },
};
</script>
