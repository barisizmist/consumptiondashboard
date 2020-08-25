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
  },
  addUsage(state, { id, usage }) {
    const data = Array.from(state.machines || []);
    const mac = data.find(d => d.id === id);
    if (mac && mac.data) mac.data[new Date()] = usage;
    else mac.data = { [new Date()]: usage };
    state.chartData = data;
  }
};

const actions = {
  async getMachines({ commit }) {
    await axios.get("/machines").then(res => {
      commit("loadData", res.data);
      commit("changeLoadingState", false);
    });
  },
  addUsageAction({ commit }, { id, usage }) {
    commit("addUsage", { id, usage });
  }
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

export default store;
