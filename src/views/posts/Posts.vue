<template>
  <div
    class="banner-image"
    style="background-image: url(./imgs/trips/soccer.jpg);background-size: cover;"
  >
    <div class="container content posts">
      <div class="post-body">
        <div class="title-input col-12">Trip #1</div>

        <div class="button-bar col-12">
          <div class="text-right">
            <a href="#">Add new post</a>
          </div>
        </div>

        <a href="#">
          <div class="col-12 post budget-item">
            <div class="col-12 pl-2 pr-0 row">
              <div class="budget-item-title col-12">Post title #1</div>
              <div class="budget-item-date col-12">2020-01-01</div>
            </div>
          </div>
        </a>

        <a href="#">
          <div class="col-12 post budget-item">
            <div class="col-12 pl-2 pr-0 row">
              <div class="budget-item-title col-12">Post title #2</div>
              <div class="budget-item-date col-12">2020-01-02</div>
            </div>
          </div>
        </a>

        <a href="#">
          <div class="col-12 post budget-item">
            <div class="col-12 pl-2 pr-0 row">
              <div class="budget-item-title col-12">Post title #3</div>
              <div class="budget-item-date col-12">2020-01-03</div>
            </div>
          </div>
        </a>

        <app-tab-bar></app-tab-bar>
      </div>
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