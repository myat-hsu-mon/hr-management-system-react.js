import axios from "axios";
import store from "store/";

const headerOptions = {
  "Content-Type": "application/json",
  accept: "*/*",
  "Access-Controll-Allow-Origin": "*",
};

export const service = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  headers: headerOptions,
});

service.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  function (config) {
    return config;
  },
  function (error) {
    console.log("interceptor error", error.toJSON());
    if (error?.response) {
      const {
        status,
        data: { message },
      } = error.response;
      console.log(error.response);
      if (status >= 400 && status < 500) {
        if (status === 401 || status === 403) {
          store.dispatch({
            type: "user/signOut",
          });
        }
      }
    }
    return Promise.reject(error);
  }
);
