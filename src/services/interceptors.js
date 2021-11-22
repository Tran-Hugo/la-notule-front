import axios from "axios";
import store from "../store";
import router from "../router";
import configHelper from "../helpers/configHeader";

export default () => {
  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      const originalConfig = err.config;
      if (originalConfig.url !== configHelper.domain + "/api/login") {
        if (
          err.response.status === 401 &&
          err.response.data.message === "Expired JWT Token"
        ) {
          let refreshToken = {
            refresh_token: store.state.loginModule.refreshToken,
          };
          axios
            .post(configHelper.domain + "/api/token/refresh", refreshToken)
            .then((res) => {
              console.log(res);
              store.commit("SET_TOKEN", res.data.token);
              localStorage.setItem("token", res.data.token);
              if (
                router.currentRoute._value.fullPath.substring(0, 6) == "/admin"
              ) {
                alert("veuillez cliquer à nouveau s'il vous plait");
              } else {
                router.push({ name: store.getters.getPath });
              }
            });
        }
      }
      return Promise.reject(err);
    }
  );
};
