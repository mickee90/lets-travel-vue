<template>
  <div id="app">
    <app-nav></app-nav>
    <router-view />
  </div>
</template>

<script>
import Nav from "./views/layout/Nav.vue";

export default {
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