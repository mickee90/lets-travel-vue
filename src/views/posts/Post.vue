<template>
  <div
    class="banner-image"
    style="background-image: url(./imgs/trips/soccer.jpg);background-size: cover;"
  >
    <div class="container content posts">
      <div class="row justify-content-center vh-100">
        <div class="col-md-8 vh-100">
          <div class="card vh-100">
            <div class="title-input">Trip #1</div>

            <div class="button-bar">
              <div class="text-right">
                <a href="#">Edit</a>
              </div>
            </div>

            <div class="post-body">
              <div class="post-title">Post title #1</div>
              <div class="date_box">2020-03-01 to 2020-03-02</div>
              <div class="map_marker">
                lat: 20.101221
                lng: -17.2912
              </div>

              <div class="desc_box">Some post content</div>
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