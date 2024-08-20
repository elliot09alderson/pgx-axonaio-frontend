import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import logo from "../assests/logo.png";
import side from "../assests/undraw_remotely_2j6y.svg";
// import "./styles/bootstrap.min.css";
import "./styles/owl.carousel.min.css";
import "./styles/style.css";
import axios from "axios";
import { useSnackbar } from "notistack";
import ForgotPasswordPage from "./ForgotPasswordPage";
import { ErrorPara } from "../components/OnboardingFormComponent/BusinessComponent";
import { MdLockReset } from "react-icons/md";
import { RxReset } from "react-icons/rx";
function ResetPassword() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // const [password, setPassword] = useState('')
  // const [confirmPassword, setConfirmPassword] = useState('')
  const [passphase, setPassPhase] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    passwordError: "",
    confirmPasswordError: "",
  });
  const [isValid, setIsValid] = useState(true);
  // when submit button click
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

    if (error.passwordError || error.confirmPasswordError) {
      setError({
        ...error,
        passwordError:
          "Password must contain at least 8 characters, including at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
      });
    } else {
      try {
        if (passphase.password === passphase.confirmPassword) {
          let token = window.location.search.substring(7);
          console.log("substringtoken", token);
          if (token) {
            const res = await axios.patch(
              `${process.env.REACT_APP_SERVER_URL}/api/v1/user/update-password`,
              null,
              { params: { password: passphase.password, token: token } }
            );
            if (res) {
              enqueueSnackbar("password has updated successfully!");
              navigate("/merchants/login");
            }
          } else {
            enqueueSnackbar("session expired ...");
            navigate("/user/forgot-password");
          }
        } else {
          setError({
            ...error,
            confirmPasswordError: "password does not match",
          });
        }
      } catch (error) {
        // console.log(error.response)
        enqueueSnackbar(error.response.data.message);
      }
    }
  };

  const handleChange = (e) => {
    setPassPhase({ ...passphase, [e.target.name]: e.target.value });
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    if (!passwordRegex.test(passphase.password)) {
      setError({
        ...error,
        passwordError:
          "Password must contain at least 8 characters, including at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
      });
    } else {
      setError({ password: "", confirmPassword: "" });
    }
  };

  // useEffect(() => {
  //   const CheckTokenValid = async () => {
  //     let token = window.location.search.substring(7);
  //     try {
  //       console.log(token);
  //       let isValid = await axios.get(
  //         `${process.env.REACT_APP_SERVER_URL}/api/v1/user/checkToken`,
  //         {
  //           params: { token: token },
  //         }
  //       );
  //       if (isValid?.status) {
  //         console.log("valid!");
  //         setIsValid(true);
  //       } else {
  //         setIsValid(false);
  //       }
  //     } catch (error) {
  //       setIsValid(false);
  //       console.log(error);
  //     }
  //   };
  //   CheckTokenValid();
  // }, []);

  return (
    <>
      <div className="w-full">
        <div className=" flex  items-center justify-center  w-full">
          <div className="w-full flex">
            <form action="#" method="post" className="w-full">
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-center my-12 underline text-3xl font-semibold">
                  Reset Password
                </h1>
                <MdLockReset size={30} />
              </div>

              <div className="w-full flex flex-col  items-center  gap-8">
                <div className="flex flex-col gap-1 lg:w-96 w-72 ">
                  <label className="text-black">Password</label>
                  <input
                    name="password"
                    type="password"
                    className="lg:w-96 w-72  rounded-lg"
                    value={passphase.password}
                    onChange={handleChange}
                    placeholder="Password"
                    focused
                    required
                  />
                  {error?.passwordError && (
                    <ErrorPara>{error.passwordError}</ErrorPara>
                  )}
                </div>
                <div className="flex flex-col gap-1 lg:w-96 w-72">
                  <label className="text-black">Confirm Password</label>
                  <input
                    name="confirmPassword"
                    type="password"
                    className="lg:w-96 w-72 rounded-lg"
                    value={passphase.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    focused
                    required
                  />
                  {error?.confirmPasswordError && (
                    <ErrorPara>{error.confirmPasswordError}</ErrorPara>
                  )}
                </div>

                <button
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                  value=" Submit"
                  className="tairo-bg-blue px-5 py-2 rounded-lg text-white lg:w-96 w-72 mt-4 "
                >
                  Submit
                </button>
                <div className="flex ">
                  <p
                    className="cursor-pointer text-sm underline"
                    onClick={() => navigate("/merchant/login")}
                  >
                    Go back to Login
                  </p>
                  <RxReset size={20} className="" />
                </div>
              </div>
            </form>
          </div>
          <div className="hidden lg:flex w-full  items-center justify-center">
            <img src={side} alt="Image" className="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
