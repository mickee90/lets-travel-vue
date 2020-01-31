<template>
  <div
    class="banner-image"
    style="background-image: url(./imgs/trips/soccer.jpg);background-size: cover;"
  >
    <div class="container content posts item-view">
      <div class="post-body">
        <div class="title-input col-12">Budget</div>

        <div class="button-bar col-12">
          <div class="text-right">
            <button @click="addItem = true">
              <i class="fas fa-plus-circle"></i>
            </button>
          </div>
        </div>

        <div class="row">
          <div class="col-12 d-flex">
            <div class="col-6">Total budget:</div>

            <div id="show-budget-box" class="col-6 row pr-0">
              <div class="col-8 pr-0">
                {{ budget.currency }}
                <span id="total_amount">{{ budget.total_amount}}</span>
              </div>
              <div class="text-md-rights col-4">
                <button onclick="App.Budget.editTotalAmount(this)" data-js="edit-budget-btn">
                  <i class="fas fa-pen"></i>
                </button>
              </div>
            </div>

            <div id="edit-budget-box" class="col-6 row pr-0" style="display:none;">
              <span id="total_amount" class="col-8 pr-0">
                <input
                  type="text"
                  name="total_amount"
                  id="total_amount_input"
                  :value="budget.remaining"
                  style="width:100%;"
                  autofocus
                />
              </span>
              <span class="text-md-rights col-4">
                <button onclick="App.Budget.updateTotalAmount(this)" data-js="update-budget-btn">
                  <i class="fas fa-check"></i>
                </button>
              </span>
            </div>
          </div>
          <div class="col-12 d-flex">
            <div class="col-6">Remaining:</div>
            <div class="col-6">
              {{ budget.currency }}
              <span id="remainings">{{ budget.remaining }}</span>
            </div>
          </div>
        </div>

        <div class="item-list">
          <app-budget-list-add-item v-if="addItem" @hideInput="addItem = false"></app-budget-list-add-item>
          <app-budget-list-item
            v-for="item in budgetItems"
            :item="item"
            :key="item.id"
            :budget="budget"
          ></app-budget-list-item>
        </div>
        <app-tab-bar></app-tab-bar>
      </div>
    </div>
  </div>
</template>

<script>
import TabBar from "../layout/TabBar.vue";
import { budget } from "../../mock-data/budget";
import { budgetItems } from "../../mock-data/budget-items";
import BudgetListItem from "../../components/Budget/BudgetListItem.vue";
import BudgetListAddItem from "../../components/Budget/BudgetListAddItem.vue";

export default {
  data() {
    return {
      addItem: false
    };
  },
  computed: {
    budget() {
      return this.$store.getters.getBudget;
    },
    budgetItems() {
      console.log(this.$store.getters.getBudgetItems);
      return this.$store.getters.getBudgetItems;
    }
  },
  beforeCreate() {
    const itemSum = budgetItems.reduce((acc, item) => acc + item.amount, 0);
    const remainings = budget.remaining - itemSum;

    this.$store.dispatch("storeBudgetItems", budgetItems);
    this.$store.dispatch("storeBudget", { ...budget, remaining: remainings });
  },
  components: {
    appTabBar: TabBar,
    appBudgetListItem: BudgetListItem,
    appBudgetListAddItem: BudgetListAddItem
  }
};
</script>

<style scoped>
</style>