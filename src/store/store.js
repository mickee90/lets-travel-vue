import Vue from "vue";
import Vuex from "vuex";
import VuexPersistance from "vuex-persist";

import { authStore } from "./modules/authStore";
import { tripStore } from "./modules/tripStore.js";
import { postStore } from "./modules/postStore.js";
import { checklistStore } from "./modules/checklistStore.js";
import { bucketListStore } from "./modules/bucketListStore.js";
import { budgetStore } from "./modules/budgetStore.js";

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
    bucketList: bucketListStore,
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
