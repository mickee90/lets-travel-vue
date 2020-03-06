import { mutations } from "./profileMutations";
import { actions } from "./profileActions";
import { getters } from "./profileGetters";

const getInitState = () => {
  return {
    profile: {
      userId: null,
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      address: "",
      city: "",
      zipcode: "",
      country: "",
      birthday: "",
      avatar: null
    }
  };
};

export const profileStore = {
  namespaced: true,
  state: getInitState(),
  mutations,
  actions,
  getters
};
