import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
const state = {
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
// const URL = "https://jsonplaceholder.typicode.com/posts";
// const URL = "http://localhost:5000/machines";
const actions = {
  getMachines({ commit }) {
    axios.get("/machines").then(res => {
      console.log(res);
      commit("loadData", res.data);
      commit("changeLoadingState", false);
    });
    // .then(res => {
    //   console.log(res);
    //   commit("loadData", res);
    // });
    // function jsonpCallback(data) {
    //   alert(data.message); // Response data from the server
    // }
    // axios({ url: URL, adapter: jsonpAdapter })
    //   .then(result => {
    //     console.log("dfsfd");
    //     console.log("Status Code: " + result.status);
    //     commit("loadData", result);
    //     commit("changeLoadingState", false);
    //   })
    //   .catch(error => console.log("Request failed", error));
    // .then(response => {
    //   console.log("OK");
    //   console.log(response);
    //   commit("loadData", response);
    //   commit("changeLoadingState", false);
    // });
  }
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

export default store;
