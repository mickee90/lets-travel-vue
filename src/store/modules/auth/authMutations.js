export const mutations = {
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
}