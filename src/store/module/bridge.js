export default {
  namespaced: true,
  state: {
    channelObj: null,
    register: false,
  },
  mutations: {
    setChannelObj: (state, bridge) => {
      state.channelObj = bridge;
    },
    setRegister(state, bool) {
      state.register = bool;
    },
  },
};

