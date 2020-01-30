<template>
  <div>
    <checkable-list-add-item
      v-if="showAddItem === true"
      @addNewItem="showAddItem = true"
      @itemAdded="showAddItem = false"
      @added="addToBeginning"
    ></checkable-list-add-item>

    <checkable-list-item
      v-for="(item, index) in items"
      :item="item"
      :index="index"
      :key="index"
      @deleted="remove(index)"
    ></checkable-list-item>
  </div>
</template>

<script>
import collection from "../../mixins/collections";

export default {
  props: ["items"],

  data() {
    return {
      showAddItem: true
    };
  }
};
</script>
