import { mutations } from "./mapMutations";
import { actions } from "./mapActions";
import { getters } from "./mapGetters";

const getInitState = () => {
  return { markers: [] };
};

export const mapStore = {
  namespaced: true,
  state: getInitState(),
  mutations,
  actions,
  getters
};
