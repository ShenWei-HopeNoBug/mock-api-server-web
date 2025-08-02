import Vue from 'vue';
import Vuex from 'vuex';
import bridge from 'src/store/module/bridge';

Vue.use(Vuex);

const storeConfig = {
  modules: {
    bridge,
  },
};

const store = new Vuex.Store(storeConfig);

export default store;
