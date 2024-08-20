import axios from "axios";

let TOKEN = localStorage.getItem("is_logged_in");

export const passToken = (token) => {
  TOKEN = TOKEN || token;
};
export const BASE_URL = `${process.env.REACT_APP_SERVER_URL}/api/v1`;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
const getToken = () => localStorage.getItem("is_logged_in");

export const userRequest = axios.create({
  baseURL: BASE_URL,
  // headers: { token: `Bearer ${TOKEN}` },
});
userRequest.interceptors.request.use(
  (request) => {
    const token = getToken();
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Request Headers:", request.headers);
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
