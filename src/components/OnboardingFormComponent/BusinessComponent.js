import { useEffect, useState } from "react";
import styled from "styled-components";

import { BusinessFormValidation } from "../../utils/basicFormValidation";

import axios from "axios";
import { BASE_URL } from "../../utils/requestMethod";
import { onFailure } from "../../utils/error";
import { useDispatch } from "react-redux";

export const BusinessContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  flex-wrap: wrap;
`;
export const CompanyDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
export const InputLabel = styled.label`
  color: #8d8d8d;
  background: #ffffff;
`;
export const InputField = styled.input`
  outline: none;
  border: 1px solid #dadce0;
  font-size: 18px;
  border-radius: 5px;
  padding-left: 5px;
  height: 40px;
  background-color: #eee;
  &:focus {
    border: 2px solid royally;
  }
`;
export const BusinessDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
export const BusinessType = styled.select`
  padding-left: 5px;
  border-radius: 5px;
  outline: none;
  height: 40px;
  border: 1px solid #dadce0;
  cursor: pointer;
  margin-left: ${(props) => props.ml || "0px"};
`;
export const BusinessOptions = styled.option`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const Button = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={` px-16 py-2 h-11 text-white select-none focus:outline-none bg-[#a07bf8] rounded-md border-none hover:opacity-75 cursor-pointer transition-all ${className}`}
    >
      {children}
    </button>
  );
};

