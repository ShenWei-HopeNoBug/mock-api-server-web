import QtBridge from 'src/assets/js/QtBridge';

export default {
  namespaced: true,
  state: {
    bridge: new QtBridge(),
    register: false,
  },
  mutations: {
    setBridge: (state, bridge) => {
      state.bridge = bridge;
    },
    setRegister(state, bool) {
      state.register = bool;
    },
  },
};

