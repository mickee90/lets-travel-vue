import { mutations } from "./postMutations";
import { actions } from "./postActions";
import { getters } from "./postGetters";

const getInitState = () => {
  return { post: {}, posts: [] };
};

export const postStore = {
  namespaced: true,
  state: getInitState(),
  mutations,
  actions,
  getters
};