export const ErrorPara = ({ children, className }) => {
  return (
    <p
      className={`text-xs ${className} text-red-600 font-medium p-0 pt-1 pl-1 m-0`}
    >
      {children}
    </p>
  );
};
const BusinessComponent = ({ onChangeHandler, step }) => {
  const [loader, setLoader] = useState(false);

  const initialFormValues = {
    companyName: "",
    businessType: "",
    businessCategory: "",
    description: "",
    website: "",
    city: "",
    state: "",
    address: "",
    pincode: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const temp = BusinessFormValidation(formValues) || {};

    if (Object.keys(temp).length === 0) {
      setError({});

      try {
        setLoader(true);
        const res = await axios.put(
          `${BASE_URL}/merchantbyself/onboard/create`,
          formValues,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("is_logged_in")}`,
            },
          }
        );

      ;
        setLoader(false);
        onChangeHandler(1);
        setFormValues(initialFormValues);
      } catch (error) {
        setLoader(false);
        console.error("Error:", error.message);
      }
    } else {
      setError(temp);
    }
  };

  const inputs = [
    { label: "Company Name :", name: "companyName", type: "input" },
    {
      label: "Business Type :",
      name: "businessType",
      type: "select",
      options: ["a", "b", "c", "d"],
    },
    {
      label: "Business Category :",
      name: "businessCategory",
      type: "select",
      options: ["a", "b", "c", "d"],
    },
    { label: "Description:", name: "description", type: "input" },
    { label: "Website:", name: "website", type: "input" },
    { label: "City:", name: "city", type: "input" },
    { label: "State:", name: "state", type: "input" },
    { label: "Address:", name: "address", type: "input" },
    { label: "Pincode:", name: "pincode", type: "input" },
  ];

  return (
    <>
      <div className="my-4 flex flex-col gap-12 justify-between w-full m-auto min-h-full">
        <form className="grid grid-cols-1 xs:grid-cols-2 w-full sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 md:mt-12 lg:mt-14 p-4">
          {inputs.map((input, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                input.type === "select"
                  ? "md:mt-4 mt-2 lg:mt-4"
                  : "md:mt-4 lg:mt-4 mt-2"
              }`}
            >
              <label className="mb-1">{input.label}</label>
              {input.type === "select" ? (
                <select
                  required
                  name={input.name}
                  onChange={handleChange}
                  value={formValues[input.name]}
                  className="form-control ring-1 mt-1 rounded-lg ring-[#a07bf8] lg:w-72 w-full"
                >
                  <option value="">Please choose one option</option>
                  {input.options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  className="form-control ring-1 rounded-lg ring-[#a07bf8]"
                  name={input.name}
                  value={formValues[input.name]}
                  onChange={handleChange}
                />
              )}
              {error[input.name] && <ErrorPara>{error[input.name]}</ErrorPara>}
            </div>
          ))}
        </form>
        <div className="flex justify-center sm:justify-end relative bottom-2 px-4">
          <button
            className="px-10 py-2 rounded-lg bg-blue-500 text-white"
            onClick={handleClick}
            disabled={loader}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default BusinessComponent;

// const BusinessComponent = ({ onChangeHandler, step }) => {
//   const [loader, setLoader] = useState(false);

//   const formValidObj = {
//     companyName: "",
//     businessType: "",
//     businessCategory: "",
//     description: "",
//     website: "",
//     city: "",
//     state: "",
//     address: "",
//     pincode: "",
//   };
//   const [formValues, setFormValues] = useState(formValidObj);
//   const [error, setError] = useState({});

//   const dispatch = useDispatch();
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//   };
//   const handleClick = (e) => {
//     e.preventDefault();
//     let temp = BusinessFormValidation(formValues);
//     setError(temp);

//     if (temp === null) {
//       // # ____ hitting api on click ____

//       try {
//         setLoader(true);
//         axios
//           .put(`${BASE_URL}/merchantbyself/onboard/create`, formValues, {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("is_logged_in")}`,
//             },
//           })
//           .then((res) => {
//             console.log(res);

//             setLoader(false);
//             onChangeHandler(1);
//             setFormValues({
//               companyName: "",
//               businessType: "",
//               businessCategory: "",
//               description: "",
//               website: "",
//               city: "",
//               state: "",
//               address: "",
//               pincode: "",
//             });
//           });
//       } catch (error) {
//         setLoader(false);
//         console.log(error.message);
//       }
//       // _______________________________________________________________
//     }
//   };

//   const inputs = [
//     { label: "Company Name :", name: "companyName", type: "input" },
//     {
//       label: "Business Type :",
//       name: "businessType",
//       type: "select",
//       options: ["a", "b", "c", "d"],
//     },
//     {
//       label: "Business Category :",
//       name: "businessCategory",
//       type: "select",
//       options: ["a", "b", "c", "d"],
//     },
//     { label: "Description:", name: "description", type: "input" },
//     { label: "Website:", name: "website", type: "input" },
//     { label: "City:", name: "city", type: "input" },
//     { label: "State:", name: "state", type: "input" },
//     { label: "Address:", name: "address", type: "input" },
//     { label: "Pincode:", name: "pincode", type: "input" },
//   ];

//   return (
//     <>
//       <div className=" my-4 flex flex-col gap-12 justify-between w-full m-auto min-h-full">
//         <form className="grid grid-cols-1 xs:grid-cols-2 w-full  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 md:mt-12 lg:mt-14 p-4">
//           {inputs.map((input, idx) => {
//             return input.type === "select" ? (
//               <div key={idx} className="md:mt-4 mt-2 lg:mt-4">
//                 <label className="">{input.label}</label>
//                 <select
//                   required
//                   name={input.name}
//                   onChange={handleChange}
//                   value={formValues[input.name]}
//                   className="form-control ring-1 mt-1 rounded-lg ring-[#a07bf8] lg:w-72 w-full"
//                 >
//                   <option>Please choose one option</option>
//                   {input.options.map((input, index) => (
//                     <option key={index * 3}>{input}</option>
//                   ))}
//                 </select>
//                 <ErrorPara className="text-sm">
//                   {error[input.name] ? error[input.name] : ""}
//                 </ErrorPara>
//               </div>
//             ) : (
//               <div key={idx} className="flex flex-col md:mt-4 lg:mt-4 mt-2">
//                 <label className="mb-1">{input.label}</label>
//                 <input
//                   type="text"
//                   className="form-control ring-1 rounded-lg ring-[#a07bf8]"
//                   name={input.name}
//                   value={formValues[input.name]}
//                   onChange={handleChange}
//                 />
//                 {error[input.name] ? (
//                   <ErrorPara>{error[input.name]}</ErrorPara>
//                 ) : (
//                   ""
//                 )}
//               </div>
//             );
//           })}
//         </form>
//         <div
//           className={`flex justify-center sm:justify-end relative bottom-2 px-4 `}
//         >
//           <button
//             className=" px-10 py-2 rounded-lg bg-blue-500 text-white "
//             onClick={handleClick}
//             disabled={loader}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BusinessComponent;
