import { mutations } from './authMutations'
import { actions } from './authActions'
import { getters } from './authGetters'

const getInitState = () => {
  return { idToken: null, userId: null, expirationDate: null, user: null };
};

export const authStore = {
  state: getInitState(),
  mutations,
  actions,
  getters
};
