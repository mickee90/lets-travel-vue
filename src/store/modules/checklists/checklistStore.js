import { mutations } from './checklistMutations'
import { actions } from './checklistActions'
import { getters } from './checklistGetters'

const getInitState = () => {
  return { checklistItems: [] };
};

export const checklistStore = {
  namespaced: true,
  state: getInitState(),
  mutations,
  actions,
  getters
};
