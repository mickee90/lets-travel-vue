import axios from "axios";
import router from "../router/index";

const instance = axios.create({
  baseURL: "https://learn-every-day-vue.firebaseio.com"
});

instance.defaults.headers.get["Accepts"] = "application/json";

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
