<template>
  <div v-if="loading">
    loading
  </div>
  <div v-else>
    <h2>Makinalar</h2>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="left-center">Id</th>
            <th class="left-center">Model</th>
            <th class="left-center">İsim</th>
            <th class="left-center">Üretici</th>
            <th class="left-center">Seri No</th>
          </tr>
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
      </template>
    </v-simple-table>
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
