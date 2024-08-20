import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { Label, TextInput, Button } from "flowbite-react";
const BusinessDetails = ({ onSubmit2 }) => {
  // Initial values for Formik
  const initialValues = {
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
  const validationSchema = Yup.object({
    companyName: Yup.string().required("Required"),
    businessType: Yup.string().required("Required"),
    businessCategory: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    website: Yup.string().url("Invalid URL").required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    pincode: Yup.string()
      .required("Required")
      .matches(/^\d{6}$/, "Must be exactly 6 digits"),
  });
  const fields = [
    "companyName",
    "businessType",
    "businessCategory",
    "description",
    "website",
    "city",
    "state",
    "address",
    "pincode",
  ];
  return (
    <div className="my-6">
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
        Add Merchant Credentials
      </h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit2}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4">
            {fields.map((field, index) => (
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="name"
                    value={field
                      .replace(/\b\w/g, (char) => char.toUpperCase())
                      .replace(/([A-Z])/g, " $1")
                      .trim()}
                  />
                </div>
                <Field name={field}>
                  {({ field }) => <TextInput {...field} type="text" required />}
                </Field>
                <ErrorMessage
                  className="text-xs pl-1 text-red-500"
                  name={field}
                  component="div"
                />
              </div>
            ))}

            <div className="w-full mt-4">
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BusinessDetails;
