<template>
  <div class="col-12 post budget-item">
    <div class="col-8 pl-2 pr-0 row">
      <div class="budget-item-title col-12">
        <input
          name="title"
          v-model="item.title"
          placeholder="What did you buy?"
          class="form-control item-input"
          required
          autofocus
        />
      </div>
      <div class="budget-item-date col-12">
        <input
          id="startDate"
          type="date"
          class="form-control item-input"
          name="startDate"
          v-model="item.startDate"
          required
        />
      </div>
    </div>

    <div class="col-3 budget-amount-wrapper">
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

    <div class="col-3 row">
      <div class="budget-item-update col-12 m-auto">
        <button @click="cancel">
          <i class="fas fa-trash"></i>
        </button>
      </div>
      <div class="budget-item-delete col-12 m-auto">
        <button @click="store">
          <i class="fas fa-check"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { getDate } from "../../helpers";

export default {
  data() {
    return {
      item: {
        title: "",
        startDate: getDate(),
        amount: 0
      }
    };
  },
  methods: {
    store() {
      const newItem = {
        title: this.item.title.trim(),
        startDate: this.item.startDate.trim(),
        amount: parseFloat(this.item.amount)
      };

      if (newItem.title === "" || newItem.startDate === "") {
        alert("The input and date cannot be empty");
        return;
      }

      if (newItem.amount <= 0) {
        alert("Enter a valid amount");
        return;
      }

      this.$store.dispatch("budget/addBudgetListItem", newItem);
      this.resetItem();
      this.$emit("itemAdded");
    },
    cancel() {
      this.resetItem();
      this.$emit("hideInput");
    },
    resetItem() {
      this.item = {
        title: "",
        startDate: getDate(),
        amount: 0
      };
    }
  }
};
</script>
