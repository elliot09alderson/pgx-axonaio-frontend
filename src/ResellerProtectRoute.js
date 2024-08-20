import { Navigate, Outlet } from "react-router-dom";
const ResellerProtectRoute = ({ isReseller }) => {
  // console.log(isLogin);
  if (!isReseller) {
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
};

export default ResellerProtectRoute;
