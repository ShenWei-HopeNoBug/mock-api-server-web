<template>
  <el-menu mode="vertical" :default-active="active" @select="onSelect">
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

const defaultActive = defaultActiveMenuOption?.key || '/';

export default {
  name: 'Menu',
  components: { MenuItem },
  data() {
    return {
      menuList,
      defaultActiveMenuOption,
      active: defaultActive,
    };
  },
  methods: {
    onSelect(key) {
      const menu = searchMenuOptions(key, menuList);
      const { path = '' } = menu || {};
      this.active = key;
      if (!path || path === this.$route.path) {
        return;
      }

      this.$router.push(path);
    },
  },
  mounted() {
    this.$nextTick(() => {
      const { hash = '' } = window.location;
      let path = hash.split('?')[0];
      path = path.replace('#', '');
      this.onSelect(path || defaultActive);
    });
  },
};
</script>
