const axios = require("axios");

export default class AxiosClient {
  static client() {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwt"),
      AdaptiveWorkspace: localStorage.getItem("workspace.id"),
    };

    axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        let originalRequest = error.config;
        let refreshToken = localStorage.getItem("refreshToken");
        let userID = localStorage.getItem("userID");
        let jwt = localStorage.getItem("jwt");

        if (
          error != null &&
          error.response != null &&
          error.response.status === 401 &&
          !originalRequest._retry &&
          refreshToken != null &&
          userID != null
        ) {
          originalRequest._retry = true;

          return axios
            .get(
              "/api/user/refresh?refresh_token=" +
                refreshToken +
                "&user_id=" +
                userID
            )
            .then((response) => response.data)
            .then((data) => {
              localStorage.setItem("jwt", data);
              localStorage.setItem("ts", new Date());

              originalRequest.headers = {
                "Content-Type": "application/json",
                Authorization: "Bearer " + data,
              };

              return axios.request(originalRequest);
            });

          //fetch
        } else if (error.response.status == 403) {
          let accessToken = localStorage.removeItem("jwt");
          let refreshToken = localStorage.removeItem("refreshToken");
          let userID = localStorage.removeItem("userID");

          history.push("/");
        } else {
          return Promise.reject(error);
        }
      }
    );

    return axios;
  }
}
