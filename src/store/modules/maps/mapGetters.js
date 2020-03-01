export const getters = {
  getMarkers(state) {
    return state.markers;
  },
  getMarker(state, index) {
    return state.markers[index];
  }
};
