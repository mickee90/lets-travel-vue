<template>
  <div class="col-12 post budget-item">
    <div class="col-8 pl-2 pr-0 row">
      <div class="budget-item-title col-12">
        <input
          type="text"
          v-model="item.title"
          style="width:100%;"
          class="budget-item-title-input"
          :disabled="!editMode"
        />
      </div>
      <div class="budget-item-date col-12">
        <input
          type="date"
          class="form-control item-input budget-item-start_date-input"
          v-model="item.startDate"
          :disabled="!editMode"
        />
      </div>
    </div>

    <div class="col-6 row show-budget-item-box">
      <div class="col-6 budget-amount-wrapper" v-if="!editMode">
        <div class="budget-item-amount">
          {{ budget.currency }}
          <span class="amount">{{ item.amount }}</span>
        </div>
      </div>
      <div class="col-6 budget-amount-wrapper" v-else>
        <div class="budget-item-amount" style="border:none;">
          <input
            id="amount"
            type="text"
            class="form-control item-input"
            style="text-align:center;"
            name="amount"
            v-model="item.amount"
          />
        </div>
      </div>

      <div class="col-6 row pl-0">
        <div class="budget-item-delete col-12 m-auto">
          <button @click.prevent="onDelete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
        <div class="budget-item-update col-12 m-auto">
          <button @click.prevent="editMode = true" v-if="!editMode">
            <i class="fas fa-pen"></i>
          </button>
          <button @click.prevent="onUpdate" v-if="editMode">
            <i class="fas fa-check"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["budgetItem", "budget"],
  data() {
    return {
      editMode: false
    };
  },
  computed: {
    item() {
      return { ...this.budgetItem };
    }
  },
  methods: {
    onDelete() {
      this.$store.dispatch("budget/deleteBudgetListItem", this.item.id);
    },
    onUpdate() {
      this.$store.dispatch("budget/updateBudgetListItem", this.item);
      this.editMode = false;
    }
  }
};
</script>
