import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = ({ isLogin }) => {
  // console.log(isLogin);
  if (!isLogin) {
    return <Navigate to={"/merchants/onboarding"} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
