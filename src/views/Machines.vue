<template>
  <div class="home">
    <h1>Makinalar</h1>
    <div v-if="loading">
      loading...
    </div>
    <div v-else>
      <ul>
        <li v-for="machine in machines" :key="machine.id">
          <h1>
            {{ machine.name }}
          </h1>
          <p>
            {{ machine.body }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Machines",
  computed: {
    ...mapState(["machines", "loading"]),
    ...mapActions(["getMachines"])
  },
  data() {
    return {
      data: []
    };
  },
  created() {
    this.$store.dispatch("getMachines");
  }
};
</script>
