import axios from "../../axios/axios";

const getInitState = () => {
  return { posts: [] };
};

export const postStore = {
  state: getInitState(),
  mutations: {
    storePosts(state, data) {
      state.posts = data.reverse();
    },
    addPost(state, data) {
      state.posts.unshift(data);
    },
    resetState(state) {
      Object.assign(state, getInitState());
    }
  },
  actions: {
    async fetchPosts({ commit, getters }, tripId) {
      const idToken = getters.idToken;
      const userId = getters.userId;

      if (!idToken || !userId) {
        alert("Hmm, something is missing. Try again!");
        return;
      }

      const response = await axios
        .get(`/posts.json?auth=${idToken}&orderBy="tripId"&equalTo="${tripId}"`)
        .then(res => res)
        .catch(error => console.log(error));

      const tempPosts = response.data;

      const posts = Object.keys(tempPosts).map(postId => {
        return { ...tempPosts[postId], id: postId };
      });

      commit("storePosts", posts);

      return getters.getPosts;
    },
    storePosts({ commit }, data) {
      commit("storePosts", data);
    },
    async createPost({ commit, getters }, data) {
      const idToken = getters.idToken;
      const userId = getters.userId;

      if (!idToken || !userId) {
        alert("Hmm, something is missing. Try again!");
        return;
      }

      const response = await axios
        .post(`/posts.json?auth=${idToken}`, data)
        .then(res => res)
        .catch(error => console.log(error));

      commit("addPost", response.data);
    }
  },
  getters: {
    getPosts(state) {
      return state.posts;
    }
  }
};
