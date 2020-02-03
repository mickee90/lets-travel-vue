import axios from "../../axios/axios";
import axiosAuth from "../../axios/axiosAuth";

import router from "../../router/index";

export const authStore = {
  state: {
    idToken: null,
    userId: null,
    user: null
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token;
      state.userId = userData.userId;
    },
    setUser(state, user) {
      state.user = user;
    },
    storeUser(state, user) {
      state.user = user;
    },
    clearAuthData(state) {
      state.idToken = null;
      state.userId = null;
    }
  },
  actions: {
    setLogoutTimer({ commit, dispatch }, expirationTime) {
      setTimeout(() => {
        dispatch("logout");
      }, expirationTime * 1000);
    },
    register({ commit, dispatch }, payload) {
      console.log(payload);

      axiosAuth
        .post(":signUp?key=" + process.env.VUE_APP_FIREBASE_API_KEY, {
          email: payload.username,
          password: payload.password,
          returnSecureToken: true
        })
        .then(res => {
          console.log(res);
          commit("authUser", {
            token: res.data.idToken,
            userId: res.data.localId
          });

          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + res.data.expiresIn * 1000
          );

          localStorage.setItem("idToken", res.data.idToken);
          localStorage.setItem("userId", res.data.localId);
          localStorage.setItem("expirationDate", expirationDate);

          const newUser = {
            userId: res.data.localId,
            firstName: payload.firstName,
            lastName: payload.lastName,
            username: payload.username
          };
          console.log(newUser);

          dispatch("storeUser", newUser);
          dispatch("setLogoutTimer", res.data.expiresIn);
        })
        .catch(error => {
          console.log(error);
          if (error.message === "EMAIL_EXISTS") {
            alert("The username already exists");
          }
        });
    },
    login({ commit, dispatch }, payload) {
      axiosAuth
        .post(
          ":signInWithPassword?key=" + process.env.VUE_APP_FIREBASE_API_KEY,
          {
            email: payload.username,
            password: payload.password,
            returnSecureToken: true
          }
        )
        .then(res => {
          console.log(res);

          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + res.data.expiresIn * 1000
          );

          localStorage.setItem("idToken", res.data.idToken);
          localStorage.setItem("userId", res.data.localId);
          localStorage.setItem("expirationDate", expirationDate);

          commit("authUser", {
            token: res.data.idToken,
            userId: res.data.localId
          });
          dispatch("setLogoutTimer", res.data.expiresIn);
          dispatch("fetchUser", payload);
          router.replace("/trips");
        });
    },
    tryAutoLogin({ commit }) {
      const idToken = localStorage.getItem("idToken");
      if (!idToken) {
        return;
      }

      const expirationDate = localStorage.getItem("expirationDate");
      const now = new Date();
      if (!expirationDate || now <= expirationDate) {
        return;
      }

      const userId = localStorage.getItem("userId");
      commit("authUser", {
        token: idToken,
        userId: userId
      });

      router.replace("/signin");
    },
    logout({ commit }) {
      commit("clearAuthData");

      localStorage.removeItem("idToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("expirationDate");

      router.replace("/login");
    },
    fetchUser({ commit, state }, payload) {
      console.log("fetchUser ", payload);

      if (!state.idToken) {
        return;
      }
      axios
        .get(
          `/users.json?auth=${state.idToken}&orderBy="username"&equalTo="${payload.username}"`
        )
        .then(res => {
          const user = res.data[Object.keys(res.data)[0]];
          console.log(user);

          if (user.username) {
            commit("setUser", user);
          }
        })
        .catch(error => console.log(error));
    },
    storeUser({ commit, state }, payload) {
      console.log(payload);

      if (!state.idToken) {
        return;
      }
      axios
        .post("/users.json" + "?auth=" + state.idToken, payload)
        .then(res => {
          console.log(res);
          router.replace("/trips");
        })
        .catch(error => console.log(error));
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    isAuthenticated(state) {
      return localStorage.getItem("idToken") !== null;
      //return state.idToken !== null;
    },
    idToken(state) {
      return state.idToken;
    }
  }
};
