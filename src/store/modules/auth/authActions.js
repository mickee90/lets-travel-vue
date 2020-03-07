import axios from "../../../axios/axios";
import axiosAuth from "../../../axios/axiosAuth";

import router from "../../../router/index";

const generateExpirationDate = expiresIn => {
  const now = new Date();
  return new Date(now.getTime() + expiresIn * 1000);
};

export const actions = {
  setLogoutTimer({ commit, dispatch }, expirationTime) {
    setTimeout(() => {
      dispatch("logout");
    }, expirationTime * 1000);
  },

  async register({ commit, dispatch }, payload) {
    const response = await axiosAuth
      .post(":signUp?key=" + process.env.VUE_APP_FIREBASE_API_KEY, {
        email: payload.username,
        password: payload.password,
        returnSecureToken: true
      })
      .then(res => res.data)
      .catch(error => {
        console.log(error);
        if (error.message === "EMAIL_EXISTS") {
          alert("The username already exists");
        }
      });

    if (!response) return;

    commit("authUser", {
      idToken: response.idToken,
      userId: response.localId,
      expirationDate: generateExpirationDate(response.expiresIn),
      refreshToken: response.refreshToken
    });

    const newUser = {
      userId: response.localId,
      firstName: payload.firstName,
      lastName: payload.lastName,
      username: payload.username
    };

    dispatch("storeUser", newUser);
    dispatch("setLogoutTimer", response.expiresIn);
  },

  async changePassword({ state, commit, dispatch }, password) {
    const idToken = state.idToken;

    if (!idToken) {
      return;
    }

    const response = await axiosAuth
      .post(":update?key=" + process.env.VUE_APP_FIREBASE_API_KEY, {
        idToken,
        password,
        returnSecureToken: true
      })
      .then(res => res.data)
      .catch(err => alert(err.message));

    if (!response) return false;

    commit("authUser", {
      idToken: response.idToken,
      userId: response.localId,
      expirationDate: generateExpirationDate(response.expiresIn),
      refreshToken: response.refreshToken
    });

    return response;
  },

  async login({ commit, dispatch }, payload) {
    const response = await axiosAuth
      .post(":signInWithPassword?key=" + process.env.VUE_APP_FIREBASE_API_KEY, {
        email: payload.username,
        password: payload.password,
        returnSecureToken: true
      })
      .then(res => res.data)
      .catch(err => alert(err.message));

    if (!response) return false;

    commit("authUser", {
      idToken: response.idToken,
      userId: response.localId,
      expirationDate: generateExpirationDate(response.expiresIn),
      refreshToken: response.refreshToken
    });

    dispatch("setLogoutTimer", response.expiresIn);
    dispatch("fetchUser", payload);
    dispatch("fetchTripImages");
    router.replace("/trips");
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
      expirationDate,
      refreshToken: state.refreshToken
    });
  },

  logout({ commit, dispatch }) {
    dispatch("resetAllStates");
    router.replace("/login");
  },

  async fetchUser({ commit, state }, payload) {
    if (!state.idToken) {
      return;
    }

    const url = `/profiles.json?auth=${state.idToken}&orderBy="username"&equalTo="${payload.username}"`;
    const response = await axios.get(url).catch(error => console.log(error));

    if (!response) return;

    const profile = response.data[Object.keys(response.data)[0]];

    if (profile.username) {
      commit("profile/storeProfile", { ...profile }, { root: true });
    }
  },

  async storeUser({ commit, state }, payload) {
    if (!state.idToken) {
      return;
    }

    const response = await axios
      .post(`/profiles.json?auth=${state.idToken}`, payload)
      .catch(error => console.log(error));

    if (!response) return;

    commit("profile/storeProfile", { ...payload }, { root: true });
    router.replace("/trips");
  }
};
