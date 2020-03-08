import axios from "../../../axios/axios";

export const actions = {
  async fetchChecklistItems({ commit, rootGetters }, tripId) {
    const idToken = rootGetters.idToken;
    const userId = rootGetters.userId;

    if (!idToken || !userId) {
      alert("Hmm, something is missing. Try again!");
      return;
    }

    const response = await axios
      .get(
        `/checklists.json?auth=${idToken}&orderBy="tripId"&equalTo="${tripId}"`
      )
      .then(res => res.data);

    if (!response) return;

    const items = Object.keys(response).map(checklistId => {
      return { ...response[checklistId], id: checklistId };
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

    const response = await axios
      .post(`/checklists.json?auth=${idToken}`, newItem)
      .then(res => res.data);

    if (!response) return;

    commit("addChecklistItems", { ...newItem, id: response.name });
  },
  async deleteChecklistItem({ commit, getters, rootGetters }, id) {
    const idToken = rootGetters.idToken;
    const userId = rootGetters.userId;

    if (!idToken || !userId) {
      alert("Hmm, something is missing. Try again!");
      return;
    }

    const response = await axios
      .delete(`/checklists/${id}.json?auth=${idToken}`)
      .then(res => res.data);

    if (!response) return;

    const index = getters.getChecklistItems.findIndex(item => item.id === id);

    commit("deleteChecklistItem", index);
  },

  async editChecklistItem({ state, commit, rootGetters }, updatedItem) {
    const idToken = rootGetters.idToken;
    const userId = rootGetters.userId;

    if (!idToken || !userId) {
      alert("Hmm, something is missing. Try again!");
      return;
    }

    const response = await axios
      .put(`/checklists/${updatedItem.id}.json?auth=${idToken}`, updatedItem)
      .then(res => res.data);

    if (!response) return;

    const items = [...state.checklistItems].map(tempItem =>
      tempItem.id !== updatedItem.id
        ? tempItem
        : { ...tempItem, ...updatedItem }
    );

    commit("storeChecklistItems", items);
  }
};
