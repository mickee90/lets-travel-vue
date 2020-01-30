export const checklistStore = {
  state: {
    checklistItems: []
  },
  mutations: {
    storeChecklistItems(state, data) {
      state.checklistItems = data;
    }
  },
  actions: {
    storeChecklistItems({ commit }, data) {
      commit("storeChecklistItems", data);
    }
  },
  getters: {
    getChecklistItems(state) {
      return state.checklistItems;
    }
  }
};
