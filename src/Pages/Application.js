import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserTie, FaBell } from "react-icons/fa";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
// import bannerImg from "../assests/Untitled.png";
import bannerImg from "../assests/logo/ap_logo_1.png";
// import bannerImg from "../assests/logo/logo-2.jpg";

import { DotLoader } from "react-spinners";
import styled from "styled-components";
import axonlogo from "../assests/axonaio-icon.png";
import { useNavigate } from "react-router";
import {
  Button,
  CompanyDiv,
  Form,
  InputField,
  InputLabel,
} from "../components/OnboardingFormComponent/BusinessComponent";
import ModalDrawer from "../components/molecules/ModalDrawer";
import { changeAppMode, loginFailure, loginSuccess } from "../redux/userRedux";
import onFailure from "../utils/error";
import { BASE_URL } from "../utils/requestMethod";
import { fetchApps } from "../redux/apps/appSlice";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  background: #f4f6f8;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  gap: 1rem;
  margin: 0 auto;
  margin-bottom: 20px;
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export const Image = styled.img`
  width: ${(props) => props.width || "40px"};
  height: ${(props) => props.height || "40px"};
  margin-right: 20px;
  cursor: pointer;
`;

export const DropdownDiv = styled.div`
  position: absolute;

  background: #fff;
`;
export const DropDownunList = styled.ul`
  display: flex;
  flex-direction: column;
  position: relative;
  list-style: none;
  padding: 5px;
`;
export const DropList = styled.li`
  position: relative;
  display: flex;
  text-align: center;
  font-size: large;
  font-weight: 500;
  padding: 5px 25px;
  cursor: pointer;
  justify-content: center;
  &:hover {
    background-color: #105b72c2;
  }
`;

export const SmallNavDiv = styled.div`
  display: flex;
  flex: 1;
  text-align: right;
  align-items: center;
  justify-content: flex-end;
`;

export const NavLogoDiv = ({ children }) => {
  return <div className="flex text-md font-medium my-1 p-1">{children}</div>;
};

export const CompanyLogo = styled.img`
  max-width: 6rem;
`;

export const NavIconNotiMess = styled.div`
  display: flex;
  gap: 5px;
`;

export const ProfileDiv = styled.div`
  margin-left: 20px;
  display: inline-block;
`;

// export const ShowSwitchDiv = styled.div`
//   display: flex;
//   gap: 15px;
// `;
export const ShowDiv = styled.div`
  display: flex;
  width: 120px;
  background: ${(props) => props.bg};
  color: ${(props) => props.color};
  letter-spacing: 1.2;
  font-size: larger;
  font-weight: 500;
  justify-content: center;
  align-items: center;
`;
// export const SwitchDiv = styled.div``;
export const SwitchButton = styled.button`
  border: 1px solid #6933d3;
  color: #6933d3;
  padding: 7px;
  border-radius: 5px;
  outline: #6933d3;
`;

