import { Navigate, Outlet } from "react-router-dom";
const ResellerProtector = ({ isReseller }) => {
  // console.log(isLogin);
  if (!isReseller) {
    return <Navigate to={"/reseller404"} />;
  }
  return <Outlet />;
};

export default ResellerProtector;
