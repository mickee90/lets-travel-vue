<template>
  <div
    class="banner-image"
    style="background-image: url(./imgs/trips/soccer.jpg);background-size: cover;"
  >
    <div class="container content posts item-view">
      <div class="post-body">
        <div class="title-input col-12">Checklist</div>

        <div class="button-bar col-12">
          <div class="text-right">
            <button onclick="App.ListItems.createItem()">
              <i class="fas fa-plus-circle"></i>
            </button>
          </div>
        </div>

        <div class="item-list">
          <app-checkable-list :items="checklistItems"></app-checkable-list>
        </div>
        <app-tab-bar></app-tab-bar>
      </div>
    </div>
  </div>
</template>


<script>
import TabBar from "../layout/TabBar.vue";
import { checklistItems } from "../../mock-data/checklist-items";

export default {
  data() {
    return {
      checklistItems: []
    };
  },
  created() {
    this.checklistItems = checklistItems;
  },
  components: {
    appTabBar: TabBar
  }
};
</script>

<style scoped>
</style>