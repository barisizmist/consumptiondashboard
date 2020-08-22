import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Machines from "../views/Machines.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/machines",
    name: "Machines",
    component: Machines
  }
];

const router = new VueRouter({
  routes
});

export default router;
