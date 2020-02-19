import axios from "../../axios/axios";
import router from "../../router/index";

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
    async createChecklistItems({ commit, state, getters }, title) {
      const idToken = getters.idToken;
      const userId = getters.userId;

      if (!idToken || !userId) {
        alert("Hmm, something is missing. Try again!");
        return;
      }

      const lastItem = state.checklistItems[state.checklistItems.length - 1];
      const newItem = {
        trip_id: getters.getTrip.id,
        order: lastItem.order++,
        title: title,
        completed: false,
        completed_at: new Date().toISOString().split("T")[0]
      };

      const item = await axios
        .post(`/checklists.json?auth=${idToken}`, newItem)
        .then(res => res)
        .catch(error => console.log(error));

      console.log(item, item.data);

      commit("addChecklistItems", item.data);
    }
  },
  getters: {
    getChecklistItems(state) {
      return state.checklistItems;
    }
  }
};
