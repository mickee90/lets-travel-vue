const getInitState = () => {
  return { bucketListItems: [] };
};

export const bucketListStore = {
  state: getInitState(),
  mutations: {
    storeBucketListItems(state, data) {
      state.bucketListItems = data;
    },
    addBucketListItems(state, data) {
      state.bucketListItems.push(data);
    },
    resetState(state) {
      Object.assign(state, getInitState());
    }
  },
  actions: {
    storeBucketListItems({ commit }, data) {
      commit("storeBucketListItems", data);
    },
    addBucketListItems({ commit, state }, title) {
      const lastItem = state.bucketListItems[state.bucketListItems.length - 1];
      const item = {
        id: lastItem.id++,
        trip_id: 1,
        title: title,
        order: lastItem.order++,
        completed: false,
        completed_at: ""
      };
      commit("addBucketListItems", item);
    }
  },
  getters: {
    getBucketListItems(state) {
      return state.bucketListItems;
    }
  }
};
