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

Vue.component("tab-bar", TabBar);
Vue.component("Spinner", Spinner);

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
    libraries: "places" // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as yuu require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then set installComponents to 'false'.
  //// If you want to automatically install all the components this property must be set to 'true':
  installComponents: true
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
