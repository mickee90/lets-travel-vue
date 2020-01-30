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
      <button @click="store">
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
export default {
  data() {
    return {
      itemTitle: ""
    };
  },

  methods: {
    store() {
      const listItem = this.itemTitle.trim();

      if (listItem === "") {
        alert("The input cannot be empty");
        return;
      }

      this.$store.dispatch("addBucketListItems", listItem);
      this.itemTitle = "";
      this.$emit("hideInput");

      /* axios
        .post(window.location.pathname, { title: listItem })
        .then(response => {
          console.log(response.data);
          this.$emit("added", response.data);
          this.$emit("itemAdded");
        })
        .catch(error => {
          alert(error.response.data.message);
        }); */
    },
    cancel() {
      this.itemTitle = "";
      this.$emit("hideInput");
    }

    /* destroy() {
      axios
        .delete(window.location.pathname + "/" + this.item.id)
        .then(this.$emit("deleted", this.item.id))
        .catch(error => {
          alert(error.response.data.message);
        });
    } */
  }
};
</script>