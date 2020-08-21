<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState(["userName"]),
    ...mapGetters(["selamlama"])
  },
  data() {
    return { name: "Salih" };
  },
  methods: {
    ...mapActions(["updateName"]),
    updateUserName() {
      this.updateName(this.name);
    }
  }
};
</script>
<template>
  <div class="wrapper">
    <h2>{{ selamlama }}</h2>
    <input class="input" type="text" v-model="name" />
    <button class="btn" @click="updateUserName">Update</button>
  </div>
</template>

<style lang="scss">
.wrapper {
  .input {
    width: 200px;
    height: 30px;
    margin-right: 20px;
  }
  .btn {
    width: 100px;
    height: 36px;
  }
}
</style>
