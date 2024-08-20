import React, { useEffect } from "react";
import { Label, TextInput, Select, FileInput } from "flowbite-react";

const DocumentUpload = ({
  handleBlur,
  handleChange,
  values,
  errors,
  touched,
}) => {
  const inputs = [
    { label: "Pan Number:", name: "panNumber", type: "text" },
    { label: "Pan Attachment:", name: "panAttachment", type: "file" },
    {
      label: " Authorised Identity Number:",
      name: "aadharVoterIdPassportDLNumber",
      type: "text",
    },
    { label: "Gst Number:", name: "gstNumber", type: "text" },
    { label: "Cancelled Cheque number:", name: "cancelledCheque", type: "text" },
    { label: "Company Pan:", name: "companyPan", type: "text" },
    {
      label: "Registration Certificate:",
      name: "registrationCertificate",
      type: "text",
    },
    {
      label: "Cancelled Cheque Attachment:",
      name: "cancelledChequeAttachment",
      type: "file",
    },
    {
      label: " Authorised Id Attachment:",
      name: "aadharVoterIdPassportAttachment",
      type: "file",
    },
  ];

  // formData.append('panNumber', panNumber)

  return (
    <>
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
          ) : input.type === "file" ? (
            <div key={idx + "abc"}>
              <div className="mb-2 block">
                <Label value={input.label} />
              </div>
              <FileInput
                id="file"
                name={input.name}
                required
                onChange={(e) => {
                  handleChange(e);
                  // formData.append(input.name,values.input[name])
                }}
                onBlur={handleBlur}
                value={values[input.name]}
              />
              {errors[input.name] && touched[input.name] ? (
                <p>{errors[input.name]}</p>
              ) : null}
            </div>
          ) : (
            <div key={idx + "abc"}>
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
    </>
  );
};

export default DocumentUpload;
