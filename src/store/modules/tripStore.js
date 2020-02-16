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

      const response = await axios
        .get("/trips.json" + "?auth=" + idToken)
        .then(res => res)
        .catch(error => console.log(error));

      const trips = Object.keys(response);

      const updateTripImages = trips => {
        return Promise.all(
          trips.map(async trip => {
            const image = await dispatch(
              "fetchTripImage",
              response[trip].imageId
            );

            return { ...response[trip], id: trip, image: image };
          })
        );
      };

      const newTrips = updateTripImages(trips).then(newTrips => {
        commit("storeTrips", newTrips);

        return newTrips;
      });

      return newTrips;
    },

    async fetchTripImage({ commit, state, getters }, tripImageId) {
      const idToken = getters.idToken;
      return axios
        .get(
          `/tripImages.json?auth=${idToken}&orderBy="$key"&startAt="${tripImageId}"&limitToFirst=1`
        )
        .then(res => res)
        .catch(error => console.log(error));
    },
    fetchTripImages({ commit, getters }) {
      const idToken = getters.idToken;
      const tempImages = axios
        .get(`/tripImages.json?auth=${idToken}`)
        .then(res => res)
        .catch(error => console.log(error));

      const images = Object.keys(tempImages).map(imageId => {
        return { ...tempImages[imageId], id: imageId };
      });

      commit("storeTripImages", images);
    },
    editTrip({ commit, state, getters }, payload) {
      const idToken = getters.idToken;
      const userId = getters.userId;

      if (!idToken || !userId) {
        alert("Hmm, something is missing. Try again!");
        return;
      }

      const newTrip = { ...payload };

      const trip = axios
        .put(`/trips/${payload.id}.json?auth=${idToken}`, newTrip)
        .then(res => res)
        .catch(error => console.log(error));

      const trips = [...state.trips].map(item =>
        item.id !== newTrip.id ? item : { ...item, ...newTrip }
      );

      commit("storeTrips", trips);
      commit("storeTrip", newTrip);

      router.replace(`/trip/${trip.id}`);
    },
    storeTrip({ commit, state, getters }, payload) {
      const idToken = getters.idToken;
      const userId = getters.userId;

      if (!idToken || !userId) {
        alert("Hmm, something is missing. Try again!");
        return;
      }

      const newTrip = { ...payload, userId };

      const trip = axios
        .post("/trips.json" + "?auth=" + idToken, newTrip)
        .then(res => res)
        .catch(error => console.log(error));

      const trips = state.trips;
      trips.push(trip);

      commit("storeTrips", trips);

      router.replace(`/trip/${trip.id}`);
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
