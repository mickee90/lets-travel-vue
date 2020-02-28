import axios from "../../../axios/axios";

export const actions = {
    storeBucketlistItems({ commit }, data) {
        commit("storeBucketlistItems", data);
    },
    async fetchBucketlistItems({ commit, rootGetters }, tripId) {
        const idToken = rootGetters.idToken;
        const userId = rootGetters.userId;

        if (!idToken || !userId) {
            alert("Hmm, something is missing. Try again!");
            return;
        }

        const response = await axios
            .get(
                `/bucketlists.json?auth=${idToken}&orderBy="tripId"&equalTo="${tripId}"`
            )
            .then(res => res)
            .catch(error => console.log(error));

        const tempItems = response.data;

        const items = Object.keys(tempItems).map(bucketlistId => {
            return { ...tempItems[bucketlistId], id: bucketlistId };
        });

        commit("storeBucketlistItems", items);
    },
    async createBucketlistItems({ commit, state, rootGetters }, title) {

        const idToken = rootGetters.idToken;
        const userId = rootGetters.userId;

        if (!idToken || !userId) {
            alert("Hmm, something is missing. Try again!");
            return;
        }

        const lastItem = state.bucketlistItems[state.bucketlistItems.length - 1];

        const newItem = {
            tripId: rootGetters.getTrip.id,
            order: lastItem ? lastItem.order++ : 1,
            title: title,
            completed: false,
            completed_at: new Date().toISOString().split("T")[0]
        };

        await axios
            .post(`/bucketlists.json?auth=${idToken}`, newItem)
            .then(res => {
                commit("addBucketlistItems", { ...newItem, id: res.data.name });
            })
            .catch(error => console.log(error));
    },
    async deleteBucketlistItem({ commit, getters, rootGetters }, id) {
        const idToken = rootGetters.idToken;
        const userId = rootGetters.userId;

        if (!idToken || !userId) {
            alert("Hmm, something is missing. Try again!");
            return;
        }
        const response = await axios
            .delete(`/bucketlists/${id}.json?auth=${idToken}`)
            .then(res => res.data)
            .catch(error => console.log(error));

        console.log(response);

        const index = getters.getBucketlistItems.findIndex(
            item => item.id === id
        );

        commit("deleteBucketlistItem", index);
    }
}