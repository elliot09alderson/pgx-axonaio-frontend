import React, { useState } from "react";
import { useNavigate } from "react-router";

import { ImArrowRight2 } from "react-icons/im";
// import "./styles/bootstrap.min.css";
import "./styles/owl.carousel.min.css";
import "./styles/style.css";
import axios from "axios";
import { useSnackbar } from "notistack";
import { ErrorPara } from "../components/OnboardingFormComponent/BusinessComponent";

function ForgotPasswordPage({ isTokenValid, merchantLogo }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = (e) => {
    // console.log('asda')
    e.preventDefault();
    const emailValidation =
      /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$/;

    if (!emailValidation.test(email)) {
      setError("Please enter a valid email address.");
      // setShowSnackbar(true);
    } else {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/user/forgotpassword`,
          { email }
        )
        .then((res) => {
          if (res.data.result) {
            // localStorage.setItem('is_logged_in', true)
            enqueueSnackbar("reset password link has sent in your gmail!");
            navigate("/");
          } else {
            enqueueSnackbar(res.data.message);
            setError(res.data.message);
          }
        })
        .catch((err) => {
          enqueueSnackbar(err.response.data.message);
        });
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2  min-h-screen ">
        <div className="flex justify-center items-center h-full">
          <form
            action="#"
            method="post"
            className="lg:max-w-[400px] flex flex-col justify-center  mb-4 sm:max-w-[300px] max-w-[80%]"
          >
            <div className="">
              <img src={merchantLogo} className="w-32 mx-auto pb-2" />

              <p className=" text-center font-medium text-slate-800 my-4 mb-6 select-none mt-2 drop-shadow-sm">
                Forgot Password
              </p>
            </div>
            <div className="form-group first my-4 flex flex-col gap-5">
              <div>
                <input
                  type="email"
                  className="py-1 h-10 rounded-sm mb-2 sm:w-full w-full  pl-2 focus:ring-1 focus:outline-none ring-1 ring-blue-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  name="email"
                  focused
                  required
                />
                {error && (
                  <ErrorPara className="font-normal pl-1">{error}</ErrorPara>
                )}
              </div>
            </div>

            <div className="my-2  flex  items-centers justify-center">
              <input
                type="submit"
                onClick={handleSubmit}
                value=" Send reset link"
                className="w-screen py-2 bg-[#552288] text-center text-white rounded-lg "
              />
            </div>
            <div className="mt-4">
              <p className="mb-1 justify-center flex items-center gap-1 text-xs  text-[#552288] font-medium">
                <span className=" sm:inline  ">already have otp </span>
                <span
                  onClick={() => navigate("/user/reset-password")}
                  className=" cursor-pointer underline transition-all hover:opacity-70"
                >
                  reset passsword
                </span>
                <ImArrowRight2 />
              </p>
              <p className="mb-1 justify-center flex items-center gap-1 text-xs  text-[#552288] font-medium">
                <span className=" sm:inline  ">Go back to </span>
                <span
                  onClick={() => navigate("/")}
                  className=" cursor-pointer underline transition-all hover:opacity-70"
                >
                  Log in
                </span>
                <ImArrowRight2 />
              </p>

              <p className="text-xs pt-2 sm:text-md  sm:text-center sm:opacity-80 text-left font-medium opacity-50 ">
                Protected by reCAPTCHA. <br /> Google{" "}
                <a href="#">Privacy Policy </a>&
                <a href="#"> Terms of Service</a>
              </p>
            </div>
          </form>
        </div>
        <div className=" min-h-[100vh] hidden flex-col bg-[#440a64] min-w-[50%] p-16 sm:flex items-center justify-center"></div>
      </div>
    </>
  );
}

export default ForgotPasswordPage;
