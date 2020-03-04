import axios from "../../../axios/axios";

export const actions = {
  async fetchChecklistItems({ commit, rootGetters }, tripId) {
    const idToken = rootGetters.idToken;
    const userId = rootGetters.userId;

    if (!idToken || !userId) {
      alert("Hmm, something is missing. Try again!");
      return;
    }

    const response = await axios.get(
      `/checklists.json?auth=${idToken}&orderBy="tripId"&equalTo="${tripId}"`
    );

    const tempItems = response.data;

    const items = Object.keys(tempItems).map(checklistId => {
      return { ...tempItems[checklistId], id: checklistId };
    });

    commit("storeChecklistItems", items);
  },
  storeChecklistItems({ commit }, data) {
    commit("storeChecklistItems", data);
  },
  async createChecklistItems({ commit, state, rootGetters }, title) {
    const idToken = rootGetters.idToken;
    const userId = rootGetters.userId;

    if (!idToken || !userId) {
      alert("Hmm, something is missing. Try again!");
      return;
    }

    const lastItem = state.checklistItems[state.checklistItems.length - 1];

    const newItem = {
      tripId: rootGetters.getTrip.id,
      order: lastItem ? lastItem.order++ : 1,
      title: title,
      completed: false,
      completed_at: new Date().toISOString().split("T")[0]
    };

    const response = await axios.post(
      `/checklists.json?auth=${idToken}`,
      newItem
    );

    commit("addChecklistItems", { ...newItem, id: response.data.name });
  },
  async deleteChecklistItem({ commit, getters, rootGetters }, id) {
    const idToken = rootGetters.idToken;
    const userId = rootGetters.userId;

    if (!idToken || !userId) {
      alert("Hmm, something is missing. Try again!");
      return;
    }

    await axios.delete(`/checklists/${id}.json?auth=${idToken}`);

    const index = getters.getChecklistItems.findIndex(item => item.id === id);

    commit("deleteChecklistItem", index);
  }
};
