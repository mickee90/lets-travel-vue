export const mutations = {
  storeTrips(state, data) {
    state.trips = data;
  },
  addTrip(state, data) {
    state.trips.push(data);
  },
  storeTrip(state, data) {
    state.trip = data;
  },
  storeTripImages(state, data) {
    state.tripImages = data;
  },
  setTrip(state, data) {
    state.trip = data;
  },
  resetState(state) {
    Object.assign(state, getInitState());
  }
};
