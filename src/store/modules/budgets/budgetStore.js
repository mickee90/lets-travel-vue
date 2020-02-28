

import { mutations } from './budgetMutations'
import { actions } from './budgetActions'
import { getters } from './budgetGetters'

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
  namespaced: true,
  state: getInitState(),
  mutations,
  actions,
  getters
};
