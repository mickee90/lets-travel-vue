import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import Vuelidate from "vuelidate";
import * as VueGoogleMaps from "vue2-google-maps";

import TabBar from "@/views/layout/TabBar.vue";
import Spinner from "./components/UI/Spinner";

import router from "./router";
import store from "./store/store";

Vue.use(Vuelidate);

Vue.component("TabBar", TabBar);
Vue.component("Spinner", Spinner);

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
    libraries: "places"
  },
  installComponents: true
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
