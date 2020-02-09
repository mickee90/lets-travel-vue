<template>
  <div
    class="banner-image"
    style="background-image: url(./imgs/trips/soccer.jpg);background-size: cover;"
  >
    <div class="container content">
      <div class="row justify-content-center vh-100">
        <div class="col-md-8 vh-100">
          <div class="card vh-100">
            <div class="title-input">Trips #1</div>

            <div class="button-bar">
              <div class="text-right">
                <router-link
                  :to="{name: 'trip-edit', params: {'tripId': this.$store.getters.getTrip.id}}"
                >Edit</router-link>
              </div>
            </div>

            <div class="card-body">
              <div class="date_box">Start date: 2020-03-01 to 2020-05-01</div>

              <div class="desc_box">Some description</div>
            </div>
          </div>
        </div>
      </div>
      <app-tab-bar></app-tab-bar>
    </div>
  </div>
</template>

<script>
import TabBar from "../layout/TabBar.vue";

export default {
  components: {
    appTabBar: TabBar
  }
};
</script>

<style scoped>
</style>
