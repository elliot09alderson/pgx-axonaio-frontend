import api from "../../api/api";
import { USER_LOGGED_IN, USER_LOGGED_OUT, SET_LOADING } from "../constants";

export const validateToken = async (token) => {
  const response = await api.get("/user/validate", {
    method: "GET",
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    return false;
  }
  const data = await response.json();
  return data.isValid; // Assuming the backend returns { isValid: true/false }
};

const token = localStorage.getItem("is_logged_in");
const isValidToken = validateToken(token);

const initialState = {
  // loggedIn: false,
  loading: true,
  loggedIn: isValidToken,
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOGGED_IN:
      return { ...state, loggedIn: true, loading: false };
    case USER_LOGGED_OUT:
      localStorage.removeItem("is_logged_in");
      return { ...state, loggedIn: false, loading: false };
    case SET_LOADING:
      return { ...state, loading: payload };
    default:
      return state;
  }
};
