import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./styles/owl.carousel.min.css";
import "./styles/style.css";
import { useDispatch, useSelector } from "react-redux";
// import { userLoggedInAction } from "../redux/actions/userActions";
import { ErrorPara } from "../components/OnboardingFormComponent/BusinessComponent";
import { useSnackbar } from "notistack";
import { IsEmptyLogin, signupValidation } from "../utils/validation";
import { login } from "../redux/apiCall";
import { FcGoogle } from "react-icons/fc";
import loginImg from "../assests/login-removebg-preview.png";
import { PiWarning } from "react-icons/pi";
import { MagnifyingGlass } from "react-loader-spinner";
import myLogo from "../assests/axonaio-icon.png";

function LoginPage({ merchantLogo, networkError }) {
  let formObj = { password: "", email: "" };
  const [formValues, setFormValues] = useState(formObj);
  const [error, setError] = useState("");
  const [Error, setErrors] = useState(formObj);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let temp = IsEmptyLogin(formValues);
    setErrors(temp);
    if (temp === null) {
      let data = await login(dispatch, formValues);
      // console.log(data);
      if (data?.result) {
        if (!data.isBasic) {
          navigate("/merchants/onboarding");
        }
      } else {
        setError(data.message);
        enqueueSnackbar(data.message);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.length < 1) {
      setErrors(null);
    }
    setFormValues({ ...formValues, [name]: value });
  };
  console.log(networkError);

  return (
    <>
      {networkError ? (
        <div className="flex items-center justify-center flex-col gap-2 bg-black/90 h-screen w-[100vw]">
          <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="magnifying-glass-loading"
            wrapperStyle={{}}
            wrapperClass="magnifying-glass-wrapper"
            glassColor="#c0efff"
            color="#e15b64"
          />
          <h2 className="text-white font-semibolld">
            Check your internet connection{" "}
          </h2>
        </div>
      ) : (
        <div className=" pr-0 lg:pr-0">
          <div className="flex justify-between">
            <div className="flex justify-center items-center min-w-[50%]">
              {showSnackbar && (
                <div
                  style={{
                    position: "fixed",
                    bottom: "16px",
                    left: "16px",
                    right: "16px",
                    backgroundColor: "#333",
                    color: "#fff",
                    padding: "12px 16px",
                    borderRadius: "4px",
                    zIndex: 1,
                  }}
                >
                  {error}
                </div>
              )}
              <form
                action="#"
                method="post"
                className="lg:max-w-[400px] sm:max-w-[300px] max-w-[80%]"
              >
                <div className="md:mt-2 mt-4">
                  {!merchantLogo?.includes("undefined") ? (
                    <img src={merchantLogo} className="w-28 mx-auto" />
                  ) : (
                    <img src={myLogo} className="w-28 mx-auto" />
                  )}
                  <div className="text-center">
                    {error && (
                      <ErrorPara>
                        {error}
                        <PiWarning className="inline ml-[2px] my-0 px-0" />
                      </ErrorPara>
                    )}
                  </div>
                  {/* <h3 className="text-center">Log In</h3> */}
                  <div className=" text-center font-medium text-slate-800 text-3xl my-4 mb-8 mt-2">
                    Login to your Account
                  </div>
                </div>
                <div className="form-group first my-4 flex flex-col gap-5">
                  <div>
                    <input
                      type="email"
                      value={formValues.email}
                      onChange={handleChange}
                      className=" w-full px-2 py-2  ring-1 ring-blue-700 max-w-[400px] rounded-md focus:outline-none "
                      placeholder="email"
                      name="email"
                      required
                    />
                    {Error?.email && (
                      <ErrorPara className="font-normal pl-1">
                        {Error.email}
                      </ErrorPara>
                    )}
                  </div>
                  <div>
                    <input
                      type="password"
                      value={formValues.password}
                      onChange={handleChange}
                      className="w-full px-2 py-2 ring-1 ring-blue-700 max-w-[400px] rounded-md focus:outline-none "
                      placeholder="password"
                      name="password"
                      required
                    />
                    {Error?.password && (
                      <ErrorPara className="font-normal pl-1">
                        {Error.password}
                      </ErrorPara>
                    )}
                  </div>
                </div>
                <div className="flex justify-between  flex-col sm:flex-row sm:items-center ">
                  <div className="text-xs font-medium text-black">
                    Trouble logging in?{" "}
                    <u
                      onClick={() => navigate("/user/forgot-password")}
                      className="cursor-pointer text-black hover:text-[#a07bf8] transition-all"
                    >
                      Click here
                    </u>
                  </div>
                  {/* <div className=" flex justify-center cursor-pointer my-2 sm:mb-3 sm:mt-0 py-2 sm:py-0 sm:shadow-none shadow-md text-sm text-[#552288] hover:underline hover:cursor-pointer rouded-md font-medium gap-1 items-center drop-shadow-sm transition-all  rounded-sm ">
                    <span className="drop-shadow-md ">Login with</span>
                    <FcGoogle size={24} />
                  </div> */}
                </div>
                <div className="my-5 flex  items-centers justify-center">
                  <input
                    type="button"
                    value="Log In"
                    onClick={handleSubmit}
                    className="w-screen py-2 cursor-pointer bg-blue-700 text-center text-white rounded-lg "
                  />
                </div>
                <p className="mb-4 text-xs text-center text-blue-700 font-medium">
                  <span className=" text-base ">New to Axonaio? </span>
                  <span
                    onClick={() => navigate("/merchants/signup")}
                    className=" cursor-pointer underline transition-all hover:opacity-70 text-blue-700 text-lg"
                  >
                    Sign up
                  </span>
                </p>

                {/* <div className=" flex justify-center cursor-pointer mb-2 text-white rounded-lg ">
                <FcGoogle size={24} />
              </div> */}
                <div className="text-xs sm:text-md sm:text-center sm:opacity-80 text-left font-medium opacity-50 ">
                  Protected by reCAPTCHA. <br /> Google{" "}
                  <a href="#">Privacy Policy </a>&
                  <a href="#"> Terms of Service</a>
                </div>
              </form>
            </div>
            <div className=" min-h-[100vh] hidden flex-col bg-blue-700 min-w-[50%] p-16 sm:flex items-center justify-center">
              <img src={loginImg} className="w-10/12 " />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginPage;
