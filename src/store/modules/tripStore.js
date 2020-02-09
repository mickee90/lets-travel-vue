import axios from "../../axios/axios";
import store from "../../store/store";
import router from "../../router/index";
import { trip_images } from "../../mock-data/trip_images";

const getInitState = () => {
  return { trips: [], trip: {}, tripImages: [] };
};

export const tripStore = {
  state: getInitState(),
  mutations: {
    storeTrips(state, data) {
      state.trips = data;
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
  },
  actions: {
    storeTrips({ commit }, data) {
      commit("storeTrips", data);
    },

    async fetchTrips({ commit, dispatch, state, getters }) {
      const idToken = getters.idToken;
      const userId = getters.userId;

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

    async fetchTripImage({ commit, state, getters }, tripImageId) {
      const idToken = getters.idToken;
      return axios
        .get(
          `/tripImages.json?auth=${idToken}&orderBy="$key"&startAt="${tripImageId}"&limitToFirst=1`
        )
        .then(res => {
          return res.data;
        })
        .catch(error => console.log(error));
    },
    fetchTripImages({ commit, getters }) {
      const idToken = getters.idToken;
      axios
        .get(`/tripImages.json?auth=${idToken}`)
        .then(res => {
          const tempImages = res.data;

          const images = Object.keys(tempImages).map(imageId => {
            return { ...tempImages[imageId], id: imageId };
          });

          commit("storeTripImages", images);
        })
        .catch(error => console.log(error));
    },
    storeTrip({ commit, state, getters }, payload) {
      const idToken = getters.idToken;
      const userId = getters.userId;

      if (!idToken || !userId) {
        alert("Hmm, something is missing. Try again!");
        return;
      }

      const newTrip = { ...payload, userId };

      axios
        .post("/trips.json" + "?auth=" + idToken, newTrip)
        .then(res => {
          const trip = res.data;
          const trips = state.trips;
          trips.push(trip);

          commit("storeTrips", trips);

          router.replace(`/trip/${trip.id}`);
        })
        .catch(error => console.log(error));
    },
    setTrip({ commit, state }, tripId) {
      const trip = state.trips.find(item => item.id === tripId);
      commit("setTrip", trip);
    }
  },
  getters: {
    getTrips(state) {
      return state.trips;
    },
    getTrip(state) {
      return state.trip;
    },
    getTripImages(state) {
      return state.tripImages;
    }
  }
};
