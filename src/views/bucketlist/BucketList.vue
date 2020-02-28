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
          <CheckableListAddItem v-if="addItem" @hideInput="addItem = false" listType="bucketlist"></CheckableListAddItem>

          <CheckableListItem
            v-for="(item, index) in bucketlistItems"
            :item="item"
            :index="index"
            :key="index"
            listType="bucketlist"
          ></CheckableListItem>
        </div>

        <tab-bar></tab-bar>
      </div>
    </div>
  </div>
</template>

<script>
import CheckableListItem from "../../components/Checklists/CheckableListItem";
import CheckableListAddItem from "../../components/Checklists/CheckableListAddItem.vue";

export default {
  data() {
    return {
      addItem: false,
      trip: {}
    };
  },
  computed: {
    bucketlistItems() {
      return this.$store.getters.getBucketlistItems;
    }
  },
  created() {
    this.trip = this.$store.getters.getTrip;
    this.$store.dispatch("fetchBucketlistItems", this.trip.id);
  },
  components: {
    CheckableListItem,
    CheckableListAddItem
  }
};
</script>

<style scoped></style>
