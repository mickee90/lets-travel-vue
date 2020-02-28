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

            <div id="show-budget-box" class="col-6 row pr-0" v-if="!editBudget">
              <div class="col-8 pr-0">
                {{ budget.currency }}
                <span id="total_amount">{{ budget.amount }}</span>
              </div>
              <div class="text-md-rights col-4">
                <button @click="editBudget = true" data-js="edit-budget-btn">
                  <i class="fas fa-pen"></i>
                </button>
              </div>
            </div>

            <div id="edit-budget-box" class="col-6 row pr-0" v-else>
              <span id="total_amount" class="col-8 pr-0">
                <input
                  type="text"
                  name="total_amount"
                  id="total_amount_input"
                  v-model="budget.amount"
                  style="width:100%;"
                  autofocus
                />
              </span>
              <span class="text-md-rights col-4">
                <button @click="saveBudget" data-js="update-budget-btn">
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
          <app-budget-list-add-item
            v-if="addItem"
            @hideInput="addItem = false"
            @itemAdded="itemAdded"
          ></app-budget-list-add-item>

          <app-budget-list-item
            v-for="item in budget.items"
            :budgetItem="item"
            :key="item.id"
            :budget="budget"
          ></app-budget-list-item>
        </div>
        <tab-bar></tab-bar>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import BudgetListItem from "../../components/Budget/BudgetListItem.vue";
import BudgetListAddItem from "../../components/Budget/BudgetListAddItem.vue";

export default {
  data() {
    return {
      addItem: false,
      editBudget: false,
      trip: {}
    };
  },
  computed: {
    ...mapState("budget", ["budget"]),
    ...mapGetters("budget", ["getBudget"])
  },
  created() {
    this.trip = this.$store.getters.getTrip;
    this.fetchBudget(this.trip.id);
  },
  methods: {
    ...mapActions("budget", ["fetchBudget", "updateBudget"]),
    saveBudget() {
      this.updateBudget();
      this.editBudget = false;
    },
    itemAdded() {
      this.addItem = false;
    }
  },
  components: {
    appBudgetListItem: BudgetListItem,
    appBudgetListAddItem: BudgetListAddItem
  }
};
</script>

<style scoped></style>
