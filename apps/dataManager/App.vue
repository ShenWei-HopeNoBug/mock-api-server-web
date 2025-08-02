<template>
  <div class="app">
    <outputManager />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import outputManager from './views/outputManager/index.vue';

export default {
  name: 'App',
  components: { outputManager },
  computed: {
    ...mapState('bridge', ['bridge']),
  },
  created() {
    this.bridge.init().then((result) => {
      const { register = false } = result;
      this.setRegister(register);
    });
  },
  methods: {
    ...mapMutations('bridge', ['setRegister']),
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
