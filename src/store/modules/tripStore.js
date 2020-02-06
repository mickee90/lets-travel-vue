import axios from "../../axios/axios";
import store from "../../store/store";
import router from "../../router/index";
import { trip_images } from "../../mock-data/trip_images";

export const tripStore = {
  state: {
    trips: [],
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

    async fetchTrips({ commit, dispatch }) {
      const idToken = localStorage.getItem("idToken");
      const userId = localStorage.getItem("userId");

      if (!idToken || !userId) {
        alert("Hmm, something is missing. Try again!");
        return;
      }

      return await axios
        .get("/trips.json" + "?auth=" + idToken)
        .then(res => {
          const trips = Object.keys(res.data);

          const updateTripImages = trips => {
            return Promise.all(
              trips.map(async trip => {
                const image = await dispatch(
                  "fetchTripImage",
                  res.data[trip].imageId
                );

                return { ...res.data[trip], id: trip, image: image };
              })
            );
          };

          const newTrips = updateTripImages(trips).then(newTrips => {
            commit("storeTrips", newTrips);

            return newTrips;
          });

          return newTrips;
        })
        .catch(error => console.log(error));
    },

    async fetchTripImage({ commit, state }, tripImageId) {
      const idToken = localStorage.getItem("idToken");
      return axios
        .get(
          `/tripImages.json?auth=${idToken}&orderBy="$key"&startAt="${tripImageId}"&limitToFirst=1`
        )
        .then(res => {
          /* console.log(res.data); */

          return res.data;
        })
        .catch(error => console.log(error));
    },
    storeTrip({ commit, state }, payload) {
      const idToken = localStorage.getItem("idToken");
      const userId = localStorage.getItem("userId");
      /* console.log(payload, idToken, userId); */

      if (!idToken || !userId) {
        alert("Hmm, something is missing. Try again!");
        return;
      }

      const newTrip = { ...payload, userId };

      axios
        .post("/trips.json" + "?auth=" + idToken, newTrip)
        .then(res => {
          const trip = res.data;
          console.log(res, trip);

          const trips = state.trips;
          trips.push(trip);

          commit("storeTrips", trips);

          router.replace(`/trip/${trip.id}`);
        })
        .catch(error => console.log(error));
    },
    setTrip({ commit, state }, tripId) {
      const trip = state.trips.find(item => item.id === parseFloat(tripId));
      commit("setTrip", trip);
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
