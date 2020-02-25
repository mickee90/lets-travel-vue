import axios from "../../axios/axios";
import router from "../../router/index";

const getInitState = () => {
  return {
    budget: {
      id: null,
      amount: 0,
      remaining: 0,
      items: [],
      tripId: null,
      currency: "$"
    }
  };
};

export const budgetStore = {
  state: getInitState(),
  mutations: {
    storeBudgetItems(state, data) {
      state.budget.items = data;
    },
    storeBudgetAmount(state, data) {
      state.budget.amount = data;
    },
    storeBudget(state, data) {
      state.budget = { ...data };
    },
    addBudgetListItems(state, data) {
      state.budget.items.unshift(data);
    },
    resetState(state) {
      Object.assign(state, getInitState());
    }
  },
  actions: {
    storeBudget({ commit }, data) {
      commit("storeBudget", data);
    },
    async fetchBudget({ commit, getters, dispatch }, tripId) {
      const idToken = getters.idToken;
      const userId = getters.userId;

      if (!idToken || !userId) {
        alert("Hmm, something is missing. Try again!");
        return;
      }

      const response = await axios
        .get(
          `/budgets.json?auth=${idToken}&orderBy="tripId"&equalTo="${tripId}"`
        )
        .then(res => res)
        .catch(error => console.log(error));

      const budget = response.data;

      if (Object.keys(budget).length === 0) {
        dispatch("initBudget", { ...getInitState().budget, tripId });
      } else {
        commit("storeBudget", budget);
      }
    },
    /*  async updateBudget({ commit, getters, dispatch }, tripId) {
      const idToken = getters.idToken;
      const userId = getters.userId;

      if (!idToken || !userId) {
        alert("Hmm, something is missing. Try again!");
        return;
      }

      const response = await axios
        .get(
          `/budgets.json?auth=${idToken}&orderBy="tripId"&equalTo="${tripId}"`
        )
        .then(res => res)
        .catch(error => console.log(error));

      const budget = response.data;

      if (Object.keys(budget).length === 0) {
        dispatch("initBudget", { ...getInitState(), tripId });
      } else {
        commit("storeBudget", budget);
      }
    }, */
    async initBudget({ commit, getters, dispatch }, data) {
      const idToken = getters.idToken;
      const userId = getters.userId;

      if (!idToken || !userId) {
        alert("Hmm, something is missing. Try again!");
        return;
      }

      await axios
        .post(`/budgets.json?auth=${idToken}`, data)
        .then(res => {
          commit("storeBudget", { ...data, id: res.data.name });
          dispatch("updateBudgetId");
        })
        .catch(error => console.log(error));
    },

    /* addBudgetListItem({ commit, state }, data) {
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

      const itemsSum = state.budgetItems.reduce(
        (acc, item) => acc + item.amount,
        0
      );
      const remainings = state.budget.remaining - itemsSum;

      commit("storeBudget", { ...state.budget, remaining: remainings });
    }, */

    // Ugly temporary solution to set the id as a property
    async updateBudgetId({ getters }) {
      const idToken = getters.idToken;
      const userId = getters.userId;
      const budgetId = getters.getBudgetId;
      const budget = getters.getBudget;

      if (!idToken || !userId || !budgetId) {
        alert("Hmm, something is missing. Try again!");
        return;
      }

      await axios
        .put(`/budgets/${budgetId}.json?auth=${idToken}`, budget)
        .then(res => res)
        .catch(error => console.log(error));
    },
    async updateBudgetAmount({ commit, getters }, newTotalSum) {
      const idToken = getters.idToken;
      const userId = getters.userId;
      const budgetId = getters.getBudgetId;

      if (!idToken || !userId || !budgetId) {
        alert("Hmm, something is missing. Try again!");
        return;
      }

      const itemsSum = getters.getBudgetItems.reduce(
        (acc, item) => acc + item.amount,
        0
      );
      const remainings = newTotalSum - itemsSum;

      const newBudget = {
        ...getters.getBudget,
        remaining: remainings,
        amount: newTotalSum
      };

      await axios
        .put(`/budgets/${budgetId}.json?auth=${idToken}`, newBudget)
        .then(res => {
          commit("storeBudgetAmount", res.data.amount);
        })
        .catch(error => console.log(error));
    }
  },
  getters: {
    getBudgetItems(state) {
      return state.budget.items;
    },
    getBudget(state) {
      return state.budget;
    },
    getBudgetAmount(state) {
      return state.budget.amount;
    },
    getBudgetRemaining(state) {
      return state.budget.remaining;
    },
    getCurrency(state) {
      return state.budget.currency;
    },
    getBudgetId(state) {
      return state.budget.id;
    },
    getBudgetTripId(state) {
      return state.budget.tripId;
    }
  }
};
