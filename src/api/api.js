import axios from "axios";
// console.log(process.env.NODE_ENV);

let TOKEN = localStorage.getItem("is_logged_in");

const url =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_SERVER_URL_DEVELOPMENT
    : process.env.REACT_APP_SERVER_URL_PRODUCTION;
console.log("backend is running on ", url);

export const BASE_URL = `${process.env.REACT_APP_SERVER_URL}/api/v1`;

const api = axios.create({
  baseURL: BASE_URL,
  // headers: { token: `Bearer ${TOKEN}` },
});
const getToken = () => localStorage.getItem("is_logged_in");
api.interceptors.request.use(
  (request) => {
    const token = getToken();
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    // console.log("Request Headers:", request.headers);
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
