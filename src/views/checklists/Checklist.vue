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
            <button @click="addItem = true">
              <i class="fas fa-plus-circle"></i>
            </button>
          </div>
        </div>

        <div class="item-list">
          <app-checkable-list-add-item
            v-if="addItem"
            @hideInput="addItem = false"
            listType="checklist"
          ></app-checkable-list-add-item>
          <app-checkable-list :items="checklistItems" listType="checklist"></app-checkable-list>
        </div>
        <app-tab-bar></app-tab-bar>
      </div>
    </div>
  </div>
</template>


<script>
import TabBar from "../layout/TabBar.vue";
import { checklistItems } from "../../mock-data/checklist-items";
import CheckableList from "../../components/Checklists/CheckableList.vue";
import CheckableListAddItem from "../../components/Checklists/CheckableListAddItem.vue";

export default {
  data() {
    return {
      addItem: false
    };
  },
  computed: {
    checklistItems() {
      return this.$store.getters.getChecklistItems;
    }
  },
  beforeCreate() {
    this.$store.dispatch("storeChecklistItems", checklistItems);
  },
  components: {
    appTabBar: TabBar,
    appCheckableList: CheckableList,
    appCheckableListAddItem: CheckableListAddItem
  }
};
</script>

<style scoped>
</style>