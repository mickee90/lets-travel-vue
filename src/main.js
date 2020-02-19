import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import Vuelidate from "vuelidate";
import TabBar from "@/views/layout/TabBar.vue";

import router from "./router";
import store from "./store/store";

Vue.use(Vuelidate);

Vue.component("tab-bar", TabBar);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
