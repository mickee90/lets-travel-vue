<template>
  <div
    class="col-12 post"
    :class="{ completed: item.completed }"
    :key="item.id"
  >
    <div class="list-item-title col-8 pl-2 pr-0" v-text="item.title"></div>
    <div class="list-item-check col-2 pr-0">
      <input type="checkbox" v-model="item.completed" @change="onChange" />
    </div>
    <input type="hidden" :value="item.id" />
    <div class="list-item-delete col-2 pr-0 pl-2">
      <button @click="onDelete">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { capitalizeFirstLetter } from "../../helpers.js";

export default {
  props: ["item", "listType"],
  computed: {
    getListTypeString() {
      return capitalizeFirstLetter(this.listType);
    },
    getGetterString() {
      return `${this.listType}/get${this.getListTypeString}Items`;
    },
    getStoreString() {
      return `${this.listType}/store${this.getListTypeString}Items`;
    },
    getDeleteString() {
      return `${this.listType}/delete${this.getListTypeString}Item`;
    },
    geteditString() {
      return `${this.listType}/edit${this.getListTypeString}Item`;
    }
  },
  methods: {
    onDelete(id) {
      this.$store.dispatch(this.getDeleteString, this.item.id);
    },
    onChange() {
      this.$store.dispatch(this.geteditString, this.item);
    }
  }
};
</script>
