import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { BankDetailsFormValidation } from "../../utils/basicFormValidation";
import { onFailure } from "../../utils/error";

import { BASE_URL } from "../../utils/requestMethod";
import { Button, ErrorPara } from "./BusinessComponent";
import { useDispatch } from "react-redux";
export const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BankDetailsComponent = ({ onChangeHandler, step }) => {
  const [loader, setLoader] = useState(false);

  const formValidObj = {
    accountHolderName: "",
    accountType: "",
    accountNumber: "",
    confirmAn: "",
    ifscCode: "",
    branchName: "",
  };

  const [formValues, setFormValues] = useState(formValidObj);
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const temp = BankDetailsFormValidation(formValues) || {};

    if (Object.keys(temp).length === 0) {
      // No validation errors
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

        console.log(res);
        setLoader(false);
        onChangeHandler(2);
      } catch (error) {
        setLoader(false);
        console.error("Error:", error.message);
      }
    } else {
      // Set validation errors
      setError(temp);
    }
  };

  const onBack = () => {
    onChangeHandler(0);
  };

  const inputs = [
    { label: "Account Holder Name:", name: "accountHolderName", type: "input" },
    {
      label: "Account Type:",
      name: "accountType",
      type: "select",
      options: ["a", "b", "c", "d"],
    },
    { label: "Account Number:", name: "accountNumber", type: "input" },
    { label: "Confirm AN:", name: "confirmAn", type: "input" },
    { label: "IFSC Code:", name: "ifscCode", type: "input" },
    { label: "Branch Name:", name: "branchName", type: "input" },
  ];

  return (
    <div className="my-4 flex flex-col gap-12 justify-between w-full m-auto min-h-full">
      <form className="grid grid-cols-1 xs:grid-cols-2 w-full sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 md:mt-12 lg:mt-12 p-4">
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
                name={input.name}
                onChange={handleChange}
                value={formValues[input.name]}
                className="form-control ring-1 mt-2 rounded-lg ring-[#a07bf8] lg:w-72 w-full"
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
                className="form-control ring-1 mt-1 rounded-lg ring-[#a07bf8] lg:w-72 w-full"
                name={input.name}
                value={formValues[input.name]}
                onChange={handleChange}
              />
            )}
            {error[input.name] && <ErrorPara>{error[input.name]}</ErrorPara>}
          </div>
        ))}
      </form>
      <div
        className={`flex px-4 sm:h-[24vh] items-end ${
          step > 0 ? "justify-between" : "justify-end"
        }`}
      >
        {step ? (
          <button
            className="px-10 py-2 rounded-lg bg-blue-500 text-white"
            onClick={onBack}
            disabled={loader}
          >
            Prev
          </button>
        ) : null}
        <button
          onClick={handleClick}
          className="px-10 py-2 rounded-lg bg-blue-500 text-white"
          disabled={loader}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BankDetailsComponent;

// const BankDetailsComponent = ({ onChangeHandler, step }) => {
//   const [loader, setLoader] = useState(false);

//   const dispatch = useDispatch();
//   const formValidObj = {
//     accountHolderName: "",
//     accountType: "",
//     accountNumber: "",
//     confirmAn: "",
//     ifscCode: "",
//     branchName: "",
//   };
//   const [formValues, setFormValues] = useState(formValidObj);
//   const [error, setError] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({ ...formValues, [name]: value });
//     // let err = BankDetailsFormValidation({ name, value })
//     // setError(pre => ({ ...error, ...err }))
//   };

//   const handleClick = (e) => {
//     e.preventDefault();
//     const temp = BankDetailsFormValidation(formValues);
//     setError(temp);
//     if (temp === null) {
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
//             onChangeHandler(2);
//           });
//       } catch (error) {
//         setLoader(false);
//         console.log(error.message);
//       }
//     }
//   };
//   const onBack = () => {
//     onChangeHandler(0);
//   };

//   const inputs = [
//     { label: "Account Holder Name:", name: "accountHolderName", type: "input" },
//     {
//       label: "Account Type:",
//       name: "accountType",
//       type: "select",
//       options: ["a", "b", "c", "d"],
//     },
//     { label: "Account Number:", name: "accountNumber", type: "input" },
//     { label: "Confirm AN:", name: "confirmAn", type: "input" },
//     { label: "IFSC Code:", name: "ifscCode", type: "input" },
//     { label: "Branch Name:", name: "branchName", type: "input" },
//   ];
//   return (
//     <div className=" my-4 flex flex-col gap-12 justify-between w-full m-auto min-h-full">
//       <form className="grid grid-cols-1 xs:grid-cols-2 w-full  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 md:mt-12 lg:mt-12 p-4">
//         {inputs.map((input, idx) => {
//           return input.type === "select" ? (
//             <div key={idx / 2} className="md:mt-4 mt-2 lg:mt-4">
//               <label className="">{input.label}</label>
//               <select
//                 name={input.name}
//                 onChange={handleChange}
//                 value={formValues[input.name]}
//                 className="form-control ring-1 mt-2 rounded-lg ring-[#a07bf8] lg:w-72 w-full"
//               >
//                 <option>Please choose one option</option>

//                 {input.options.map((input, index) => (
//                   <option key={index * 3}>{input}</option>
//                 ))}
//               </select>
//               <ErrorPara>
//                 {error[input.name] ? error[input.name] : ""}
//               </ErrorPara>
//             </div>
//           ) : (
//             <div className="flex flex-col md:mt-4 lg:mt-4 mt-2">
//               <label className="mb-1">{input.label}</label>
//               <input
//                 type="text"
//                 className="form-control ring-1 mt-1 rounded-lg ring-[#a07bf8] lg:w-72 w-full"
//                 name={input.name}
//                 value={formValues[input.name]}
//                 onChange={handleChange}
//               />
//               {error[input.name] ? (
//                 <ErrorPara>{error[input.name]}</ErrorPara>
//               ) : (
//                 ""
//               )}
//             </div>
//           );
//         })}
//       </form>
//       <div
//         className={`flex px-4 sm:h-[24vh] items-end ${
//           step > 0 ? "justify-between" : "justify-end"
//         } `}
//       >
//         {step ? (
//           <button
//             className="px-10 py-2 rounded-lg bg-blue-500 text-white"
//             onClick={onBack}
//             disabled={loader}
//           >
//             Prev
//           </button>
//         ) : (
//           ""
//         )}
//         <button
//           onClick={handleClick}
//           className="px-10 py-2 rounded-lg bg-blue-500 text-white"
//           disabled={loader}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BankDetailsComponent;
