import axios from "../../../axios/axios";

export const actions = {
  async storeProfile({ commit, rootGetters }, data) {
    const idToken = rootGetters.idToken;
    const userId = rootGetters.userId;

    if (!idToken || !userId) {
      alert("Hmm, something is missing. Try again!");
      return;
    }

    const response = await axios.post(`/profiles.json?auth=${idToken}`, data);

    commit("storeProfile", response.data);
  },

  async editProfile({ commit, getters, rootGetters }, updatedProfile) {
    console.log("editProfile", updatedProfile);

    const idToken = rootGetters.idToken;
    const userId = rootGetters.userId;

    if (!idToken || !userId) {
      alert("Hmm, something is missing. Try again!");
      return;
    }

    const response = await axios.put(
      `/profiles/${userId}.json?auth=${idToken}`,
      { ...getters.getProfile, ...updatedProfile }
    );

    console.log(response);
    const profile = response.data;

    console.log("updated profile", profile);

    commit("storeProfile", profile);
  },

  editAvatar({ dispatch, getters }, avatar) {
    const profile = { ...getters.getProfile, avatar };

    console.log("editAvatar", avatar, profile);

    dispatch("editProfile", profile);
  }
};
