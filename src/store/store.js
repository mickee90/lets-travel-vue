import Vue from "vue";
import Vuex from "vuex";
import { tripStore } from "./modules/tripStore.js";
import { postStore } from "./modules/postStore.js";
import { checklistStore } from "./modules/checklistStore.js";
import { bucketListStore } from "./modules/bucketListStore.js";
import { budgetStore } from "./modules/budgetStore.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    trips: tripStore,
    posts: postStore,
    checklist: checklistStore,
    bucketList: bucketListStore,
    budget: budgetStore
  }
});
