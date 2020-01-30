export const postStore = {
  state: {
    posts: []
  },
  mutations: {
    storePosts(state, data) {
      state.posts = data;
    }
  },
  actions: {
    storePosts({ commit }, data) {
      commit("storePosts", data);
    }
  },
  getters: {
    getPosts(state) {
      return state.posts;
    }
  }
};
