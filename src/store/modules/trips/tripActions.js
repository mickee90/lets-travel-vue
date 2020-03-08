import axios from "../../../axios/axios";
import router from "../../../router/index";

export const actions = {
  storeTrips({ commit }, data) {
    commit("storeTrips", data);
  },

  async fetchTrips({ commit, dispatch, rootGetters }) {
    const idToken = rootGetters.idToken;
    const userId = rootGetters.userId;

    if (!idToken || !userId) {
      alert("Hmm, something is missing. Try again!");
      return;
    }

    const response = await axios
      .get(`/trips.json?auth=${idToken}&orderBy="userId"&equalTo="${userId}"`)
      .then(res => res.data);

    if (!response) return [];

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

  async fetchTripImage({ rootGetters }, tripImageId) {
    const idToken = rootGetters.idToken;

    if (!idToken) {
      alert("Hmm, something is missing. Try again!");
      return;
    }

    const url = `/tripImages.json?auth=${idToken}&orderBy="$key"&startAt="${tripImageId}"&limitToFirst=1`;
    return await axios.get(url).then(res => res.data);
  },

  async fetchTripImages({ commit, rootGetters }) {
    const idToken = rootGetters.idToken;

    if (!idToken) {
      alert("Hmm, something is missing. Try again!");
      return;
    }

    const response = await axios
      .get(`/tripImages.json?auth=${idToken}`)
      .then(res => res.data);

    if (!response) return;

    const images = Object.keys(response).map(imageId => {
      return { ...response[imageId], id: imageId };
    });

    commit("storeTripImages", images);
  },

  async editTrip({ commit, state, getters, rootGetters }, payload) {
    const idToken = rootGetters.idToken;
    const userId = rootGetters.userId;
    const trip = getters.getTrip;

    if (!idToken || !userId) {
      alert("Hmm, something is missing. Try again!");
      return;
    }

    const newTrip = { ...trip, ...payload };

    const response = await axios
      .put(`/trips/${payload.id}.json?auth=${idToken}`, newTrip)
      .then(res => res.data);

    if (!response) return;

    const trips = [...state.trips].map(item =>
      item.id !== newTrip.id ? item : { ...item, ...newTrip }
    );

    commit("storeTrips", trips);
    commit("storeTrip", newTrip);

    router.replace(`/trip/${trip.id}`);
  },

  async storeTrip({ commit, dispatch, rootGetters }, payload) {
    const idToken = rootGetters.idToken;
    const userId = rootGetters.userId;

    if (!idToken || !userId) {
      alert("Hmm, something is missing. Try again!");
      return;
    }

    const newTrip = { ...payload, userId };

    const response = await axios
      .post("/trips.json" + "?auth=" + idToken, newTrip)
      .then(res => res.data);

    if (!response) return;

    commit("addTrip", { ...newTrip, id: response.name });
    dispatch("setTrip", response.name);

    router.replace(`/trip/${response.name}`);
  },

  // @todo delete everything that reference the chosen trip. Gief Foreign keys..
  async deleteTrip({ commit, rootGetters, getters }, tripId) {
    const idToken = rootGetters.idToken;
    const userId = rootGetters.userId;

    if (!idToken || !userId) {
      alert("Hmm, something is missing. Try again!");
      return;
    }

    const response = await axios
      .delete(`/trips/${tripId}.json?auth=${idToken}`)
      .then(res => res.data);

    const trips = getters.getTrips.filter(trip => trip.id !== tripId);

    commit("storeTrips", trips);

    router.replace(`/trips`);
  },

  setTrip({ commit, state }, tripId) {
    const trip = state.trips.find(item => item.id === tripId);
    commit("setTrip", trip);
  }
};
