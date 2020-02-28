import { mutations } from './bucketlistMutations'
import { actions } from './bucketlistActions'
import { getters } from './bucketlistGetters'

const getInitState = () => {
  return { bucketlistItems: [] };
};

export const bucketlistStore = {
  namespaced: true,
  state: getInitState(),
  mutations,
  actions,
  getters
};
