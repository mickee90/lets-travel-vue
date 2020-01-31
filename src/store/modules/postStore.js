export const postStore = {
  state: {
    posts: []
  },
  mutations: {
    storePosts(state, data) {
      state.posts = data;
    },
    addPost(state, data) {
      state.posts.push(data);
    }
  },
  actions: {
    storePosts({ commit }, data) {
      commit("storePosts", data);
    },
    storePost({ commit, state }, data) {
      commit("addPost", data);
    }
  },
  getters: {
    getPosts(state) {
      return state.posts;
    }
  }
};
