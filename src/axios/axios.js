import axios from "axios";
import router from "../router/index";
/* import store from "../store/store.js"; */

const instance = axios.create({
  baseURL: "https://learn-every-day-vue.firebaseio.com"
});

instance.defaults.headers.get["Accepts"] = "application/json";

/* instance.interceptors.request.use(
  config => {
    const idToken = store.getters.idToken;
    const userId = store.getters.userId;
    
    console.log(idToken);
    console.log(userId);

    if (!idToken || !userId) {
      alert("Hmm, something is missing. Try again!");
      return;
    }

    config.params = config.params || {};
    config.params["auth"] = idToken;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
); */

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      router.replace("/login");
    }

    return Promise.reject(error);
  }
);

export default instance;
