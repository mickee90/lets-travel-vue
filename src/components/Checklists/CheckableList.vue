<template>
  <div>
    <app-checkable-list-item
      v-for="(item, index) in items"
      :item="item"
      :index="index"
      :key="index"
      :listType="listType"
    ></app-checkable-list-item>
  </div>
</template>

<script>
import CheckableListItem from "./CheckableListItem.vue";

export default {
  props: ["items", "listType"],

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
