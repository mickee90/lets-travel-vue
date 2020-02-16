<template>
  <div id="app">
    <app-nav></app-nav>
    <template v-if="!defaultLayout">
      <div class="some class">
        <router-view :key="$route.fullPath" />
      </div>
    </template>
    <template v-else>
      <router-view :key="$route.fullPath" />
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
  created() {
    this.$store.dispatch("tryAutoLogin");
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
