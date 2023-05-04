import { number } from "echarts";
import { createStore } from "vuex";

export default createStore({
  state: {
    username: "",
    token: "",
    shopLists: Array<any>()
  },
  mutations: {
    setUser(state, username) {
      state.username = username;
    },
    setToken(state, token) {
      state.token = token;
    },
    addToLists(state, book: any) {
      state.shopLists.push(book);
    },
    clearLists(state) {
      state.shopLists = [];
    }
  },
  getters: {
  },
  actions: {

  },
  modules: {},
});
