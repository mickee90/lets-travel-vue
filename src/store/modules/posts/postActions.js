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

        await axios
            .get(`/posts/${id}.json?auth=${idToken}`)
            .then(res => {
                commit("storePost", { ...res.data });
            })
            .catch(error => console.log(error));
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

    async createPost({ commit, rootGetters }, data) {
        const idToken = rootGetters.idToken;
        const userId = rootGetters.userId;

        if (!idToken || !userId) {
            alert("Hmm, something is missing. Try again!");
            return;
        }

        const response = await axios
            .post(`/posts.json?auth=${idToken}`, data)
            .then(res => res)
            .catch(error => console.log(error));

        commit("addPost", response.data);
    },

    async editPost({ state, commit, rootGetters }, updatedPost) {
        const idToken = rootGetters.idToken;
        const userId = rootGetters.userId;

        if (!idToken || !userId) {
            alert("Hmm, something is missing. Try again!");
            return;
        }

        const post = await axios
            .put(`/posts/${updatedPost.id}.json?auth=${idToken}`, updatedPost)
            .then(res => res.data)
            .catch(error => console.log(error));

        const posts = [...state.posts].map(item =>
            item.id !== updatedPost.id ? item : { ...item, ...updatedPost }
        );

        commit("storePosts", posts);
        commit("storePost", post);

        router.replace(`/${post.tripId}/post/${post.id}`);
    }
}