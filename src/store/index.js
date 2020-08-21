import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  message: "Hello",
  userName: "Barış"
};
const getters = {
  selamlama(state) {
    return `${state.message} ${state.userName}`;
  }
};
const mutations = {
  setName(state, name) {
    state.userName = name;
  }
};
const actions = {
  updateName({ commit }, name) {
    commit("setName", name);
  }
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
export default store;
