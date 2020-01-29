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
          <div class="col-12 post completed">
            <div class="list-item-title col-8 pl-2 pr-0">Item title #1</div>
            <div class="list-item-check col-2 pr-0">
              <input
                type="checkbox"
                data-item_id="1"
                onclick="App.ListItems.toggleItem(this)"
                checked
              />
            </div>
            <div class="list-item-delete col-2 pr-0 pl-2">
              <button onclick="App.ListItems.destroyItem(this)" data-item_id="1">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
          <div class="col-12 post completed">
            <div class="list-item-title col-8 pl-2 pr-0">Item title #2</div>
            <div class="list-item-check col-2 pr-0">
              <input
                type="checkbox"
                data-item_id="2"
                onclick="App.ListItems.toggleItem(this)"
                checked
              />
            </div>
            <div class="list-item-delete col-2 pr-0 pl-2">
              <button onclick="App.ListItems.destroyItem(this)" data-item_id="2">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
          <div class="col-12 post">
            <div class="list-item-title col-8 pl-2 pr-0">Item title #4</div>
            <div class="list-item-check col-2 pr-0">
              <input type="checkbox" data-item_id="3" onclick="App.ListItems.toggleItem(this)" />
            </div>
            <div class="list-item-delete col-2 pr-0 pl-2">
              <button onclick="App.ListItems.destroyItem(this)" data-item_id="3">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
          <div class="col-12 post">
            <div class="list-item-title col-8 pl-2 pr-0">Item title #4</div>
            <div class="list-item-check col-2 pr-0">
              <input type="checkbox" data-item_id="4" onclick="App.ListItems.toggleItem(this)" />
            </div>
            <div class="list-item-delete col-2 pr-0 pl-2">
              <button onclick="App.ListItems.destroyItem(this)" data-item_id="4">
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

export default {
  components: {
    appTabBar: TabBar
  }
};
</script>

<style scoped>
</style>