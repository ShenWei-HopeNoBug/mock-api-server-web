<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import getQtBridgeData from 'src/assets/js/getQtBridgeData';

export default {
  name: 'App',
  components: {},
  created() {
    getQtBridgeData().then(result => {
      const { error, message: msg = '', channelObj = null } = result;
      // 更新是否注册标志
      const register = !error;
      if (error) {
        msg && this.$message.error(msg);
      }

      this.setChannelObj(channelObj);
      this.setRegister(register);
    });
  },
  methods: {
    ...mapMutations('bridge', ['setChannelObj', 'setRegister']),
  },
};
</script>

<style lang="less">
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  background: #B4B5B7;
  border-radius: 3px;
}
</style>

<style scoped lang="less">
.app {
  width: 100%;
  height: 100%;
  padding: 20px;
}
</style>
