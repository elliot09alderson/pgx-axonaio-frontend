import {
  PayInData,
  PayOutData,
  ResellerData,
  FontAwesomeIcon,
  GrClose,
  logo,
  Link,
} from "./index.js";
import { useLocation } from "react-router-dom";
import { IoIosPersonAdd } from "react-icons/io";
const BigSideBar = ({ slider, toggleSlider, paymode }) => {
  const location = useLocation();

  return (
    <div
      className={`fixed h-full top-0 z-40 float-left sm:w-[34vw] md:w-[30vw] lg:w-[24vw] xl:w-[20vw] transition-all   sm:block ${
        slider ? "w-[80%]" : "w-0"
      }  LeftSubDiv select-none border-3 second-bg fourth-text`}
    >
      <div className="flex justify-center px-4 py-4  items-center relative">
        <img src={logo} className="w-32 px-2 pt-4" />
        {slider && (
          <GrClose
            className="absolute block sm:hidden top-5 right-5 "
            size={24}
            onClick={(e) => toggleSlider(e)}
          />
        )}
      </div>
      <div className={`sm:flex flex-col  ${slider ? "flex" : "hidden "} z-50`}>
        <div className="flex items-center justify-center gap-2 mb-2 mt-4">
          <h2 className=" text-sm font-bold drop-shadow-sm first-text ">
            {paymode === "reseller" ? "Reseller" : "Payment Gateway ➡️"}
          </h2>

          {paymode === "reseller" && (
            <IoIosPersonAdd size={20} className="first-text text-lg" />
          )}
        </div>

        {paymode === "payIn" &&
          PayInData.map((item) => {
            return (
              <Link to={item.link} key={item.id}>
                <div
                  className={`${
                    location.pathname.includes(item.link)
                      ? "first-bg fourth-text"
                      : "third-text"
                  } px-4 py-2 cursor-pointer items-center transition-all duration-500 ease-in  justify-center `}

                  // onClick={() => onChangeBodyComponent(item.id)}
                >
                  <div
                    className="flex ml-14 justify-start gap-2 py-1   my-2 items-center"
                    onClick={() => toggleSlider(item.id)}
                  >
                    <FontAwesomeIcon icon={item.icon} />
                    <h2 className="text-sm  text-center m-0">{item.title}</h2>
                  </div>
                </div>
              </Link>
            );
          })}

        {paymode === "payOut" &&
          PayOutData.map((item) => {
            return (
              <Link to={item.link} key={item.id}>
                <div
                  className={`${
                    location.pathname.includes(item.link)
                      ? "first-bg fourth-text"
                      : "third-text"
                  } px-4 py-2 cursor-pointer items-center transition-all duration-500 ease-in   justify-center `}
                  key={item.id}
                >
                  <div
                    className="flex ml-14 justify-start gap-2 py-1   my-2 items-center"
                    onClick={() => toggleSlider(item.id)}
                  >
                    <FontAwesomeIcon icon={item.icon} />
                    <h2 className="text-sm  text-center m-0">{item.title}</h2>
                  </div>
                </div>
              </Link>
            );
          })}

        {paymode === "reseller" &&
          ResellerData.map((item) => {
            return (
              <Link to={item.link} key={item.id}>
                <div
                  className={`${
                    location.pathname.includes(item.link)
                      ? "first-bg fourth-text"
                      : "third-text"
                  } px-4 py-2 cursor-pointer items-center transition-all duration-500 ease-in   justify-center `}
                  key={item.id}
                >
                  <div
                    className="flex ml-14 justify-start gap-2 py-1   my-2 items-center"
                    onClick={() => toggleSlider(item.id)}
                  >
                    <FontAwesomeIcon icon={item.icon} />
                    <h2 className="text-sm  text-center m-0">{item.title}</h2>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default BigSideBar;
