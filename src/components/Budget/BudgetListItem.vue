<template>
  <div class="col-12 post budget-item">
    <div class="col-8 pl-2 pr-0 row">
      <div class="budget-item-title col-12">
        <input
          type="text"
          name="item_title"
          :value="item.title"
          style="width:100%;"
          class="budget-item-title-input"
          disabled
        />
      </div>
      <div class="budget-item-date col-12">
        <input
          type="date"
          class="form-control item-input budget-item-start_date-input"
          name="item_start_date"
          :value="item.start_date"
          disabled
        />
      </div>
    </div>

    <div class="col-6 row show-budget-item-box">
      <div class="col-6 budget-amount-wrapper">
        <div class="budget-item-amount">
          {{ budget.currency }}
          <span class="amount">{{ item.amount }}</span>
        </div>
      </div>

      <div class="col-6 row pl-0">
        <div class="budget-item-delete col-12 m-auto">
          <button onclick="App.Budget.destroyItem(this)" :data-item_id="item.id">
            <i class="fas fa-trash"></i>
          </button>
        </div>
        <div class="budget-item-update col-12 m-auto">
          <button onclick="App.Budget.editItem(this)" :data-item_id="item.id">
            <i class="fas fa-pen"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="col-6 row edit-budget-item-box" style="display:none;">
      <div class="col-6 budget-amount-wrapper">
        <div class="budget-item-amount" style="border-bottom: none;">
          <input type="text" name="item_amount" :value="item.amount" style="width:100%;" autofocus />
        </div>
      </div>

      <div class="col-6 row pl-0">
        <div class="budget-item-delete col-12 m-auto">
          <button onclick="App.Budget.destroyItem(this)" :data-item_id="item.id">
            <i class="fas fa-trash"></i>
          </button>
        </div>
        <div class="budget-item-update col-12 m-auto">
          <button onclick="App.Budget.updateItem(this)" :data-item_id="item.id">
            <i class="fas fa-check"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item", "budget"],
  methods: {
    onDelete(id) {
      const items = this.$store.getters.getBudgetItems.filter(
        item => item.id !== id
      );
      this.$store.dispatch("storeBudgetItems", items);
    }
  },
  mounted() {
    console.log(this.item);
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
