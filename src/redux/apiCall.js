import { publicRequest } from "../utils/requestMethod";
import { loginStart, loginSuccess, loginFailure } from "./userRedux";

export const login = async (dispatch, user) => {
  loginStart();
  try {
    const res = await publicRequest.post("/user/login", user);

    if (!res.data.isBasic) {
      console.log("isBAsic", res.data.isBasic);
    }

    localStorage.setItem("is_logged_in", res.data.token);
    dispatch(loginSuccess(res.data));

    console.log(
      "after storing to backend ",
      localStorage.getItem("is_logged_in")
    );

    return res.data;
  } catch (error) {
    dispatch(loginFailure());
    return error.response.data;
  }
};
