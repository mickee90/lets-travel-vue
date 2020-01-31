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
        dispatch('logout')
      }, expirationTime * 1000);
    },
    signup({ commit, dispatch }, payload) {
      /* axios
        .post(":signUp?key=AIzaSyBP0-FsmOaNxLVynQgiD-5Vt2w0pc7SrjE", {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
        .then(res => {
          console.log(res);
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          });
          const now = new Date();
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);

          localStorage.setItem('idToken', res.data.idToken);
          localStorage.setItem('userId', res.data.localId);
          localStorage.setItem('expirationDate', expirationDate);

          dispatch('storeUser', authData)
          dispatch('setLogoutTimer', res.data.expiresIn)
        })
        .catch(error => console.log(error)); */
    },
    login({ commit, dispatch }, payload) {
      /* axios
        .post(
          ":signInWithPassword?key=AIzaSyBP0-FsmOaNxLVynQgiD-5Vt2w0pc7SrjE",
          {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
          }
        )
        .then(res => {
          console.log(res);

          const now = new Date();
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);

          localStorage.setItem('idToken', res.data.idToken);
          localStorage.setItem('userId', res.data.localId);
          localStorage.setItem('expirationDate', expirationDate);

          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          })
          dispatch('setLogoutTimer', res.data.expiresIn)
          router.replace('/dashboard')
        }) */
    },
    tryAutoLogin({ commit }) {
      const idToken = localStorage.getItem('idToken');
      if (!idToken) {
        return;
      }

      const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date();
      if (!expirationDate || now <= expirationDate) {
        return;
      }

      const userId = localStorage.getItem('userId');
      commit('authUser', {
        token: idToken,
        userId: userId
      })

      router.replace('/signin')
    },
    logout({ commit }) {
      commit('clearAuthData')

      localStorage.removeItem('idToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('expirationDate');

      router.replace('/signin')
    },
    fetchUser({ commit, state }) {
      if (!state.idToken) {
        return;
      }
      /* axios
        .get("/users.json" + '?auth=' + state.idToken)
        .then(res => {
          console.log(res);
          const data = res.data;

          const users = [];
          for (let key in data) {
            const user = data[key];
            user.id = key;
            users.push(user);
          }

          console.log(users);

          commit('storeUser', users[0])
        })
        .catch(error => console.log(error)); */
    },
    storeUser({ commit, state }, userData) {
      if (!state.idToken) {
        return;
      }
      /* axios.post('/users.json' + '?auth=' + state.idToken, userData)
        .then(res => console.log(res))
        .catch(error => console.log(error)) */
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    isAuthenticated(state) {
      return state.idToken !== null;
    }
  }
};
