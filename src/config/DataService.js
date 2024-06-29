import axios from "axios";

var toToken = localStorage.getItem("token");
const baseUrl = "http://localhost:3000/api/";
// const API_ENDPOINT = "http://35.177.56.74:3027/api/";

const dataService = axios.create({
  // baseURL: API_ENDPOINT,
  baseURL: baseUrl,
  // headers: {
  //   "Content-type": "application/x-www-form-urlencoded",
  //   Accept: "application/json",
  // },
});

dataService.interceptors.request.use(
  (config) => {
    config.headers.auth = localStorage.getItem("token");

    return config;
  },
  (error) => {
    return error;
  }
);

export default dataService;
