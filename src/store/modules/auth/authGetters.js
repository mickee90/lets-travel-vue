export const getters = {
    user(state) {
        return state.user;
    },
    isAuthenticated(state) {
        return state.idToken !== null;
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