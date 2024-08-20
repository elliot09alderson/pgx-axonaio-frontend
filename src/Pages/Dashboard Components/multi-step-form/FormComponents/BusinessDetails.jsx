import React, { useEffect } from "react";
import { Label, Select, TextInput } from "flowbite-react";

const BusinessDetails = ({
  BusinessDetails,
  handleBlur,
  handleChange,
  values,
  errors,
  touched,
}) => {
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
    <div className="flex-col flex gap-4">
      {inputs.map((input, idx) => {
        return input.type === "select" ? (
          <div className="max-w-md" id="select" key={idx + "xyz"}>
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
                <option key={idx + "uuu"} value={opt}>
                  {opt}
                </option>
              ))}
            </Select>
            {errors[input.name] && touched[input.name] ? (
              <p>{errors[input.name]}</p>
            ) : null}
          </div>
        ) : (
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

export default BusinessDetails;
