import { createStore } from "vuex";

export default createStore({
  state: {
    username: "",
    token: "",
  },
  mutations: {
    setUser(state, username) {
      state.username = username;
    },
    setToken(state, token) {
      state.token = token;
    }
  },
  actions: {},
  modules: {},
});
