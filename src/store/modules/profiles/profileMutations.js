export const mutations = {
  storeProfile(state, data) {
    state.profile = data;
  },
  resetState(state) {
    Object.assign(state, getInitState());
  }
};
