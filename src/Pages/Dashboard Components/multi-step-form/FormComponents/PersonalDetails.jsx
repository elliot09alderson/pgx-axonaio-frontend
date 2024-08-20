import React, { useEffect } from "react";
import { Label, Select, TextInput } from "flowbite-react";

const PersonalDetails = ({
  PersonalDetails,
  handleBlur,
  handleChange,
  values,
  errors,
  touched,
}) => {
  const inputs = [
    { label: "Merchant Name :", name: "name", type: "input" },
    {
      label: "Phone Number :",
      name: "phonenumber",
      type: "input",
    },
    {
      label: "E-mail :",
      name: "email",
      type: "input",
    },
    {
      label: "Password :",
      name: "password",
      type: "password",
    },
  ];

  return (
    <div className="flex-col flex gap-4">
      {inputs.map((input, idx) => {
        return (
          <div key={idx + "xyz"}>
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

export default PersonalDetails;
