<template>
  <div
    class="banner-image"
    style="background-image: url(./imgs/trips/soccer.jpg);background-size: cover;"
  >
    <div class="container content posts item-view">
      <div class="post-body">
        <div class="title-input col-12">Bucket list</div>

        <div class="button-bar col-12">
          <div class="text-right">
            <button onclick="App.ListItems.createItem()">
              <i class="fas fa-plus-circle"></i>
            </button>
          </div>
        </div>

        <div class="item-list">
          <div
            class="col-12 post"
            :class="{'completed': item.completed}"
            v-for="item in items"
            :key="item.id"
          >
            <div class="list-item-title col-8 pl-2 pr-0">{{ item.title }}</div>
            <div class="list-item-check col-2 pr-0">
              <input
                type="checkbox"
                :data-item_id="item.id"
                onclick="App.ListItems.toggleItem(this)"
                :checked="item.completed"
              />
            </div>
            <div class="list-item-delete col-2 pr-0 pl-2">
              <button onclick="App.ListItems.destroyItem(this)" :data-item_id="item.id">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
        <app-tab-bar></app-tab-bar>
      </div>
    </div>
  </div>
</template>

<script>
import TabBar from "../layout/TabBar.vue";
import { bucketListItems } from "../../mock-data/bucket-list-items";

export default {
  data() {
    return {
      items: []
    };
  },
  created() {
    this.items = bucketListItems;
  },
  components: {
    appTabBar: TabBar
  }
};
</script>

<style scoped>
</style>