import {
  Route,
  Routes,
  BrowserRouter as Router,
  useNavigate,
  redirect,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import axios from "axios";
import platform from "platform";
import { useSnackbar } from "notistack";
import MainComponentPage from "./Pages/BusinessForm/MainFormPage";
import { useDispatch, useSelector } from "react-redux";
import PaymentForm from "./components/Layout/PaymentFormLayout";
import ProtectedRoute from "./ProtectedRoute";
import DBC from "./Pages/DBC";
import Reseller404 from "./Reseller404";
import RDBC from "./Pages/RDBC";
import ResellerProtectRoute from "./ResellerProtectRoute";
import "./App.css";
import RADBC from "./Pages/ResellerAdmin/RADBC";
import ResellerAdminProtect from "./ResellerAdminProtect";
import IdleTimer from "./utils/Timeout/IdleTimer";
import { loginFailure } from "./redux/userRedux";

// **** Lazy Imports ****
const LoginPage = lazy(() => import("./Pages/LoginPage"));
const ResetPassword = lazy(() => import("./Pages/ResetPassword"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const CheckOutPage = lazy(() => import("./Pages/CheckOutPage"));
const AdminPage = lazy(() => import("./Pages/Admin/AdminPage"));
const SignupPage = lazy(() => import("./Pages/SignupPage"));
const Application = lazy(() => import("./Pages/Application"));
const InvalidPage = lazy(() => import("./Pages/ErrorPage/InvalidPage"));
const ForgotPasswordPage = lazy(() => import("./Pages/ForgotPasswordPage"));
const EmailVerifyPage = lazy(() =>
  import("./Pages/successPage/EmailVerifyPage")
);

function App() {
  const [isSiteAccess, setIsSiteAccess] = useState(true);
  const [logoName, setLogoName] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [networkError, setNetworkError] = useState(false);
  const loggedIn = useSelector((state) => state.user);

  useEffect(() => {
    console.log("loggedIn", loggedIn);
    console.log("loggedIn Reseller", loggedIn.currentUser?.is_reseller);
    let hostname = window.location.hostname;

    const hostHandle = async () => {
      try {
        let { data } = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/domain/system-information`,
          {
            domain: hostname,
            browserName: platform.name,
            deviceName: platform.os.family + " " + platform.os.version,
          }
        );
        if (data.status) {
          setIsSiteAccess(true);
          setNetworkError(false);

          if (loggedIn?.isLogin && !loggedIn?.currentUser?.isBasic) {
            console.log("is Basic = ", loggedIn?.currentUser?.isBasic);
            redirect(
              `${process.env.REACT_APP_FRONTEND_URL}/merchants/onboarding`
            );
          } else if (!loggedIn?.isLogin) {
            console.log("is login = ", loggedIn.isLogin);
            redirect(`${process.env.REACT_APP_FRONTEND_URL}/merchants/login`);
          }

          setLogoName(
            `${process.env.REACT_APP_SERVER_URL}/images/${data.data.merchantLogo}`
          );
        } else {
          setIsSiteAccess(true);
          enqueueSnackbar("domain is not validated!");
        }
      } catch (error) {
        setNetworkError(true);
        console.log(error.message);
      }
    };
    hostHandle();
  }, [loggedIn]);
  
  const dispatch = useDispatch();

  function logout() {
    dispatch(loginFailure());
  }

  console.log("networkError", networkError);
  return (
    <Router basename="/axonaio">
      <IdleTimer logout={logout} />
      <Suspense fallback={<h1>loading ...</h1>}>
        <Routes>
          {!isSiteAccess ? (
            <Route path="*" element={<InvalidPage />} />
          ) : !loggedIn.isLogin ? (
            <>
              <Route
                path="/merchants/login"
                element={
                  <LoginPage
                    merchantLogo={logoName}
                    networkError={networkError}
                  />
                }
              />

              <Route
                path="/user/forgot-password"
                element={<ForgotPasswordPage merchantLogo={logoName} />}
              />
              <Route path="/user/reset-password" element={<ResetPassword />} />
              <Route
                path="/merchants/signup"
                element={<SignupPage merchantLogo={logoName} />}
              />
              <Route
                path="/user/email-verification"
                element={<EmailVerifyPage />}
              />
              <Route
                path="*"
                element={
                  <LoginPage
                    merchantLogo={logoName}
                    networkError={networkError}
                  />
                }
              />
            </>
          ) : !loggedIn?.currentUser?.isBasic && loggedIn.isLogin ? (
            <Route
              path="/merchants/onboarding"
              element={<MainComponentPage />}
            />
          ) : (
            <>
              <Route
                element={
                  <ProtectedRoute isLogin={loggedIn.currentUser.isBasic} />
                }
              >
                <Route path="/checkout" element={<CheckOutPage />} />

                <Route path="/merchants/apps" element={<Application />} />
                <Route
                  path="/merchants/email-verification"
                  element={<EmailVerifyPage />}
                />
                <Route
                  path="/merchants/forgot-password"
                  element={<ForgotPasswordPage />}
                />

                <Route
                  element={
                    <ResellerProtectRoute
                      isReseller={loggedIn.currentUser?.is_reseller}
                      redirect="/"
                    />
                  }
                >
                  <Route path="/reseller/*" element={<RDBC />} />
                </Route>
                <Route
                  element={
                    <ResellerAdminProtect isResellerAdmin={true} redirect="/" />
                  }
                >
                  <Route path="/radmin/*" element={<RADBC />} />
                </Route>
                <Route path="/merchants/*" element={<DBC />} />

                <Route path="/merchants/pg/link/*" element={<PaymentForm />} />
                {/* <Route path="/admin/dashboard/*" element={<AdminPage />} /> */}
                <Route path="*" element={<Application />} />
                <Route path="/reseller404" element={<Reseller404 />} />
              </Route>
            </>
          )}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
