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
    updateChecklistItems(state, index, data) {
      state.checklistItems.$set(index, data);
    },
    deleteChecklistItem(state, index) {
      state.checklistItems.splice(index, 1);
    },
    resetState(state) {
      Object.assign(state, getInitState());
    }
  },
  actions: {
    async fetchChecklistItems({ commit, getters }, tripId) {
      const idToken = getters.idToken;
      const userId = getters.userId;

      if (!idToken || !userId) {
        alert("Hmm, something is missing. Try again!");
        return;
      }

      const response = await axios
        .get(
          `/checklists.json?auth=${idToken}&orderBy="tripId"&equalTo="${tripId}"`
        )
        .then(res => res)
        .catch(error => console.log(error));

      const tempItems = response.data;

      console.log(tempItems);

      const items = Object.keys(tempItems).map(checklistId => {
        return { ...tempItems[checklistId], id: checklistId };
      });
      console.log(items);

      commit("storeChecklistItems", items);
    },
    storeChecklistItems({ commit }, data) {
      commit("storeChecklistItems", data);
    },
    async createChecklistItems({ commit, state, dispatch, getters }, title) {
      /* const { idToken, userId } = dispatch("validateAuth");
      console.log(idToken, userId); */

      const idToken = getters.idToken;
      const userId = getters.userId;

      if (!idToken || !userId) {
        alert("Hmm, something is missing. Try again!");
        return;
      }

      const lastItem = state.checklistItems[state.checklistItems.length - 1];

      const newItem = {
        tripId: getters.getTrip.id,
        order: lastItem ? lastItem.order++ : 1,
        title: title,
        completed: false,
        completed_at: new Date().toISOString().split("T")[0]
      };

      await axios
        .post(`/checklists.json?auth=${idToken}`, newItem)
        .then(res => {
          commit("addChecklistItems", { ...newItem, id: res.data.name });
        })
        .catch(error => console.log(error));
    },
    async deleteChecklistItem({ commit, getters }, id) {
      const idToken = getters.idToken;
      const userId = getters.userId;

      if (!idToken || !userId) {
        alert("Hmm, something is missing. Try again!");
        return;
      }
      const response = await axios
        .delete(`/checklists/${id}.json?auth=${idToken}`)
        .then(res => res.data)
        .catch(error => console.log(error));

      console.log(response);

      const index = getters.getChecklistItems.findIndex(item => item.id === id);

      commit("deleteChecklistItem", index);
    }
  },
  getters: {
    getChecklistItems(state) {
      return state.checklistItems;
    }
  }
};
