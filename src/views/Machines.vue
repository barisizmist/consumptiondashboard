<template>
  <div class="home">
    <h1>Makinalar</h1>
    <div v-if="loading">
      loading...
    </div>
    <div v-else>
      <table>
        <thead>
          <th>Id</th>
          <th>Model</th>
          <th>İsim</th>
          <th>Üretici</th>
          <th>Seri No</th>
        </thead>
        <tbody>
          <tr v-for="machine in machines" :key="machine.id">
            <td>{{ machine.id }}</td>
            <td>{{ machine.model }}</td>
            <td>{{ machine.name }}</td>
            <td>{{ machine.producer }}</td>
            <td>{{ machine.serial }}</td>
          </tr>
        </tbody>
      </table>
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
