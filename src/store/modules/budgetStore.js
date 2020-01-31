export const budgetStore = {
  state: {
    budgetItems: [],
    budget: null
  },
  mutations: {
    storeBudgetItems(state, data) {
      state.budgetItems = data;
    },
    storeBudget(state, data) {
      state.budget = data;
    },
    addBudgetListItems(state, data) {
      state.budgetItems.unshift(data);
    }
  },
  actions: {
    storeBudgetItems({ commit }, data) {
      commit("storeBudgetItems", data);
    },
    storeBudget({ commit }, data) {
      commit("storeBudget", data);
    },
    addBudgetListItem({ commit, state }, data) {
      const lastItem = state.budgetItems[state.budgetItems.length - 1];
      const item = {
        id: lastItem.id++,
        budget_id: 1,
        title: data.title,
        amount: data.amount,
        start_date: data.start_date,
        end_date: data.start_date
      };

      commit("addBudgetListItems", item);

      const itemsSum = state.budgetItems.reduce((acc, item) => acc + item.amount, 0);
      const remainings = state.budget.remaining - itemsSum;

      commit("storeBudget", { ...state.budget, remaining: remainings });
    },
    updateBudgetAmount({ commit, state }, newTotalSum) {
      const itemsSum = state.budgetItems.reduce((acc, item) => acc + item.amount, 0);
      const remainings = newTotalSum - itemsSum;

      commit("storeBudget", { ...state.budget, remaining: remainings, total_amount: newTotalSum });
    }
  },
  getters: {
    getBudgetItems(state) {
      return state.budgetItems;
    },
    getBudget(state) {
      return state.budget;
    }
  }
};
