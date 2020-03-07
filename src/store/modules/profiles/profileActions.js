import axios from "../../../axios/axios";

export const actions = {
  async storeProfile({ commit, rootGetters }, data) {
    const idToken = rootGetters.idToken;
    const userId = rootGetters.userId;

    if (!idToken || !userId) {
      alert("Hmm, something is missing. Try again!");
      return;
    }

    const response = await axios
      .post(`/profiles.json?auth=${idToken}`, data)
      .then(res => res.data);

    if (!response) return;

    commit("storeProfile", response);
  },

  async editProfile({ commit, getters, rootGetters }, updatedProfile) {
    const idToken = rootGetters.idToken;
    const userId = rootGetters.userId;

    if (!idToken || !userId) {
      alert("Hmm, something is missing. Try again!");
      return;
    }

    const response = await axios
      .put(`/profiles/${userId}.json?auth=${idToken}`, {
        ...getters.getProfile,
        ...updatedProfile
      })
      .then(res => res.data);

    if (!response) return;

    commit("storeProfile", response);
  },

  editAvatar({ dispatch, getters }, avatar) {
    const profile = { ...getters.getProfile, avatar };

    dispatch("editProfile", profile);
  }
};
