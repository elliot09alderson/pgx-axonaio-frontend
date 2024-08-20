import React, { useState } from "react";
import { useMultiStepForm } from "../../Dashboard Components/OtherComponents/Hook/useMultiStepForm";
import DocumentUpload from "./FormComponents/DocumentUpload.jsx";
import BankInfo from "./FormComponents/BankInfo.jsx";
import { useSelector } from "react-redux";
import { Button, Modal } from "flowbite-react";
import BusinessDetails from "./FormComponents/BusinessDetails";
import PersonalDetails from "./FormComponents/PersonalDetails.jsx";
import axios from "axios";
import { useSnackbar } from "notistack";

import {
  BankSchema,
  BusinessSchema,
  DocumentSchema,
  PersonalSchema,
} from "./FormComponents/FormSchema";

// ********** <This is Main Form Element/>  Read the Hook Page for more info******************
import { useFormik } from "formik";

const MultiStepForm = ({ openModal, setOpenModal }) => {
  let initFormData = {
    name: "",
    email: "",
    phonenumber: "",
    password: "",
    companyName: "",
    businessType: "",
    businessCategory: "",
    description: "",
    website: "",
    city: "",
    state: "",
    address: "",
    pincode: "",
    accountHolderName: "",
    accountType: "",
    accountNumber: "",
    confirmAn: "",
    ifscCode: "",
    branchName: "",
    panNumber: "",
    aadharVoterIdPassportDLNumber: "",
    gstNumber: "",
    cancelledCheque: "",
    companyPan: "",
    registrationCertificate: "",
    cancelledChequeAttachment: null,
    aadharVoterIdPassportAttachment: null,
    panAttachment: null,
  };

  const [formData, setFormData] = useState(initFormData);

  const [formStep, setFormStep] = useState(1);
  const loggedIn = useSelector((state) => state.user);
  const PersonalDetail = {
    name: "",
    email: "",
    phonenumber: "",
    password: "",
    mId: loggedIn.currentUser.m_id,
  };

  const BusinessDetail = {
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

  const DocumentDetail = {
    panNumber: "",
    aadharVoterIdPassportDLNumber: "",
    gstNumber: "",
    cancelledCheque: "",
    companyPan: "",
    registrationCertificate: "",
    cancelledChequeAttachment: "",
    aadharVoterIdPassportAttachment: "",
    panAttachment: "",
  };
  const BankDetail = {
    accountHolderName: "",
    accountType: "",
    accountNumber: "",
    confirmAn: "",
    ifscCode: "",
    branchName: "",
  };
  const { enqueueSnackbar } = useSnackbar();

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    resetForm,
  } = useFormik({
    initialValues:
      formStep === 1
        ? PersonalDetail
        : formStep === 2
        ? BusinessDetail
        : formStep === 3
        ? BankDetail
        : formStep === 4
        ? DocumentDetail
        : null,
    validationSchema:
      formStep === 1
        ? PersonalSchema
        : formStep === 2
        ? BusinessSchema
        : formStep === 3
        ? BankSchema
        : formStep === 4
        ? DocumentSchema
        : null,

    onSubmit: (values) => {
      if (formStep === 4 && Object.keys(errors).length === 0) {
        const { data } = axios.post(
          "http://localhost:5000/create_reseller_merchant",
          {
            values,
          }
        );
        if (data) {
          enqueueSnackbar("Merchant Added Successfully !");
          resetForm();
        }
      }

      setFormData((prev) => ({
        ...prev,
        ...values,
      }));
      console.log(values);
      console.log(errors);
    },
  });

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultiStepForm([
      <PersonalDetails
        handleBlur={handleBlur}
        handleChange={handleChange}
        values={values}
        errors={errors}
        touched={touched}
      />,
      <BusinessDetails
        handleBlur={handleBlur}
        handleChange={handleChange}
        values={values}
        errors={errors}
        touched={touched}
      />,
      <BankInfo
        handleBlur={handleBlur}
        handleChange={handleChange}
        values={values}
        errors={errors}
        touched={touched}
      />,
      <DocumentUpload
        handleBlur={handleBlur}
        handleChange={handleChange}
        values={values}
        errors={errors}
        touched={touched}
      />,
    ]);

  return (
    <div>
      <Modal
        show={openModal === "default"}
        onClose={() => setOpenModal(undefined)}
      >
        <Modal.Header>Add Merchant</Modal.Header>
        <Modal.Body>
          <form>
            <div className="flex max-w-md flex-col gap-4">
              {/* On submit of form it will check for validations then  saves the state then increment the page */}
              <div className="absolute top-1 right-1">
                {currentStepIndex + 1}/{steps.length}
              </div>
              {step}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          {isFirstStep && (
            <Button type="submit" onClick={back}>
              Back
            </Button>
          )}

          <button
            className="bg-gray-200 border px-8 rounded-lg py-2"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              console.log(errors, "error1");
              if (Object.keys(errors).length === 0) {
                console.log(errors);
                console.log(errors, "error2");
                handleSubmit();
                setFormStep(formStep + 1);
                next();
                if (currentStepIndex > 3) {
                  setOpenModal(undefined);
                }
              }
            }}
          >
            {isLastStep ? "Finsh" : "Next"}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MultiStepForm;
