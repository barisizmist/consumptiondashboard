<template>
  <div class="wrapper">
    <h1>Anlık Elektrik Tüketim Panosu</h1>
    <line-chart :data="chartData" width="1000px" height="400px"></line-chart>
  </div>
</template>

<script>
import Vue from "vue";
import Chartkick from "vue-chartkick";
import Chart from "chart.js";
import { mapState, mapActions } from "vuex";

Vue.use(Chartkick.use(Chart));
Chartkick.configure({ language: "tr" });

export default {
  computed: {
    ...mapState(["machines", "chartData", "loading"]),
    ...mapActions(["getMachines", "addUsageAction"])
  },
  data() {
    return {
      connection: null,
      time: 0,
      data: this.machines

      // data: Object.keys(this.chartData).map(key => {
      //   const cd = this.chartData[key];
      //   return {
      //     id: cd.id,
      //     data: cd.usage.reduce((acc, item) => {
      //       acc[item.ts] = item.value;
      //       return acc;
      //     }, {})
      //   };
      // }),
    };
  },

  methods: {
    getConsumptions() {
      let cons;
      this.machines.forEach(mac => {
        this.connection.send(
          JSON.stringify({
            machine_id: mac.id
          })
        );

        this.connection.onmessage = event => {
          cons = JSON.parse(event.data);
          // console.log(cons);
          this.$store.dispatch("addUsageAction", {
            id: cons.id,
            usage: cons.usage
          });
        };
      });
    }
  },
  created() {
    this.$store.dispatch("getMachines");
    this.connection = new WebSocket("ws://localhost:5000/consumption/");
    setTimeout(() => {
      this.getConsumptions();
    }, 500);
  }
};
</script>

<style lang="scss">
.wrapper {
  .input {
    width: 200px;
    height: 30px;
    margin-right: 20px;
  }
  .btn {
    height: 36px;
    margin-top: 20px;
    background-color: #f2f2f2;
    &.updatebtn {
      display: block;
    }
  }
}
</style>
