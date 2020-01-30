export const tripStore = {
  state: {
    trips: [],
    trip: null
  },
  mutations: {
    storeTrips(state, data) {
      state.trips = data;
    },
    storeTrip(state, data) {
      state.trip = data;
    }
  },
  actions: {
    storeTrips({ commit }, data) {
      commit("storeTrips", data);
    },
    storeTrip({ commit }, data) {
      commit("storeTrip", data);
    }
  },
  getters: {
    getTrips(state) {
      return state.trips;
    },
    getTrip(state) {
      return state.trip;
    }
  }
};
