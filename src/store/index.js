import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
const state = {
  machines: [],
  chartData: [],
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

const actions = {
  async getMachines({ commit }) {
    await axios.get("/machines").then(res => {
      commit("loadData", res.data);
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
