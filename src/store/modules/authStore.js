import axios from "../../axios/axios";
import axiosAuth from "../../axios/axiosAuth";

import router from "../../router/index";

const getInitState = () => {
  return { idToken: null, userId: null, expirationDate: null, user: null };
};

export const authStore = {
  state: getInitState(),
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.idToken;
      state.userId = userData.userId;
      state.expirationDate = userData.expirationDate;
    },
    setUser(state, user) {
      state.user = user;
    },
    storeUser(state, user) {
      state.user = user;
    },
    resetState(state) {
      Object.assign(state, getInitState());
    }
  },
  actions: {
    setLogoutTimer({ commit, dispatch }, expirationTime) {
      setTimeout(() => {
        dispatch("logout");
      }, expirationTime * 1000);
    },
    register({ commit, dispatch }, payload) {
      axiosAuth
        .post(":signUp?key=" + process.env.VUE_APP_FIREBASE_API_KEY, {
          email: payload.username,
          password: payload.password,
          returnSecureToken: true
        })
        .then(res => {
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + res.data.expiresIn * 1000
          );

          commit("authUser", {
            idToken: res.data.idToken,
            userId: res.data.localId,
            expirationDate
          });

          const newUser = {
            userId: res.data.localId,
            firstName: payload.firstName,
            lastName: payload.lastName,
            username: payload.username
          };

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
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + res.data.expiresIn * 1000
          );

          commit("authUser", {
            idToken: res.data.idToken,
            userId: res.data.localId,
            expirationDate
          });
          dispatch("setLogoutTimer", res.data.expiresIn);
          dispatch("fetchUser", payload);
          dispatch("fetchTripImages");
          router.replace("/trips");
        });
    },
    tryAutoLogin({ commit, state }) {
      const idToken = state.idToken;
      if (!idToken) {
        return;
      }

      const expirationDate = state.expirationDate;
      const now = new Date();
      if (!expirationDate || now <= expirationDate) {
        return;
      }

      const userId = state.userId;
      commit("authUser", {
        idToken: idToken,
        userId: userId,
        expirationDate
      });

      /* router.replace("/login"); */
    },
    logout({ commit, dispatch }) {
      dispatch("resetAllStates");
      router.replace("/login");
    },
    fetchUser({ commit, state }, payload) {
      if (!state.idToken) {
        return;
      }
      axios
        .get(
          `/users.json?auth=${state.idToken}&orderBy="username"&equalTo="${payload.username}"`
        )
        .then(res => {
          const user = res.data[Object.keys(res.data)[0]];
          if (user.username) {
            commit("setUser", user);
          }
        })
        .catch(error => console.log(error));
    },
    storeUser({ commit, state }, payload) {
      if (!state.idToken) {
        return;
      }
      axios
        .post(`/users.json?auth=${state.idToken}`, payload)
        .then(res => {
          router.replace("/trips");
        })
        .catch(error => console.log(error));
    }
    /* validateAuth({ getters }) {
      const idToken = getters.idToken;
      const userId = getters.userId;

      if (!idToken || !userId) {
        alert("Hmm, something is missing. Try again!");
        return;
      }

      return { idToken, userId };
    } */
  },
  getters: {
    user(state) {
      return state.user;
    },
    isAuthenticated(state) {
      return state.idToken !== null;
      //return state.idToken !== null;
    },
    idToken(state) {
      return state.idToken;
    },
    userId(state) {
      return state.userId;
    },
    expirationDate(state) {
      return state.expirationDate;
    }
  }
};
