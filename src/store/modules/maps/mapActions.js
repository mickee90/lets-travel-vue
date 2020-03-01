import axios from "../../../axios/axios";
import { v4 as uuidv4 } from "uuid";

export const actions = {
  storeMarker({ commit, rootGetters }, marker) {
    const tokenId = rootGetters.idToken;
    const userId = rootGetters.userId;
    const tripId = rootGetters.getTrip.id;

    if (tokenId === undefined || userId === undefined || tripId === undefined) {
      alert("Something went wrong. Try again!");
      return false;
    }

    const newMarker = {
      ...marker,
      tripId,
      id: uuidv4()
    };

    axios
      .post(`/mapMarkers.json?auth=${tokenId}`, newMarker)
      .then(res => {
        commit("addMarker", newMarker);
      })
      .catch(err => console.log(err));
  },
  async fetchMarkers({ commit, rootGetters }) {
    const tokenId = rootGetters.idToken;
    const userId = rootGetters.userId;
    const tripId = rootGetters.getTrip.id;

    if (tokenId === undefined || userId === undefined || tripId === undefined) {
      alert("Something went wrong. Try again!");
      return false;
    }

    await axios
      .get(
        `/mapMarkers.json?auth=${tokenId}&orderBy="tripId"&equalTo="${tripId}"`
      )
      .then(res => {
        const tempMarkers = res.data;

        const markers = Object.keys(tempMarkers).map(markerId => {
          return { ...tempMarkers[markerId] };
        });

        commit("storeMarkers", markers);
      })
      .catch(err => console.log(err));
  }
};
