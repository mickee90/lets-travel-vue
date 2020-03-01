import axios from "../../../axios/axios";
import { v4 as uuidv4 } from "uuid";

export const actions = {
  storeBudget({ commit }, data) {
    commit("storeBudget", data);
  },
  async fetchBudget({ commit, getters, dispatch, rootGetters }, tripId) {
    const idToken = rootGetters.idToken;
    const userId = rootGetters.userId;

    if (!idToken || !userId) {
      alert("Hmm, something is missing. Try again!");
      return;
    }

    const response = await axios
      .get(`/budgets.json?auth=${idToken}&orderBy="tripId"&equalTo="${tripId}"`)
      .then(res => res)
      .catch(error => console.log(error));

    const budget = response.data;

    if (Object.keys(budget).length === 0) {
      dispatch("initBudget", { ...getInitState().budget, tripId });
    } else {
      commit("storeBudget", { ...budget[Object.keys(budget)[0]] });
    }
  },
  async initBudget({ commit, getters, dispatch, rootGetters }, data) {
    const idToken = rootGetters.idToken;
    const userId = rootGetters.userId;

    if (!idToken || !userId) {
      alert("Hmm, something is missing. Try again!");
      return;
    }

    await axios
      .post(`/budgets.json?auth=${idToken}`, data)
      .then(res => {
        commit("storeBudget", { ...data, id: res.data.name });

        // Ugly temporary solution to set the id as a property
        dispatch("updateBudget");
      })
      .catch(error => console.log(error));
  },

  addBudgetListItem({ commit, state, getters, dispatch }, data) {
    const item = {
      id: uuidv4(),
      budgetId: getters.getBudgetId,
      title: data.title,
      amount: data.amount,
      startDate: data.startDate,
      endDate: data.startDate
    };

    commit("addBudgetListItems", item);

    const itemsSum = getters.getBudgetItems.reduce(
      (acc, item) => acc + parseInt(item.amount),
      0
    );
    const remainings = getters.getBudgetAmount - itemsSum;

    commit("storeBudget", { ...getters.getBudget, remaining: remainings });
    dispatch("updateBudget");
  },

  updateBudgetListItem({ commit, state, getters, dispatch }, data) {
    const items = getters.getBudgetItems;

    if (items === undefined || items.length === 0) {
      return false;
    }

    const index = items.findIndex(item => item.id === data.id);

    const swaped = items.splice(index, 1, data);

    if (swaped.length > 0) {
      const itemsSum = items.reduce(
        (acc, item) => acc + parseInt(item.amount),
        0
      );
      const remainings = getters.getBudgetAmount - parseInt(itemsSum);

      commit("storeBudget", {
        ...getters.getBudget,
        items,
        remaining: remainings
      });
      dispatch("updateBudget");
    }
  },

  deleteBudgetListItem({ commit, state, getters, dispatch }, id) {
    const items = getters.getBudgetItems;

    if (items === undefined || items.length === 0) {
      return false;
    }

    const index = items.findIndex(item => item.id === id);

    const removed = items.splice(index, 1);

    if (removed.length > 0) {
      const itemsSum = items.reduce(
        (acc, item) => acc + parseInt(item.amount),
        0
      );
      const remainings = getters.getBudgetAmount - parseInt(itemsSum);

      commit("storeBudget", {
        ...getters.getBudget,
        items,
        remaining: remainings
      });
      dispatch("updateBudget");
    }
  },

  async updateBudget({ getters, rootGetters, commit }) {
    const idToken = rootGetters.idToken;
    const userId = rootGetters.userId;
    const budgetId = getters.getBudgetId;
    const budget = getters.getBudget;

    if (!idToken || !userId || !budgetId) {
      alert("Hmm, something is missing. Try again!");
      return;
    }

    const itemsSum = budget.items.reduce(
      (acc, item) => acc + parseInt(item.amount),
      0
    );
    const remainings = budget.amount - parseInt(itemsSum);

    const newBudget = {
      ...budget,
      remaining: remainings
    };

    await axios
      .put(`/budgets/${budgetId}.json?auth=${idToken}`, newBudget)
      .then(res => {
        commit("storeBudget", { ...res.data });
      })
      .catch(error => console.log(error));
  },
  async updateBudgetAmount({ commit, getters, rootGetters }, newTotalSum) {
    const idToken = rootGetters.idToken;
    const userId = rootGetters.userId;
    const budgetId = getters.getBudgetId;

    if (!idToken || !userId || !budgetId) {
      alert("Hmm, something is missing. Try again!");
      return;
    }

    const itemsSum = getters.getBudgetItems.reduce(
      (acc, item) => acc + parseInt(item.amount),
      0
    );
    const remainings = parseInt(newTotalSum) - itemsSum;

    const newBudget = {
      ...getters.getBudget,
      remaining: remainings,
      amount: newTotalSum
    };

    await axios
      .put(`/budgets/${budgetId}.json?auth=${idToken}`, newBudget)
      .then(res => {
        commit("storeBudget", { ...res.data });
      })
      .catch(error => console.log(error));
  }
};
