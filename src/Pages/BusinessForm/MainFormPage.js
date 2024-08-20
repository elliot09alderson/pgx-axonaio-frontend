import { useEffect, useState } from "react";
import styled from "styled-components";
import BankDetailsComponent from "../../components/OnboardingFormComponent/BankDetailsComponent";
import { dash, fintech, payment } from "../../../src/assests/img/index";
import BusinessComponent from "../../components/OnboardingFormComponent/BusinessComponent";
// import side from "../../assests/undraw_remotely_2j6y.svg";
import DocumentUploadComponent from "../../components/OnboardingFormComponent/DocumentUploadComponent";

import { ThreeDots } from "react-loader-spinner";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../utils/requestMethod";
import axios from "axios";
import { loginFailure } from "../../redux/userRedux";
import { useNavigate } from "react-router-dom";
import onFailure from "../../utils/error";

const GreenCircle = () => {
  return (
    <>
      <ThreeDots
        height="50"
        width="50"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </>
  );
};
const MainComponentPage = () => {
  const [step, setStep] = useState(0);

  const onChangeHandler = (data) => {
    setStep(data);
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.onbeforeunload = function () {
      return true;
    };
    setLoading(false);
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  function Line({ className = "bg-slate-500" }) {
    return (
      <div
        className={`sm:h-1 h-[2px] md:h-2 my-0 py-0  max-w-[200px] ${className} w-full rounded-sm`}
      ></div>
    );
  }
  function Text({ children }) {
    return (
      <h2 className="text-[8px] sm:text-xs md:text-sm lg:text-md font-medium m-0 p-0 mx-2">
        {children}
      </h2>
    );
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function logout() {
    try {
      const res = await axios.post(`${BASE_URL}/user/logout`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("is_logged_in")}`,
        },
      });
      if (res.data) {
        dispatch(loginFailure());
      }
    } catch (error) {
      console.log(error);
      onFailure(error, dispatch);
    }
  }
  return loading ? (
    <h1>Loading....</h1>
  ) : (
    <div className="flex">
      <div className="w-[30%] min-h-screen bg-[#a07bf8] md:flex hidden sm:flex items-center justify-center ">
        <div className="absolute top-5 left-5 cursor-pointer" onClick={logout}>
          <FiLogOut color="white" size={18} className=" ml-3" />
          <span
            className="text-xs underline text-white"
            onClick={() => dispatch(loginFailure())}
          >
            logout
          </span>
        </div>
        <img src={dash} alt="onboarding_png" className="w-[300px] h-[300px]" />
      </div>
      {/*  Above is the 30% of Onboarding Form Layout */}
      <div className="md:w-[70%] px-4 w-full py-4">
        <div className="flex justify-center items-center my-2 sm:my-3  sm:flex-row md:flex-row gap-2 mx-5">
          {step > 0 && <GreenCircle />}
          <p className="lg:text-lg text-xs text-slate-500">Business Details</p>
          <Line className={`${step > 0 ? "bg-green-500" : "bg-gray-500"}`} />
          {/* <Line color={step > 0 ? "green" : "grey"} /> */}
          {step > 1 && <GreenCircle />}
          <p className="lg:text-lg text-xs text-slate-500">Bank Details</p>
          <Line className={`${step > 1 ? "bg-green-500" : "bg-gray-500"}`} />
          {/* <Line color={step > 1 ? "green" : "grey"} />{" "} */}
          <p className="lg:text-lg text-xs text-slate-500">Document Upload</p>
        </div>
        <div>
          {step === 0 && (
            <BusinessComponent onChangeHandler={onChangeHandler} step={step} />
          )}
          {step === 1 && (
            <BankDetailsComponent
              onChangeHandler={onChangeHandler}
              step={step}
            />
          )}
          {step === 2 && (
            <DocumentUploadComponent
              onChangeHandler={onChangeHandler}
              step={step}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainComponentPage;
