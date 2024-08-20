import React, { useState, useEffect } from "react";
// responsive done
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { addDetail } from "../Data/apis";
import {
  ToastErrorNotifications,
  ToastSuccessNotifications,
} from "../../../utils/Notifications/ToastNotifications.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useSnackbar } from "notistack";
import {
  create_radmin_reseller,
  get_radmin_reseller,
  messageClear,
} from "../../../redux/resellerAdmin/resellerAdmin.js";

const OnboardReseller = ({ setOpenModal }) => {
  const {
    radminMerchants,
    radminResellers,
    resellerMerchants,
    payinTransaction,
    successMessage,
    errorMessage,
    loader,
  } = useSelector((state) => state.reselleradmin);
  const { mode } = useSelector((state) => state.user);

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (errorMessage) {
      enqueueSnackbar(errorMessage);
    }
    if (successMessage) {
      enqueueSnackbar(successMessage);
    }
    dispatch(messageClear());
  }, [errorMessage, successMessage]);

  const [currentStep, setCurrentStep] = useState(1);

  const Step1Schema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Name is required"),
    password: Yup.string().required("Password is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phonenumber: Yup.string()
      .required("Phone number is required")
      .min(10, "Too Short!")
      .max(10, "Too Long!"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const Step2Schema = Yup.object({
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

  const Step3Schema = Yup.object().shape({
    panNumber: Yup.string()
      .required("Pan Number is required")
      .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid Pan Number format"),
    panAttachment: Yup.mixed()
      .required("Pan Attachment is required")
      .test(
        "fileSize",
        "File too large",
        (value) => value && value.size <= 2000000
      )
      .test(
        "fileFormat",
        "Unsupported Format",
        (value) =>
          value &&
          ["application/pdf", "image/jpeg", "image/png"].includes(value.type)
      ),
    aadharVoterIdPassportDLNumber: Yup.string().required(
      "Authorised Identity Number is required"
    ),
    gstNumber: Yup.string()
      .required("GST Number is required")
      .matches(
        /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/,
        "Invalid GST Number format"
      ),
    cancelledCheque: Yup.string().required("Cancelled Cheque is required"),
    companyPan: Yup.string().required("Company Pan is required"),
    registrationCertificate: Yup.string().required(
      "Registration Certificate is required"
    ),
    cancelledChequeAttachment: Yup.mixed()
      .required("Cancelled Cheque Attachment is required")
      .test(
        "fileSize",
        "File too large",
        (value) => value && value.size <= 2000000
      )
      .test(
        "fileFormat",
        "Unsupported Format",
        (value) =>
          value &&
          ["application/pdf", "image/jpeg", "image/png"].includes(value.type)
      ),
    aadharVoterIdPassportAttachment: Yup.mixed()
      .required("Authorised Id Attachment is required")
      .test(
        "fileSize",
        "File too large",
        (value) => value && value.size <= 2000000
      )
      .test(
        "fileFormat",
        "Unsupported Format",
        (value) =>
          value &&
          ["application/pdf", "image/jpeg", "image/png"].includes(value.type)
      ),
  });

  const onSubmitStepOne = (values) => {
    console.log("first step", values);
    setCurrentStep(currentStep + 1);
  };

  const onSubmitStepTwo = (values) => {
    console.log("second step", values);

    setCurrentStep(currentStep + 1);
  };

  const [agreeError, setAgreeError] = useState("");

  const onSubmitStepThree = async (values, resetForm) => {
    console.log(values);

    if (values.agree == false) {
      ToastErrorNotifications(
        "Please Agree to Terms and Conditions to Continue"
      );
      setAgreeError("Please Agree to Terms and Conditions to Continue");
    } else {
      setAgreeError("");
      const response = "xyz";
      const formData = new FormData();

      // Append all form fields to the FormData object
      Object.keys(values).forEach((key) => {
        if (values[key] instanceof File) {
          formData.append(key, values[key]);
        } else {
          formData.append(key, values[key]);
        }
      });

      // console.log(response, "Three Final submission");
      console.log("disptching");
      dispatch(create_radmin_reseller({ values: formData, mode })).then(() => {
        resetForm();
        setOpenModal(false);
        dispatch(get_radmin_reseller({ mode }));
      });

      ToastSuccessNotifications("merchant created successfully");

      if (response.success == true) {
        localStorage.setItem("activation_form", 1);
        ToastSuccessNotifications(response);
        // navigate("/home");
      } else {
        ToastErrorNotifications(response.message);
      }
    }
  };

  return (
    // WITH RESPONSIVE
    <div className=" min-h-[60vh] bg-white flex items-center rounded-xl my-8  justify-center">
      <div className="w-full sm:w-auto">
        <div className="card rounded-lg px-8  sm:px-16 py-8 ">
          <div>
            <div className="text-center ">
              <div className="">
                <h2 className="text-2xl mb-4 font-semibold text-gray-800 dark:text-white">
                  Onboarding
                </h2>

                <div>
                  <div className="flex justify-center mt-3 mb-5">
                    <ol className="steps">
                      <li className="step before:bg-gray-300 dark:before:bg-gray-700">
                        <div
                          className={`step-header rounded-full ${
                            currentStep === 1
                              ? "tairo-bg-blue text-white"
                              : "bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-white"
                          }`}
                        >
                          1
                        </div>
                        <h3 className="text-gray-800 dark:text-white">
                          Profile Details
                        </h3>
                      </li>
                      <li className="step before:bg-gray-300 dark:before:bg-gray-700">
                        <div
                          className={`step-header rounded-full ${
                            currentStep === 2
                              ? "tairo-bg-blue text-white"
                              : "bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-white"
                          }`}
                        >
                          2
                        </div>
                        <h3 className="text-gray-800 dark:text-white">
                          Business Details
                        </h3>
                      </li>
                      <li className="step before:bg-gray-300 dark:before:bg-gray-700">
                        <div
                          className={`step-header rounded-full ${
                            currentStep === 3
                              ? "tairo-bg-blue text-white"
                              : "bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-white"
                          }`}
                        >
                          3
                        </div>
                        <h3 className="text-gray-800 dark:text-white">
                          Document Details
                        </h3>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Formik
                initialValues={{
                  name: "",
                  password: "",
                  email: "",
                  phonenumber: "",
                  confirmpassword: "",
                  companyName: "",
                  businessType: "",
                  businessCategory: "",
                  description: "",
                  website: "",
                  city: "",
                  state: "",
                  address: "",
                  pincode: "",
                  agree: false,

                  panNumber: "",
                  panAttachment: null,
                  aadharVoterIdPassportDLNumber: "",
                  gstNumber: "",
                  cancelledCheque: "",
                  companyPan: "",
                  registrationCertificate: "",
                  cancelledChequeAttachment: null,
                  aadharVoterIdPassportAttachment: null,
                }}
                validationSchema={
                  // Your validation schema
                  currentStep === 1
                    ? Step1Schema
                    : currentStep === 2
                    ? Step2Schema
                    : Step3Schema
                }
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  // Your form submission logic
                  currentStep === 1
                    ? onSubmitStepOne(values)
                    : currentStep === 2
                    ? onSubmitStepTwo(values)
                    : onSubmitStepThree(values, setSubmitting, resetForm);
                }}
              >
                {({
                  isSubmitting,
                  errors,
                  touched,
                  setFieldValue,
                  setSubmitting,
                  resetForm,
                }) => (
                  <Form className="w-full sm:w-auto">
                    {/* Your form fields */}

                    {currentStep === 1 && (
                      <>
                        <div className="flex flex-col gap-5">
                          <h2 className="text-xl">Personal Details</h2>
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div>
                              <label htmlFor="name">Name:</label>
                              <Field
                                type="text"
                                className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                                name="name"
                                placeholder="Enter Name"
                              />
                              {errors.name && touched.name ? (
                                <div className="text-red-500">
                                  {errors.name}
                                </div>
                              ) : null}
                            </div>

                            <div>
                              <label htmlFor="dob">Email</label>
                              <Field
                                type="email"
                                className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                                name="email"
                                placeholder="Enter Email"
                              />
                              {errors.email && touched.email ? (
                                <div className="text-red-500">
                                  {errors.email}
                                </div>
                              ) : null}
                            </div>

                            <div>
                              <label htmlFor="email">Phone Number:</label>
                              <Field
                                type="number"
                                className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                                name="phonenumber"
                                placeholder="Enter Phone number"
                              />
                              {errors.phonenumber && touched.phonenumber ? (
                                <div className="text-red-500">
                                  {errors.phonenumber}
                                </div>
                              ) : null}
                            </div>

                            <div>
                              <label htmlFor="mobile">Password </label>
                              <Field
                                type="password"
                                className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                                name="password"
                                placeholder="Enter password"
                              />
                              {errors.password && touched.password ? (
                                <div className="text-red-500">
                                  {errors.password}
                                </div>
                              ) : null}
                            </div>

                            <div>
                              <label htmlFor="confirmpassword">
                                Confirm Password:
                              </label>
                              <Field
                                type="password"
                                className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                                name="confirmpassword"
                                placeholder="Enter confirmpassword"
                              />
                              {errors.confirmpassword &&
                              touched.confirmpassword ? (
                                <div className="text-red-500">
                                  {errors.confirmpassword}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {currentStep === 2 && (
                      <>
                        <div>
                          <h2 className="text-xl mb-4">Business Details </h2>
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div>
                              <label htmlFor="address">Company Name:</label>
                              <Field
                                type="text"
                                className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                                name="companyName"
                              />
                              {errors.companyName && touched.companyName ? (
                                <div className="text-red-500">
                                  {errors.companyName}
                                </div>
                              ) : null}
                            </div>

                            <div>
                              <label htmlFor="businessType">
                                Business Type
                              </label>
                              <Field
                                type="text"
                                className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                                name="businessType"
                              />
                              {errors.businessType && touched.businessType ? (
                                <div className="text-red-500">
                                  {errors.businessType}
                                </div>
                              ) : null}
                            </div>
                            <div>
                              <label htmlFor="state">Business Category</label>
                              <Field
                                type="text"
                                className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                                name="businessCategory"
                              />
                              {errors.businessCategory &&
                              touched.businessCategory ? (
                                <div className="text-red-500">
                                  {errors.businessCategory}
                                </div>
                              ) : null}
                            </div>
                            <div>
                              <label htmlFor="district">Description</label>
                              <Field
                                type="text"
                                className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                                name="description"
                              />
                              {errors.description && touched.description ? (
                                <div className="text-red-500">
                                  {errors.description}
                                </div>
                              ) : null}
                            </div>
                            <div>
                              <label htmlFor="city">website</label>
                              <Field
                                type="text"
                                className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                                name="website"
                              />
                              {errors.website && touched.website ? (
                                <div className="text-red-500">
                                  {errors.website}
                                </div>
                              ) : null}
                            </div>
                            <div>
                              <label htmlFor="city">city</label>
                              <Field
                                type="text"
                                className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                                name="city"
                              />
                              {errors.city && touched.city ? (
                                <div className="text-red-500">
                                  {errors.city}
                                </div>
                              ) : null}
                            </div>

                            <div>
                              <label htmlFor="father_name">State</label>
                              <div>
                                <Field
                                  type="text"
                                  className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                                  name="state"
                                />
                              </div>
                              {errors.state && touched.state ? (
                                <div className="text-red-500">
                                  {errors.state}
                                </div>
                              ) : null}
                            </div>

                            <div>
                              <label htmlFor="address">address</label>
                              <div>
                                <Field
                                  type="text"
                                  className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                                  name="address"
                                />
                              </div>
                              {errors.address && touched.address ? (
                                <div className="text-red-500">
                                  {errors.address}
                                </div>
                              ) : null}
                            </div>
                            <div>
                              <label htmlFor="father_occupation">pincode</label>
                              <div>
                                <Field
                                  type="text"
                                  className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                                  name="pincode"
                                />
                              </div>
                              {errors.pincode && touched.pincode ? (
                                <div className="text-red-500">
                                  {errors.pincode}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {currentStep === 3 && (
                      <>
                        <div className="flex flex-col gap-5">
                          <h2 className="text-xl"> Document Details</h2>
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                            <div>
                              <label htmlFor="panNumber">Pan Number</label>
                              <Field
                                type="text"
                                className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                                name="panNumber"
                                placeholder="Enter pan number"
                              />
                              {errors.panNumber && touched.panNumber ? (
                                <div className="text-red-500">
                                  {errors.panNumber}
                                </div>
                              ) : null}
                            </div>

                            <div>
                              <label htmlFor="dob">Pan Attachment</label>
                              <input
                                type="file"
                                className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                                name="panAttachment"
                                placeholder="Enter panAttachment"
                                onChange={(event) => {
                                  console.log(event.target.files[0]);
                                  setFieldValue(
                                    "panAttachment",
                                    event.currentTarget.files[0]
                                  );
                                }}
                              />
                              {errors.panAttachment && touched.panAttachment ? (
                                <div className="text-red-500">
                                  {errors.panAttachment}
                                </div>
                              ) : null}
                            </div>
                            <div>
                              <label htmlFor="aadharVoterIdPassportAttachment">
                                Identity Attachment
                              </label>
                              <input
                                type="file"
                                className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                                name="aadharVoterIdPassportAttachment"
                                placeholder="Enter Identity Attachment"
                                onChange={(event) => {
                                  setFieldValue(
                                    "aadharVoterIdPassportAttachment",
                                    event.currentTarget.files[0]
                                  );
                                }}
                              />
                              {errors.aadharVoterIdPassportAttachment &&
                              touched.aadharVoterIdPassportAttachment ? (
                                <div className="text-red-500">
                                  {errors.aadharVoterIdPassportAttachment}
                                </div>
                              ) : null}
                            </div>
                            <div>
                              <label htmlFor="dob">
                                {" "}
                                Authorised Identity Number
                              </label>
                              <Field
                                type="text"
                                className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                                name="aadharVoterIdPassportDLNumber"
                                placeholder="aadharVoterIdPassportDLNumber"
                              />
                              {errors.aadharVoterIdPassportDLNumber &&
                              touched.aadharVoterIdPassportDLNumber ? (
                                <div className="text-red-500">
                                  {errors.aadharVoterIdPassportDLNumber}
                                </div>
                              ) : null}
                            </div>
                            <div>
                              <label htmlFor="dob">Gst Number</label>
                              <Field
                                type="text"
                                className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                                name="gstNumber"
                                placeholder="Gst Number"
                              />
                              {errors.gstNumber && touched.gstNumber ? (
                                <div className="text-red-500">
                                  {errors.gstNumber}
                                </div>
                              ) : null}
                            </div>
                            <div>
                              <label htmlFor="dob">
                                Cancelled Cheque number:
                              </label>
                              <Field
                                type="text"
                                className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                                name="cancelledCheque"
                                placeholder="Enter Cancelled Cheque number:"
                              />
                              {errors.cancelledCheque &&
                              touched.cancelledCheque ? (
                                <div className="text-red-500">
                                  {errors.cancelledCheque}
                                </div>
                              ) : null}
                            </div>

                            <div>
                              <label htmlFor="text">Company Pan</label>
                              <Field
                                type="text"
                                className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                                name="companyPan"
                                placeholder="Enter Company Pan"
                              />
                              {errors.companyPan && touched.companyPan ? (
                                <div className="text-red-500">
                                  {errors.companyPan}
                                </div>
                              ) : null}
                            </div>

                            <div>
                              <label htmlFor="mobile">
                                Registration Certificate:{" "}
                              </label>
                              <Field
                                type="text"
                                className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                                name="registrationCertificate"
                                placeholder="Enter registration Certificate number"
                              />
                              {errors.registrationCertificate &&
                              touched.registrationCertificate ? (
                                <div className="text-red-500">
                                  {errors.registrationCertificate}
                                </div>
                              ) : null}
                            </div>

                            <div>
                              <label htmlFor="cancelledChequeAttachment">
                                Cancelled Cheque Attachment:
                              </label>
                              <input
                                type="file"
                                className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3  placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                                name="cancelledChequeAttachment"
                                placeholder="Enter Checque Attachment"
                                onChange={(event) => {
                                  setFieldValue(
                                    "cancelledChequeAttachment",
                                    event.currentTarget.files[0]
                                  );
                                }}
                              />
                              {console.log(errors)}
                              {errors.cancelledChequeAttachment &&
                              touched.cancelledChequeAttachment ? (
                                <div className="text-red-500">
                                  {errors.cancelledChequeAttachment}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>

                        <div className="mt-8 mb-2">
                          <h2 className="text-xl">Terms and Condition</h2>
                        </div>

                        <label className="inline-flex items-center space-x-2">
                          <Field
                            name="agree"
                            className="form-checkbox is-outline h-5 w-5 rounded border-slate-400/70 before:bg-slate-500 checked:border-slate-500 hover:border-slate-500 focus:border-slate-500 dark:border-navy-400 dark:before:bg-navy-200 dark:checked:border-navy-200 dark:hover:border-navy-200 dark:focus:border-navy-200"
                            type="checkbox"
                          />
                          <p>
                            By checking this you agree to all the terms and
                            conditions mentioned above
                          </p>
                        </label>
                        {agreeError != "" ? (
                          <div className="text-red-500">{agreeError}</div>
                        ) : (
                          ""
                        )}
                      </>
                    )}

                    <div className="flex justify-center  gap-12 mt-8">
                      <button
                        type="button"
                        className={`tairo-bg-blue ${
                          currentStep === 1 ? "tairo-bg" : ""
                        }  px-6 py-2  rounded-lg text-white`}
                        onClick={() => setCurrentStep(currentStep - 1)}
                        disabled={currentStep === 1}
                      >
                        Prev
                      </button>
                      <button
                        type="submit"
                        disabled={loader}
                        className={` tairo-bg-blue ${
                          loader ? " opacity-50 " : ""
                        } duration-500  px-6 py-2  rounded-lg text-white`}
                        onClick={() => {
                          console.log(currentStep);
                        }}
                      >
                        Next
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardReseller;
