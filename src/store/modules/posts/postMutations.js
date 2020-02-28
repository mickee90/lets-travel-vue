export const mutations = {
    storePost(state, data) {
        state.post = data;
    },
    storePosts(state, data) {
        state.posts = data.reverse();
    },
    addPost(state, data) {
        state.posts.unshift(data);
    },
    resetState(state) {
        Object.assign(state, getInitState());
    }
}