const Application = () => {
  // const apps = ["Payin", "Payout"];
  const message = [
    "oops! Request already submitted.",
    "oops! You don't have a access in live mode.",
    "You have access to Explore our product",
    "Your documents is under verification!",
  ];
  const [isDropdownOpend, setDropdownOpen] = useState(false);
  const list = ["profile", "logout"];
  const dispatch = useDispatch();
  const toggleDropDown = () => setDropdownOpen(!isDropdownOpend);
  const [appsData, setAppsData] = useState([]);
  const userData = useSelector((state) => state.user.currentUser);
  const [scrollValue, setScrollValue] = useState(0);
  const { mode, currentUser } = useSelector((state) => state.user);
  const [selectOption, setSelectOption] = useState({
    data: ["Test Mode", "Live Mode"],
    selectOne: userData.app_mode === "test" ? 0 : 1,
  });
  const [drawer, setDrawer] = useState({
    toggle: false,
    showResult: false,
    app_id: "",
    messageIndex: 0,
  });
  const navigate = useNavigate();

  // const options = []
  const { enqueueSnackbar } = useSnackbar();
  const [inputValue, setInputValue] = useState("");
  const [loader, setLoader] = useState(false);
  const { apps } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(fetchApps());

    console.log(apps);
    console.log("app_____mode____", mode);
  }, []);

  useEffect(() => {
    try {
      const fetchApps = async () => {
        setLoader(true);
        const res = await axios.get(`${BASE_URL}/apps/fetch`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("is_logged_in")}`,
          },
        });
        if (res.data) {
          setAppsData(res.data);
          setLoader(false);
        }

        // console.log("console msg from application", res);
      };
      fetchApps();
    } catch (error) {
      // console.log(error);
      onFailure(error, dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log("the last path", lastPath);
  const handleChange = async (index) => {
    if (Number(index) === 1) {
      try {
        const res = await axios.post(`${BASE_URL}/user/logout`, null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("is_logged_in")}`,
          },
        });
        if (res.data) {
          localStorage.removeItem("is_logged_in");
          dispatch(loginFailure());
        }
      } catch (error) {
        console.log(error);
        onFailure(error, dispatch);
      }
    }
  };

  const DropDownlist = () =>
    list.map((el, index) => (
      <DropList
        className="rounded-lg"
        key={index}
        onClick={() => handleChange(index)}
      >
        {el}
      </DropList>
    ));

  const handleClick = async (type) => {
    console.log(type, "type------------------------>>>");
    if (mode === "live") {
      navigate("/merchants/pg/apps");
    } else {
      enqueueSnackbar("you have access in test mode!");

      navigate("/merchants/pg/apps");
    }
  };

  const handleOptionChange = async (e) => {
    try {
      const res = await axios.put(`${BASE_URL}/user/toggle_mode`, null, {
        // params: { app_mode: mode },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("is_logged_in")}`,
        },
      });
      if (res.data.status) {
        dispatch(changeAppMode());
      }
    } catch (error) {
      onFailure(error, dispatch);
    }

    if (mode === "live") {
      console.log("you r in live mode");
    }
  };

  const Switch = ({ className, children, onClick }) => {
    return (
      <button
        onClick={onClick}
        type="button"
        className={`${className} cursor-pointer rounded-md border-none focus:outline-none h-8 w-28 shadow-md`}
      >
        {children}
      </button>
    );
  };

  window.addEventListener("scroll", Myfunc);
  function Myfunc() {
    setScrollValue(window.scrollY);
    // console.log(scrollValue);
  }

  const Banner = ({ className }) => {
    return (
      <div
        className={` bg-[#a07bf8]  ${className} select-none flex-wrap sm:flex-row flex-col flex justify-evenly gap-5 sm:gap-5 md:gap-5 rounded-xl py-2 md:min-h-[40vh] sm:min-h-[50vh] lg:h-[45vh] px-2  w-full items-center`}
      >
        <div className=" flex flex-col gap-4 py-2  max-w-[700px] ">
          <h1 className="lg:text-3xl  text-white md:my-2 my-3 mx-4 drop-shadow-lg">
            Welcome to Axonaio !
          </h1>
          <h3 className="text-xs lg:text-base text-[#ede9fe] tracking-wider px-4 text-left  sm:text-slate-200 pt-1 font-normal text-tight sm:font-light sm:tracking-wide">
            Using modifiers for this sort of thing can reduce the amount of
            conditional logic in your templates, letting you use the same set of
            classes regardless of what state an input is in and letting the
            browser apply the right styles for you.
            <p
              className={`${
                userData.bg_verified ? "  " : "text-red-800"
              } font-medium text-xs mt-5`}
            >
              {userData.bg_verified ? message[2] : message[3]}
            </p>
          </h3>
        </div>
        <img
          src={bannerImg}
          className="w-32  mx-2 pb-2 -mt-3 lg:w-48  self-start sm:self-center"
        />
      </div>
    );
  };

  const Nav = () => {
    return (
      <div
        className={`flex sm:sticky duration-700 w-full px-5 z-50 top-0 justify-between sm:flex-row flex-col items-center pt-3 transition-all ${
          Number(scrollValue) > 10
            ? "sm:backdrop-blur-lg shadow-md  bg-white "
            : ""
        }`}
      >
        <NavLogoDiv>
          <CompanyLogo src={bannerImg} />
        </NavLogoDiv>

        <div className="flex gap-5  flex-col sm:flex-row items-center ">
          <div className="flex justify-center gap-5 items-center  ">
            <Switch className={``} onClick={handleOptionChange}>
              Switch to {mode === "test" ? "Live" : "Test"}
            </Switch>
            <Switch
              className={`
              ${
                mode === "live"
                  ? "bg-yellow-500 text-white"
                  : "bg-slate-500 text-white"
              }`}
            >
              {" "}
              {!userData.bg_verified
                ? "Test"
                : mode === "live"
                ? "Live"
                : "Test"}{" "}
              Mode
            </Switch>
          </div>
          <div className="p-2 flex gap-5 relative">
            <BiSolidMessageSquareDetail
              size={36}
              className="cursor-pointer p-2  hover:opacity-80 transition-all   shadow-md rounded-full"
            />
            <FaUserTie
              className=" hover:opacity-80 transition-all 
            cursor-pointer shadow-md rounded-full p-1.5"
              size={36}
              onClick={toggleDropDown}
            />
            {isDropdownOpend ? (
              <DropdownDiv className="rounded-lg top-8 left-8 ">
                <DropDownunList className="rounded-lg">
                  {DropDownlist()}
                </DropDownunList>
              </DropdownDiv>
            ) : (
              false
            )}
            <FaBell
              size={36}
              className="cursor-pointer p-2 hover:opacity-80 transition-all  shadow-md rounded-full"
            />
          </div>
        </div>
      </div>
    );
  };
  const Card = ({ onClick, appname }) => {
    return (
      <div className="relative max-h-[60vh]  select-none shadow-md my-2 p-2  sm:max-w-[300px] sm:min-h-[300px] rounded-xl md:min-h-[30vh] flex justify-center flex-col items-center">
        {/* <img className="absolute top-0 right-0" src="" /> */}
        <img
          src={axonlogo}
          className="rounded-full h-12 my-2 shadow-md w-12 p-2"
        />
        <h2 className="text-xl my-2">{appname}</h2>
        {/* <h2 className="text-xl my-2">{data.name}</h2> */}
        {/* <p className="text-xs  text-slate-500"> {data.description}</p> */}
        <div className="flex w-full my-2  justify-evenly items-center">
          <button className=" py-1  hover:bg-[#a07bf8] hover:text-white transition-all rounded-full focus:outline-none w-24 border-[#a07bf8] border-2">
            View Docs
          </button>
          <button
            className="  focus:outline-none transition-all  hover:bg-[#a07bf8] hover:text-white w-24 border-[#a07bf8] border-2 py-1 rounded-full "
            onClick={onClick}
          >
            access
            {/* {userData.app_mode === "test"
              ? "Access"
              : isAppAccess
              ? "Access"
              : "Request"} */}
          </button>
        </div>
      </div>
    );
  };
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  function GridContainer() {
    return (
      <div className="gap-5 grid grid-cols-1 items-center justify-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {loader ? (
          <DotLoader
            color={"#a07bf1"}
            loading={loader}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          currentUser?.app_permissions.map((app, index) => {
            return (
              <Card
                key={app + index}
                onClick={() => handleClick(app)}
                appname={app}
                // userData={userData}
                // isAppAccess={isAppAccess}
                // data={data}
              />
            );
          })
        )}
      </div>
    );
  }

  return (
    <Wrapper>
      <Nav />
      <Container>
        <Banner className="" />
        <h4 className="drop-shadow-sm pb-2 ">Explore the Axonaio products</h4>
        <GridContainer />
      </Container>
      <footer className="flex px-2 text-md">
        <p className=" text-slate-500 text-sm">
          copyright &copy; 2023-2024 all rights are reserved
        </p>
      </footer>
    </Wrapper>
  );
};

export default Application;
