<template>
  <div class="col-12 post" :class="{'completed': item.completed}" :key="item.id">
    <div class="list-item-title col-8 pl-2 pr-0" v-text="item.title"></div>
    <div class="list-item-check col-2 pr-0">
      <input type="checkbox" v-model="item.completed" />
    </div>
    <div class="list-item-delete col-2 pr-0 pl-2">
      <button @click="onDelete(item.id)">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    onDelete(id) {
      const items = this.$store.getters.getBucketListItems.filter(
        item => item.id !== id
      );
      this.$store.dispatch("storeBucketListItems", items);
    }
  }

  /* methods: {
    toggle() {
      axios
        .patch(window.location.pathname + "/" + this.item.id, {
          completed: !this.completed
        })
        .then(({ data }) => {
          this.completed = data.completed;
        })
        .catch(error => {
          alert(error.response.data.message);
        });
    },

    destroy() {
      axios
        .delete(window.location.pathname + "/" + this.item.id)
        .then(this.$emit("deleted", this.index))
        .catch(error => {
          alert(error.response.data.message);
        });
    }
  } */
};
</script>
