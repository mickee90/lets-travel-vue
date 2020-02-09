const getInitState = () => {
  return { checklistItems: [] };
};

export const checklistStore = {
  state: getInitState(),
  mutations: {
    storeChecklistItems(state, data) {
      state.checklistItems = data;
    },
    addChecklistItems(state, data) {
      state.checklistItems.push(data);
    },
    resetState(state) {
      Object.assign(state, getInitState());
    }
  },
  actions: {
    storeChecklistItems({ commit }, data) {
      commit("storeChecklistItems", data);
    },
    addChecklistItems({ commit, state }, title) {
      const lastItem = state.checklistItems[state.checklistItems.length - 1];
      const item = {
        id: lastItem.id++,
        trip_id: 1,
        order: lastItem.order++,
        title: title,
        completed: false,
        completed_at: ""
      };

      commit("addChecklistItems", item);
    }
  },
  getters: {
    getChecklistItems(state) {
      return state.checklistItems;
    }
  }
};
