export const getters = {
  getProfile(state) {
    return state.profile;
  },
  getAvatar(state) {
    return state.profile.avatar;
  }
};
