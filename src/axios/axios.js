import axios from "axios";

const instance = axios.create({
  baseURL: "https://learn-every-day-vue.firebaseio.com"
});

// common adds headers on every request
//axios.defaults.headers.common['Authorization'] = 'something';

// get adds headers to only get requests
instance.defaults.headers.get["Accepts"] = "application/json";

export default instance;

// interceptors is like a middleware, and a way to intercept each request to change it.
// Important to return the config to continue
/* const reqInterceptor = axios.interceptors.request.use(config => {
  console.log('request interceptor ', config);

  return config;
});

// Same as above, but for response
const resInterceptor = axios.interceptors.response.use(res => {
  console.log('response interceptor ', res);

  return res;
}); */

// eject removes the behavior of the interceptors provided
/* axios.interceptors.request.eject(reqInterceptor);
axios.interceptors.request.eject(resInterceptor); */
