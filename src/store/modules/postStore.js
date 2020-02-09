const getInitState = () => {
  return { posts: [] };
};

export const postStore = {
  state: getInitState(),
  mutations: {
    storePosts(state, data) {
      state.posts = data;
    },
    addPost(state, data) {
      state.posts.push(data);
    },
    resetState(state) {
      Object.assign(state, getInitState());
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
