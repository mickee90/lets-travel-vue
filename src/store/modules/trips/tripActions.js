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
            .get("/trips.json" + "?auth=" + idToken)
            .then(res => res)
            .catch(error => console.log(error));

        if (response === null || response === undefined) {
            return [];
        }

        const data = response.data;
        const trips = Object.keys(data);

        const updateTripImages = trips => {
            return Promise.all(
                trips.map(async trip => {
                    const image = await dispatch("fetchTripImage", data[trip].imageId);

                    return { ...data[trip], id: trip, image: image };
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
        return axios
            .get(
                `/tripImages.json?auth=${idToken}&orderBy="$key"&startAt="${tripImageId}"&limitToFirst=1`
            )
            .then(res => res)
            .catch(error => console.log(error));
    },

    fetchTripImages({ commit, rootGetters }) {
        const idToken = rootGetters.idToken;
        const tempImages = axios
            .get(`/tripImages.json?auth=${idToken}`)
            .then(res => res)
            .catch(error => console.log(error));

        const images = Object.keys(tempImages).map(imageId => {
            return { ...tempImages[imageId], id: imageId };
        });

        commit("storeTripImages", images);
    },

    editTrip({ commit, state, rootGetters }, payload) {
        const idToken = rootGetters.idToken;
        const userId = rootGetters.userId;

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

    storeTrip({ commit, state, rootGetters }, payload) {
        const idToken = rootGetters.idToken;
        const userId = rootGetters.userId;

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
}