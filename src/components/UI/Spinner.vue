<template>
  <div class="wrapper">
    <sync-loader></sync-loader>
  </div>
</template>

<script>
import SyncLoader from "vue-spinner/src/SyncLoader.vue";

export default {
  props: ["items", "listType"],

  data() {
    return {
      showAddItem: true
    };
  },
  components: {
    "sync-loader": SyncLoader
  }
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  display: flex;
  padding-top: 50px;
}
.v-spinner {
  margin: 0 auto;
}
</style>
