import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { Label, TextInput, Button } from "flowbite-react";

const BasicDetails = ({ onSubmit }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    password: Yup.string().required("Password is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phonenumber: Yup.string().required("Phone number is required"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const initialValues = {
    name: "",
    password: "",
    email: "",
    phonenumber: "",
    confirmpassword: "",
  };

  return (
    <div className="my-6">
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
        Add Merchant Credentials
      </h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Name" />
              </div>
              <Field id="name" name="name">
                {({ field }) => (
                  <TextInput
                    {...field}
                    type="text"
                    placeholder="John Doe"
                    required
                  />
                )}
              </Field>
              <ErrorMessage
                className="text-xs pl-1 text-red-500"
                name="name"
                component="div"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <Field id="email" name="email" placeholder="123@mail.com">
                {({ field }) => (
                  <TextInput
                    {...field}
                    type="email"
                    placeholder="Email"
                    required
                  />
                )}
              </Field>
              <ErrorMessage
                className="text-xs pl-1 text-red-500"
                name="email"
                component="div"
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="phone" value="Phone" />
              </div>

              <Field id="phonenumber" name="phonenumber">
                {({ field }) => (
                  <TextInput
                    {...field}
                    type="text"
                    placeholder="+91 XXXXXXX"
                    required
                  />
                )}
              </Field>
              <ErrorMessage
                className="text-xs pl-1 text-red-500"
                name="phonenumber"
                component="div"
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Password" />
              </div>
              <Field name="password">
                {({ field }) => (
                  <TextInput
                    {...field}
                    type="password"
                    placeholder="xxxxxxxx"
                    required
                  />
                )}
              </Field>
              <ErrorMessage
                className="text-xs pl-1 text-red-500"
                name="password"
                component="div"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Confirm Password" />
              </div>
              <Field name="confirmpassword">
                {({ field }) => (
                  <TextInput
                    {...field}
                    type="password"
                    placeholder="xxxxxxxx"
                    required
                  />
                )}
              </Field>
              <ErrorMessage
                className="text-xs pl-1 text-red-500"
                name="confirmpassword"
                component="div"
              />
            </div>

            <div className="w-full mt-4">
              <Button type="submit" disabled={isSubmitting}>
                Add Merchant Account
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BasicDetails;
