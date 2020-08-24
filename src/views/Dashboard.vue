<template>
  <div class="wrapper">
    <h1>Dashboard</h1>
    <line-chart :data="data" width="800px"></line-chart>
    <button class="btn" @click="getConsumption(1)">
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
Chartkick.configure({ language: "tr" });

export default {
  computed: {
    ...mapState(["machines", "chartData", "loading", "connectToWebSocket"]),
    ...mapActions(["getMachines"])
  },
  data() {
    // let date = Date.now().toLocaleString();
    return {
      connection: null,

      data: [
        {
          name: "Fridge",
          id: 1,
          data: {
            1: 100,
            2: 220,
            3: 280
          }
        },
        {
          name: "AC",
          id: 2,
          data: {
            1: 140,
            2: 170,
            3: 20
          }
        },
        {
          name: "TV",
          id: 3,
          data: {
            1: 180,
            2: 120,
            3: 400
          }
        },
        {
          name: "Vacuum Cleaner",
          id: 4,
          data: {
            1: 190,
            2: 80,
            3: 30
          }
        },
        {
          name: "Dish Washer",
          id: 5,
          data: {
            1: 145,
            2: 100,
            3: 580
          }
        }
      ]
    };
  },

  methods: {
    updateChart: function() {
      // let date = Date.now().toLocaleString();
      this.data = [
        {
          name: "Fridge",
          id: 1,
          data: {
            1: 100,
            2: 220,
            3: 280,
            4: 100
          }
        },
        {
          name: "AC",
          id: 2,
          data: {
            1: 140,
            2: 170,
            3: 20,
            4: 210
          }
        },
        {
          name: "TV",
          id: 3,
          data: {
            1: 180,
            2: 120,
            3: 400,
            4: 340
          }
        },
        {
          name: "Vacuum Cleaner",
          id: 4,
          data: {
            1: 190,
            2: 80,
            3: 30,
            4: 49
          }
        },
        {
          name: "Dish Washer",
          id: 5,
          data: {
            1: 145,
            2: 100,
            3: 580,
            4: 240
          }
        }
      ];
    },

    // connectToWebsocket() {
    //   this.connection.send(
    //     JSON.stringify({
    //       machine_id: 1
    //     })
    //   );
    //   this.connection.onmessage = function(event) {
    //     let chartArr = [];
    //     let consumption = JSON.parse(event.data);
    //     chartArr.push(consumption);
    //     console.log(consumption.usage);
    //   };
    // },
    getConsumption(id) {
      let consumption;
      let arr = [];
      this.connection.send(
        JSON.stringify({
          machine_id: id
        })
      );
      this.connection.onmessage = function(event) {
        consumption = JSON.parse(event.data);
        arr.push(consumption.usage);
        console.log("Dizi :" + arr);
      };
    }
  },
  created() {
    this.$store.dispatch("getMachines");
    this.connection = new WebSocket("ws://localhost:5000/consumption/");
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
