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

    const response = await axios.get(`/posts/${id}.json?auth=${idToken}`);

    commit("storePost", { ...response.data });
  },

  async fetchPosts({ commit, getters, rootGetters }, tripId) {
    const idToken = rootGetters.idToken;
    const userId = rootGetters.userId;

    if (!idToken || !userId) {
      alert("Hmm, something is missing. Try again!");
      return;
    }

    const response = await axios.get(
      `/posts.json?auth=${idToken}&orderBy="tripId"&equalTo="${tripId}"`
    );

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

  async createPost({ commit, rootGetters }, data) {
    const idToken = rootGetters.idToken;
    const userId = rootGetters.userId;

    if (!idToken || !userId) {
      alert("Hmm, something is missing. Try again!");
      return;
    }

    const response = await axios.post(`/posts.json?auth=${idToken}`, data);

    commit("addPost", response.data);
  },

  async editPost({ state, commit, rootGetters }, updatedPost) {
    const idToken = rootGetters.idToken;
    const userId = rootGetters.userId;

    if (!idToken || !userId) {
      alert("Hmm, something is missing. Try again!");
      return;
    }

    const response = await axios.put(
      `/posts/${updatedPost.id}.json?auth=${idToken}`,
      updatedPost
    );

    const post = response.data;
    console.log(post, response);

    const posts = [...state.posts].map(item =>
      item.id !== updatedPost.id ? item : { ...item, ...updatedPost }
    );

    commit("storePosts", posts);
    commit("storePost", post);

    router.replace(`/${post.tripId}/post/${post.id}`);
  }
};
