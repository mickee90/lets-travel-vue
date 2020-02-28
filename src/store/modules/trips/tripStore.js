import { mutations } from './tripMutations'
import { actions } from './tripActions'
import { getters } from './tripGetters'

const getInitState = () => {
  return { trips: [], trip: {}, tripImages: [] };
};

export const tripStore = {
  namespace: true,
  state: getInitState(),
  mutations,
  actions,
  getters
};
