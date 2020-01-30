<template>
  <div id="app">
    <app-nav></app-nav>
    <template v-if="!defaultLayout">
      <div class="some class">
        <router-view />
      </div>
    </template>
    <template v-else>
      <router-view />
    </template>
  </div>
</template>

<script>
import Nav from "./views/layout/Nav.vue";

export default {
  data() {
    return {
      defaultLayout: false
    };
  },
  beforeMount() {
    // Might use later
    this.defaultLayout = this.$router.history.current.meta.defaultLayout;
  },
  components: {
    appNav: Nav
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Nunito");
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/global.scss";
</style>