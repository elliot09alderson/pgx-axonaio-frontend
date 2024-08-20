import { Navigate, Outlet } from "react-router-dom";
const ResellerAdminProtect = ({ isResellerAdmin }) => {
  // console.log(isLogin);
  if (!isResellerAdmin) {
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
};

export default ResellerAdminProtect;
