import { loginFailure } from "../redux/userRedux";

export const onFailure = (error, dispatch) => {
  if (error?.response?.data?.isAuth) {
    localStorage.removeItem("is_logged_in");
    dispatch(loginFailure());
  }
  if (!error?.response?.data?.status) {
    return true;
  }
  return null;
};

export default onFailure;
