export const mutations = {
    storeBucketlistItems(state, data) {
        state.bucketlistItems = data;
    },
    addBucketlistItems(state, data) {
        state.bucketlistItems.push(data);
    },
    updateBucketlistItems(state, index, data) {
        state.bucketlistItems.$set(index, data);
    },
    deleteBucketlistItem(state, index) {
        state.bucketlistItems.splice(index, 1);
    },
    resetState(state) {
        Object.assign(state, getInitState());
    }
}