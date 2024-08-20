import React from "react";
import { Label, Select, TextInput } from "flowbite-react";
const BankInfo = ({ handleBlur, handleChange, values, errors, touched }) => {
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
    <div className="flex-col flex gap-4">
      {inputs.map((input, idx) => {
        return input.type === "select" ? (
          <div className="max-w-md" id="select" key={idx}>
            <div className="mb-2 block">
              <Label htmlFor="" value="Business Type" />
            </div>

            <Select
              name={input.name}
              value={values[input.name]}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            >
              <option>Please choose one option</option>
              {input.options.map((opt, idx) => (
                <option key={idx + opt} value={opt}>
                  {opt}
                </option>
              ))}
            </Select>
            {errors[input.name] && touched[input.name] ? (
              <p>{errors[input.name]}</p>
            ) : null}
          </div>
        ) : (
          <div key={idx + "SDsadasdasd"}>
            <div className="mb-2 block">
              <Label value={input.label} />
            </div>
            <TextInput
              name={input.name}
              placeholder="Phone no."
              type="text"
              required
              onChange={handleChange}
              onBlur={handleBlur}
              value={values[input.name]}
            />
            {errors[input.name] && touched[input.name] ? (
              <p>{errors[input.name]}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default BankInfo;
