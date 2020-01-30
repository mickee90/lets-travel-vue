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
    }
  },
  actions: {
    storeBudgetItems({ commit }, data) {
      commit("storeBudgetItems", data);
    },
    storeBudget({ commit }, data) {
      commit("storeBudget", data);
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
