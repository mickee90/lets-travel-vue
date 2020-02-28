<template>
  <div
    class="banner-image"
    style="background-image: url(./imgs/trips/soccer.jpg);background-size: cover;"
  >
    <div class="container content posts item-view">
      <div class="post-body">
        <div class="title-input col-12">{{ trip.title }} - Checklist</div>

        <div class="button-bar col-12">
          <div class="text-right">
            <button @click="addItem = true">
              <i class="fas fa-plus-circle"></i>
            </button>
          </div>
        </div>

        <div class="item-list">
          <CheckableListAddItem v-if="addItem" @hideInput="addItem = false" listType="checklist"></CheckableListAddItem>

          <CheckableListItem
            v-for="(item, index) in checklistItems"
            :item="item"
            :index="index"
            :key="index"
            listType="checklist"
          ></CheckableListItem>
        </div>
        <tab-bar></tab-bar>
      </div>
    </div>
  </div>
</template>

<script>
import CheckableListItem from "../../components/Checklists/CheckableListItem.vue";
import CheckableListAddItem from "../../components/Checklists/CheckableListAddItem.vue";

export default {
  data() {
    return {
      addItem: false,
      trip: {}
    };
  },
  computed: {
    checklistItems() {
      return this.$store.getters.getChecklistItems;
    }
  },
  created() {
    this.trip = this.$store.getters.getTrip;
    this.$store.dispatch("fetchChecklistItems", this.trip.id);
  },
  components: {
    CheckableListItem,
    CheckableListAddItem
  }
};
</script>

<style scoped></style>
