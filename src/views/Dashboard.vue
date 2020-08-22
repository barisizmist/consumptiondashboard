<template>
  <div class="wrapper">
    <h1>Dashboard</h1>
    <button class="btn" @click="connectToWebsocket">
      Connect to Websocket
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["machines"])
  },
  data() {
    return { connection: null };
  },
  methods: {
    connectToWebsocket: function() {
      for (let index = 0; index < 6; index++) {
        this.connection.send(
          JSON.stringify({
            machine_id: index
          })
        );
      }
    }
  },
  created() {
    //Websocket Connection
    this.connection = new WebSocket("ws://localhost:5000/consumption/");
    this.connection.onopen = function(event) {
      console.log(event);
      console.log("Successfully connected to websocket");
    };

    this.connection.onmessage = function(event) {
      console.log(Object.values(JSON.parse(event.data))[1]);
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
  }
}
</style>
