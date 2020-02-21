import axios from "../../axios/axios";
import router from "../../router/index";

const getInitState = () => {
  return { bucketlistItems: [] };
};

export const bucketListStore = {
  state: getInitState(),
  mutations: {
    storeBucketlistItems(state, data) {
      state.bucketlistItems = data;
    },
    addBucketlistItems(state, data) {
      state.bucketlistItems.push(data);
    },
    updateBucketlistItems(state, index, data) {
      state.bucketlistItems.$set(index, data);
    },
    deleteBucketlistItem(state, index) {
      state.bucketlistItems.splice(index, 1);
    },
    resetState(state) {
      Object.assign(state, getInitState());
    }
  },
  actions: {
    storeBucketlistItems({ commit }, data) {
      commit("storeBucketlistItems", data);
    },
    async fetchBucketlistItems({ commit, getters }, tripId) {
      const idToken = getters.idToken;
      const userId = getters.userId;

      if (!idToken || !userId) {
        alert("Hmm, something is missing. Try again!");
        return;
      }

      const response = await axios
        .get(
          `/bucketlists.json?auth=${idToken}&orderBy="tripId"&equalTo="${tripId}"`
        )
        .then(res => res)
        .catch(error => console.log(error));

      const tempItems = response.data;
      /* console.log(res, tempItems); */

      const items = Object.keys(tempItems).map(bucketlistId => {
        return { ...tempItems[bucketlistId], id: bucketlistId };
      });

      commit("storeBucketlistItems", items);
    },
    async createBucketlistItems({ commit, state, dispatch, getters }, title) {
      /* const { idToken, userId } = dispatch("validateAuth");
      console.log(idToken, userId); */

      const idToken = getters.idToken;
      const userId = getters.userId;

      if (!idToken || !userId) {
        alert("Hmm, something is missing. Try again!");
        return;
      }

      const lastItem = state.bucketlistItems[state.bucketlistItems.length - 1];

      const newItem = {
        tripId: getters.getTrip.id,
        order: lastItem ? lastItem.order++ : 1,
        title: title,
        completed: false,
        completed_at: new Date().toISOString().split("T")[0]
      };

      await axios
        .post(`/bucketlists.json?auth=${idToken}`, newItem)
        .then(res => {
          commit("addBucketlistItems", { ...newItem, id: res.data.name });
        })
        .catch(error => console.log(error));
    },
    async deleteBucketlistItem({ commit, getters }, id) {
      const idToken = getters.idToken;
      const userId = getters.userId;

      if (!idToken || !userId) {
        alert("Hmm, something is missing. Try again!");
        return;
      }
      const response = await axios
        .delete(`/bucketlists/${id}.json?auth=${idToken}`)
        .then(res => res.data)
        .catch(error => console.log(error));

      console.log(response);

      const index = getters.getBucketlistItems.findIndex(
        item => item.id === id
      );

      commit("deleteBucketlistItem", index);
    }
  },
  getters: {
    getBucketlistItems(state) {
      return state.bucketlistItems;
    }
  }
};
