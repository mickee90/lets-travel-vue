import axios from "../../../axios/axios";

export const actions = {
  storeBucketlistItems({ commit }, data) {
    commit("storeBucketlistItems", data);
  },
  async fetchBucketlistItems({ commit, rootGetters }, tripId) {
    const idToken = rootGetters.idToken;
    const userId = rootGetters.userId;

    if (!idToken || !userId) {
      alert("Hmm, something is missing. Try again!");
      return;
    }

    const response = await axios
      .get(
        `/bucketlists.json?auth=${idToken}&orderBy="tripId"&equalTo="${tripId}"`
      )
      .then(res => res.data);

    if (!response) return;

    const items = Object.keys(response).map(bucketlistId => {
      return { ...response[bucketlistId], id: bucketlistId };
    });

    commit("storeBucketlistItems", items);
  },
  async createBucketlistItems({ commit, state, rootGetters }, title) {
    const idToken = rootGetters.idToken;
    const userId = rootGetters.userId;

    if (!idToken || !userId) {
      alert("Hmm, something is missing. Try again!");
      return;
    }

    const lastItem = state.bucketlistItems[state.bucketlistItems.length - 1];

    const newItem = {
      tripId: rootGetters.getTrip.id,
      order: lastItem ? lastItem.order++ : 1,
      title: title,
      completed: false,
      completed_at: new Date().toISOString().split("T")[0]
    };

    const response = await axios
      .post(`/bucketlists.json?auth=${idToken}`, newItem)
      .then(res => res.data);

    if (!response) return;

    commit("addBucketlistItems", { ...newItem, id: response.name });
  },
  async deleteBucketlistItem({ commit, getters, rootGetters }, id) {
    const idToken = rootGetters.idToken;
    const userId = rootGetters.userId;

    if (!idToken || !userId) {
      alert("Hmm, something is missing. Try again!");
      return;
    }

    const response = await axios
      .delete(`/bucketlists/${id}.json?auth=${idToken}`)
      .then(res => res.data);

    if (!response) return;

    const index = getters.getBucketlistItems.findIndex(item => item.id === id);

    commit("deleteBucketlistItem", index);
  },

  async editBucketlistItem({ state, commit, rootGetters }, updatedItem) {
    const idToken = rootGetters.idToken;
    const userId = rootGetters.userId;

    if (!idToken || !userId) {
      alert("Hmm, something is missing. Try again!");
      return;
    }

    const response = await axios
      .put(`/bucketlists/${updatedItem.id}.json?auth=${idToken}`, updatedItem)
      .then(res => res.data);

    if (!response) return;

    const items = [...state.bucketlistItems].map(tempItem =>
      tempItem.id !== updatedItem.id
        ? tempItem
        : { ...tempItem, ...updatedItem }
    );

    commit("storeBucketlistItems", items);
  }
};
