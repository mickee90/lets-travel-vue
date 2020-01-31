export const tripStore = {
  state: {
    trips: [
      {
        id: 1,
        user_id: 1,
        title: "Trip title #1",
        description: "Some description about trip #1",
        trip_image_id: 1,
        start_date: "2020-03-01",
        end_date: "2020-03-01"
      },
      {
        id: 2,
        user_id: 1,
        title: "Trip title #2",
        description: "Some description about trip #2",
        trip_image_id: 2,
        start_date: "2020-03-01",
        end_date: "2020-03-01"
      },
      {
        id: 3,
        user_id: 1,
        title: "Trip title #3",
        description: "Some description about trip #3",
        trip_image_id: 3,
        start_date: "2020-03-01",
        end_date: "2020-03-01"
      }
    ],
    trip: {
      id: 1,
      user_id: 1,
      title: "Trip title #1",
      description: "Some description about trip #1",
      trip_image_id: 1,
      start_date: "2020-03-01",
      end_date: "2020-03-01"
    }
  },
  mutations: {
    storeTrips(state, data) {
      state.trips = data;
    },
    storeTrip(state, data) {
      state.trip = data;
    },
    setTrip(state, data) {
      state.trip = data;
    }
  },
  actions: {
    storeTrips({ commit }, data) {
      commit("storeTrips", data);
    },
    storeTrip({ commit }, data) {
      commit("storeTrip", data);
    },
    setTrip({ commit, state }, tripId) {
      const trip = state.trips.find(item => item.id === parseFloat(tripId));
      commit('setTrip', trip);
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
