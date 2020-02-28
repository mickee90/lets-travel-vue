import Vue from "vue";
import Vuex from "vuex";
import VuexPersistance from "vuex-persist";

import { authStore } from "./modules/auth/authStore";
import { tripStore } from "./modules/trips/tripStore";
import { postStore } from "./modules/posts/postStore";
import { checklistStore } from "./modules/checklists/checklistStore";
import { bucketlistStore } from "./modules/bucketlists/bucketlistStore";
import { budgetStore } from "./modules/budgets/budgetStore";

const VuexPersist = new VuexPersistance({
  key: "vuex-lt",
  storage: window.localStorage
});

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: authStore,
    trips: tripStore,
    posts: postStore,
    checklist: checklistStore,
    bucketlist: bucketlistStore,
    budget: budgetStore
  },
  actions: {
    resetAllStates({ commit }) {
      // Calls resetState for each module who has it declared. (All modules at the moment)
      commit("resetState");
    }
  },
  plugins: [VuexPersist.plugin]
});
