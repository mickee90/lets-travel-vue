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
            <button @click="addItem = true">
              <i class="fas fa-plus-circle"></i>
            </button>
          </div>
        </div>

        <div class="item-list">
          <app-checkable-list-add-item
            v-if="addItem"
            @hideInput="addItem = false"
            listType="bucketList"
          ></app-checkable-list-add-item>
          <app-checkable-list
            :items="bucketListItems"
            listType="bucketList"
          ></app-checkable-list>
        </div>
        <tab-bar></tab-bar>
      </div>
    </div>
  </div>
</template>

<script>
import { bucketListItems } from "../../mock-data/bucket-list-items";
import CheckableList from "../../components/Checklists/CheckableList.vue";
import CheckableListAddItem from "../../components/Checklists/CheckableListAddItem.vue";

export default {
  data() {
    return {
      addItem: false
    };
  },
  computed: {
    bucketListItems() {
      return this.$store.getters.getBucketListItems;
    }
  },
  beforeCreate() {
    this.$store.dispatch("storeBucketListItems", bucketListItems);
  },
  components: {
    appCheckableList: CheckableList,
    appCheckableListAddItem: CheckableListAddItem
  }
};
</script>

<style scoped></style>
