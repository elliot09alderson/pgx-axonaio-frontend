import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { dash, fintech, payment } from "../../src/assests/img/index.js";

import "./styles/owl.carousel.min.css";
// import "./styles/bootstrap.min.css";
import "./styles/style.css";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

import { useSnackbar } from "notistack";
import { ErrorPara } from "../components/OnboardingFormComponent/BusinessComponent";
import { IsEmptySignup, signupValidation } from "../utils/validation";
import { frontImage } from "../assests";
import myLogo from "../assests/axonaio-icon.png";
function Newfiles3({ merchantLogo }) {
  const navigate = useNavigate();
  let formObj = { name: "", password: "", email: "", phonenumber: "" };
  const [formValues, setFormValues] = useState(formObj);
  const [error, setError] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  console.log(merchantLogo);
  // const hasErrors = () => {
  //   let hasError = false;
  //   let errors = {};
  //   formObj.forEach(item => {
  //     const errorField = signupValidation({ [item]: item, value: formObj[item] })
  //     errors = { ...errors, errorField };
  //     if (errorField[item]) hasError = true;
  //   })
  //   setError({ ...errors, alert: true });
  //   return hasError;
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    let temp = signupValidation(formValues);
    console.log("hiiiii", temp);
    setError(temp);
    if (temp === null) {
      console.log("hello");
      console.log(formValues);
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/user/signup`,
          formValues
        )
        .then((res) => {
          console.log("res -> ", res);
          // if (!res.ok) throw new Error("something wrong happen while fetching");
          if (res.data.result) {
            navigate("/");
            enqueueSnackbar("Please verify the gmail");
          } else {
            // setError(res.data.message);
            enqueueSnackbar(res.data.message);
          }
        })
        .catch((err) => {
          console.log("errror", err.message);
          enqueueSnackbar(err.message);
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.length < 1) {
      setError(null);
    }
    setFormValues({ ...formValues, [name]: value });
    // let err = signupValidation({ name, value })
    // setError(pre => ({ ...error, ...err }))
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="flex justify-center items-center min-w-[50%]">
          <form
            action="#"
            method="post"
            className="lg:max-w-[400px] sm:max-w-[300px] max-w-[80%]"
          >
            <div className="md:mt-2 mt-4">
              {/* <h3 className="text-center">Sign In</h3> */}
              {!merchantLogo?.includes("undefined") ? (
                <img src={merchantLogo} className="w-28 mx-auto" />
              ) : (
                <img src={myLogo} className="w-28 mx-auto" />
              )}
              <p className=" text-center font-medium text-slate-800 my-4 mb-6 mt-2">
                Create your account
              </p>
            </div>
            <div className="form-group first my-4 flex flex-col gap-5">
              <div>
                <input
                  type="text"
                  className=" w-full px-2 py-2 ring-1 max-w-[400px] rounded-md focus:outline-none "
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  placeholder="First-Name"
                  required
                />
                {error?.name && (
                  <ErrorPara className="pl-1 text-xs font-normal">
                    {error?.name ? error.name : ""}
                  </ErrorPara>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="phonenumber"
                  className="w-full px-2 py-2 ring-1 max-w-[400px] rounded-md focus:outline-none "
                  value={formValues.phonenumber}
                  onChange={handleChange}
                  placeholder="Phonenumber"
                  maxLength={10}
                />
                {error?.phonenumber && (
                  <ErrorPara className="pl-1 text-xs font-normal">
                    {error.phonenumber}
                  </ErrorPara>
                )}
              </div>

              <div>
                <input
                  type="email"
                  className="w-full px-2 py-2 ring-1 max-w-[400px] rounded-md focus:outline-none "
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  placeholder="E-mail"
                  required
                />
                {error?.email && (
                  <ErrorPara className="pl-1 text-xs font-normal">
                    {error.email}
                  </ErrorPara>
                )}
              </div>

              <div>
                <input
                  type="password"
                  className="w-full px-2 py-2 ring-1 max-w-[400px] rounded-md focus:outline-none "
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />

                {error?.password && (
                  <ErrorPara className="pl-1 text-xs font-normal">
                    {error.password}
                  </ErrorPara>
                )}
              </div>
            </div>
            <div className="flex justify-between  flex-row items-center ">
              <p className="text-xs self-center text-center font-medium ml-2 ">
                By signing up, you accept the Axonaio
                <u
                  className="cursor-pointer text-[#552288] hover:opacity-70 transition-all ml-1 e"
                  onClick={() => navigate("/merchants/application")}
                >
                  Terms & Conditions
                </u>
              </p>
            </div>
            <div className=" flex justify-center cursor-pointer my-2 sm:mb-3 sm:mt-0  px-4  items-center sm:py-0  shadow-md text-sm text-[#552288]  underline sm:rounded-md  hover:opacity-70  hover:cursor-pointer rouded-md font-medium gap-1   drop-shadow-sm transition-all w-full  rounded-sm  ">
              <span className="drop-shadow-md   ">Sign up with</span>
              <FcGoogle size={24} />
            </div>
            <div className="my-4 flex  items-centers justify-center">
              <input
                type="button"
                value="Sign up "
                onClick={handleSubmit}
                className="w-screen py-2 bg-blue-700 text-center text-white rounded-lg "
              />
            </div>
            <p className="mb-4 text-xs text-center text-blue-700 font-medium">
              <span className=" text-base ">Already a member </span>
              <span
                onClick={() => navigate("/")}
                className=" cursor-pointer underline transition-all hover:opacity-70 text-lg"
              >
                Log in
              </span>
            </p>

            {/* {error && <ErrorPara>{error}</ErrorPara>} */}
          </form>
        </div>
        <div className=" min-h-[100vh] hidden flex-col bg-blue-700 min-w-[50%] p-16 sm:flex items-center justify-center ">
          <img
            src={fintech}
            alt="signinLogo"
            className="lg:p-8  md:ml-2 m-0 sm:p-4 w-10/12"
          />
        </div>
      </div>
    </>
  );
}

export default Newfiles3;
