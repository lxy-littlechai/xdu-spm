import { createStore } from "vuex";

export default createStore({
  state: {
    username: "",
  },
  mutations: {
    setUser(state, username) {
      state.username = username;
    }
  },
  actions: {},
  modules: {},
});
