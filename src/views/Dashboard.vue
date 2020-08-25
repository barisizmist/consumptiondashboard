<template>
  <div class="wrapper">
    <h1>Dashboard</h1>
    <line-chart :data="machines" width="800px"></line-chart>
    <button class="btn" @click="getConsumptions()">Get Comsumption</button>

    <button class="btn updatebtn" @click="updateChart">Update chart</button>
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
    // let date = Date.now().toLocaleString();
    return {
      connection: null,
      time: 0,
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
      data: this.machines,
      data2: [
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
        }
      ],
      consumptions: null
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
        }
      ];
    },
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
          console.log(cons);
          this.$store.dispatch("addUsageAction", {
            id: cons.id,
            usage: cons.usage
          });
        };
      });
    },
    changeUsage() {
      return {
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
          }
        ]
      };
    }
  },
  created() {
    this.$store.dispatch("getMachines");
    this.connection = new WebSocket("ws://localhost:5000/consumption/");
  },
  start() {
    setInterval(() => {
      this.time++;
    }, 1000);
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
