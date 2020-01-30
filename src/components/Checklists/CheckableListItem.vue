<template>
  <div class="col-12 post" :class="completed ? 'completed' : ''" :key="item.id">
    <div class="list-item-title col-8 pl-2 pr-0" v-text="item.title"></div>
    <div class="list-item-check col-2 pr-0">
      <input type="checkbox" :data-item_id="item.id" :checked="completed || ''" @click="toggle" />
    </div>
    <div class="list-item-delete col-2 pr-0 pl-2">
      <button :data-item_id="item.id" @click="destroy">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item", "index"],

  data() {
    return {
      completed: this.item.completed
    };
  },

  methods: {
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
  }
};
</script>
