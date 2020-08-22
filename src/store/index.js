import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
const state = {
  message: "Hello",
  userName: "Barış",
  machines: [],
  loading: true
};
const getters = {};
const mutations = {
  loadData(state, machines) {
    state.machines = machines;
  },
  changeLoadingState(state, loading) {
    state.loading = loading;
  }
};
const URL = "https://jsonplaceholder.typicode.com/posts";
const actions = {
  getMachines({ commit }) {
    axios.get(URL).then(response => {
      commit("loadData", response.data);
      commit("changeLoadingState", false);
    });
  }
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

export default store;
