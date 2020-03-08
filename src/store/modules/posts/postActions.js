import router from "../../../router/index";
import axios from "../../../axios/axios";

export const actions = {
  async fetchPost({ commit, rootGetters }, id) {
    const idToken = rootGetters.idToken;
    const userId = rootGetters.userId;

    if (!idToken || !userId) {
      alert("Hmm, something is missing. Try again!");
      return;
    }

    const response = await axios
      .get(`/posts/${id}.json?auth=${idToken}`)
      .then(res => res.data);

    if (!response) return;

    commit("storePost", { ...response });
  },

  async fetchPosts({ commit, getters, rootGetters }, tripId) {
    const idToken = rootGetters.idToken;
    const userId = rootGetters.userId;

    if (!idToken || !userId) {
      alert("Hmm, something is missing. Try again!");
      return;
    }

    const response = await axios
      .get(`/posts.json?auth=${idToken}&orderBy="tripId"&equalTo="${tripId}"`)
      .then(res => res.data);

    if (!response) return;

    const posts = Object.keys(response).map(postId => {
      return { ...response[postId], id: postId };
    });

    commit("storePosts", posts);

    return getters.getPosts;
  },

  async createPost({ commit, rootGetters }, data) {
    const idToken = rootGetters.idToken;
    const userId = rootGetters.userId;

    if (!idToken || !userId) {
      alert("Hmm, something is missing. Try again!");
      return;
    }

    const response = await axios
      .post(`/posts.json?auth=${idToken}`, data)
      .then(res => res.data);

    if (!response) return;

    commit("addPost", response);
  },

  async editPost({ state, commit, rootGetters }, updatedPost) {
    const idToken = rootGetters.idToken;
    const userId = rootGetters.userId;

    if (!idToken || !userId) {
      alert("Hmm, something is missing. Try again!");
      return;
    }

    const response = await axios
      .put(`/posts/${updatedPost.id}.json?auth=${idToken}`, updatedPost)
      .then(res => res.data);

    if (!response) return;

    const posts = [...state.posts].map(item =>
      item.id !== updatedPost.id ? item : { ...item, ...updatedPost }
    );

    commit("storePosts", posts);
    commit("storePost", response);

    router.replace(`/${response.tripId}/post/${response.id}`);
  }
};
