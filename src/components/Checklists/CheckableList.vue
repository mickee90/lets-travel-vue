<template>
  <div>
    <!-- <checkable-list-add-item v-if="showAddItem === true"></checkable-list-add-item> -->

    <app-checkable-list-item
      v-for="(item, index) in items"
      :item="item"
      :index="index"
      :key="index"
      @deleted="remove(index)"
    ></app-checkable-list-item>
  </div>
</template>

<script>
//import collection from "../../mixins/collections";
import CheckableListItem from "./CheckableListItem.vue";

export default {
  props: ["items"],

  data() {
    return {
      showAddItem: true
    };
  },
  components: {
    appCheckableListItem: CheckableListItem
  }
};
</script>
