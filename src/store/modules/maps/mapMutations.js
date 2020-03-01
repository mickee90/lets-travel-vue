export const mutations = {
  storeMarkers(state, data) {
    state.markers = data;
  },
  addMarker(state, data) {
    state.markers.push(data);
  },
  resetState(state) {
    Object.assign(state, getInitState());
  }
};
