<template>
  <div class="col-12 post" style="padding:0;">
    <div class="list-item-title col-8 pl-2 pr-0">
      <input
        name="list_item"
        v-model="itemTitle"
        placeholder="What are you gonna do?"
        class="form-control item-input"
        required
        autofocus
      />
    </div>
    <div class="list-item-check col-2 pr-0 pl-0" style="font-size: 1.5rem;">
      <button @click="onSave">
        <i class="fas fa-check"></i>
      </button>
    </div>
    <div class="list-item-delete col-2 pr-0 pl-0">
      <button @click="cancel">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { capitalizeFirstLetter } from "../../helpers.js";

export default {
  props: ["listType"],
  data() {
    return {
      itemTitle: ""
    };
  },
  methods: {
    onSave() {
      const listItem = this.itemTitle.trim();

      if (listItem === "") {
        alert("The input cannot be empty");
        return;
      }

      const titleListType = capitalizeFirstLetter(this.listType);

      this.$store.dispatch(
        `${this.listType}/create${titleListType}Items`,
        listItem
      );
      this.itemTitle = "";
      this.$emit("hideInput");
    },
    cancel() {
      this.itemTitle = "";
      this.$emit("hideInput");
    }
  }
};
</script>
