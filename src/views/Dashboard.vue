<template>
  <div class="wrapper">
    <h1>Dashboard</h1>
    <line-chart :data="data"></line-chart>
    <button class="btn" @click="connectToWebsocket">
      Connect to Websocket
    </button>
    <button class="btn updatebtn" @click="updateChart">
      Update chart
    </button>
  </div>
</template>

<script>
import Vue from "vue";
import Chartkick from "vue-chartkick";
import Chart from "chart.js";
import { mapState, mapActions } from "vuex";

Vue.use(Chartkick.use(Chart));

export default {
  computed: {
    ...mapState(["machines", "chartData", "loading"]),
    ...mapActions(["getMachines"])
  },
  data() {
    return {
      connection: null,

      data: [
        {
          name: "Fridge",
          data: {
            "2019-01-01 00:00:00 -0800": 3
          }
        },
        {
          name: "Vacuum Cleaner",
          data: {
            "2019-05-01 00:00:00 -0800": 5
          }
        }
      ]
    };
  },
  methods: {
    updateChart: function() {
      // let date = Date.now();
      this.data = [
        {
          name: "Fridge",
          data: {
            date: 9
          }
        },
        {
          name: "Vacuum Cleaner",
          data: {
            date: 7
          }
        }
      ];
    },
    connectToWebsocket: function() {
      this.machines.map(machine => {
        this.connection.send(
          JSON.stringify({
            machine_id: machine.id
          })
        );
        this.connection.onmessage = function(event) {
          let chartArr = [];
          chartArr.push(event.data);
          this.chartData = chartArr;
          console.log(this.chartData);
        };
      });
    }
  },
  created() {
    this.$store.dispatch("getMachines");
    //Websocket Connection
    this.connection = new WebSocket("ws://localhost:5000/consumption/");
    this.connection.onopen = function() {
      console.log("Successfully connected to websocket");
    };
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
