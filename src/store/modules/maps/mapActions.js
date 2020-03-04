import axios from "../../../axios/axios";
import { v4 as uuidv4 } from "uuid";

export const actions = {
  async storeMarker({ commit, rootGetters }, marker) {
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

    await axios
      .post(`/mapMarkers.json?auth=${tokenId}`, newMarker)
      .catch(err => console.log(err));

    commit("addMarker", newMarker);
  },
  async fetchMarkers({ commit, rootGetters }) {
    const tokenId = rootGetters.idToken;
    const userId = rootGetters.userId;
    const tripId = rootGetters.getTrip.id;

    if (tokenId === undefined || userId === undefined || tripId === undefined) {
      alert("Something went wrong. Try again!");
      return false;
    }

    const response = await axios
      .get(
        `/mapMarkers.json?auth=${tokenId}&orderBy="tripId"&equalTo="${tripId}"`
      )
      .catch(err => console.log(err));

    const tempMarkers = response.data;

    const markers = Object.keys(tempMarkers).map(markerId => {
      return { ...tempMarkers[markerId] };
    });

    commit("storeMarkers", markers);
  }
};
