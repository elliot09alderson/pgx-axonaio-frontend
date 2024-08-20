import { useEffect, useState } from "react";
// import { DocumentUploadFormValidation } from "../../utils/validation";
import { Button, ErrorPara } from "./BusinessComponent";
import { ButtonDiv } from "./BankDetailsComponent";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import { DocumentUploadFormValidation } from "../../utils/basicFormValidation";
import { onFailure } from "../../utils/error";
import { BASE_URL } from "../../utils/requestMethod";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/userRedux";
import validateFile from "../../utils/FileRestriction";
import { areAllValuesNull } from "../../utils/objectKeyNullOrNot";
import {
  ToastErrorNotifications,
  ToastSuccessNotifications,
} from "../../utils/Notifications/ToastNotifications.js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ThreeDots } from "react-loader-spinner";

const DocumentUploadComponent = ({ onChangeHandler, step }) => {
  const [loader, setLoader] = useState(false);
  const formValidObj = {
    panNumber: "",
    aadharVoterIdPassportDLNumber: "",
    gstNumber: "",
    cancelledCheque: "",
    companyPan: "",
    registrationCertificate: "",
  };
  const [formValues, setFormValues] = useState(formValidObj);
  const [attachment, setAttachment] = useState({
    cancelledChequeAttachment: "",
    aadharVoterIdPassportAttachment: "",
    panAttachment: "",
  });

  const [error, setError] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onBack = () => {
    onChangeHandler(1);
  };

  const [agreeError, setAgreeError] = useState("");

  const onSubmitStepThree = async (values) => {
    console.log("values===>", values);

    if (values.agree == false) {
      ToastErrorNotifications(
        "Please Agree to Terms and Conditions to Continue"
      );
      setAgreeError("Please Agree to Terms and Conditions to Continue");
    } else {
      setAgreeError("");

      const formData = new FormData();

      // Append all form fields to the FormData object
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      console.log("formData===>", formData);

      // console.log(response, "Three Final submission");

      try {
        setLoader(true);
        axios
          .put(`${BASE_URL}/merchantbyself/onboard/create`, formData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("is_logged_in")}`,
            },
          })
          .then((res) => {
            console.log(res);
            setLoader(false);
         
            dispatch(loginSuccess(res.data.user));
          });
      } catch (error) {
        setLoader(false);
        console.log(error.message);
      }
      console.log("formData===>", formData);

      // dispatch(createMerchant({ datax: formData }));
      ToastSuccessNotifications("merchant created successfully");
    }
  };

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
    companyPan: Yup.string()
      .required("Company Pan is required")
      .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid Pan Number format"),
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

  // # _____ fetch the data when comonent loaded ____

  // useEffect(() => {
  //   const fetchBusinNess = async () => {
  //     let obj = formValidObj;
  //     let obj2 = attachment;
  //     try {
  //       const res = await axios.get(`${BASE_URL}/document/fetch`, {
  //         headers: { Authorization: `Bearer ${localStorage.getItem("is_logged_in")}` },
  //       });
  //       if (res.data) {
  //         Object.keys(obj).forEach((item) => {
  //           obj[item] = res.data[item];
  //         });
  //         Object.keys(obj2).forEach((item) => {
  //           obj2[item] = res.data[item];
  //         });
  //         setFormValues({ ...formValues, obj });
  //         setAttachment({ ...attachment, obj2 });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       onFailure(error, dispatch);
  //     }
  //   };
  //   fetchBusinNess();
  // }, []);
  // __________________________________________________________________________________

  return (
    <>
      {loader ? (
        <div className="fixed h-[100vh] w-[100vw] bg-blue-300 flex items-center justify-center top-0 left-0">
          <div className="flex flex-col items-center justify-center gap-3">
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#a07bf8"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
            <h2 className="text-white lg:text-lg text-sm">Please wait ..</h2>
            <h2 className="text-white lg:text-lg text-sm">
              we are submitting the details.
            </h2>
          </div>
        </div>
      ) : (
        <Formik
          initialValues={{
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
          validationSchema={Step3Schema}
          onSubmit={(values) => {
            console.log("values of field three ", values);
            onSubmitStepThree(values);
          }}
        >
          {({
            isSubmitting,
            errors,
            touched,
            setFieldValue,
            setSubmitting,
          }) => (
            <Form className="w-full sm:w-auto">
              <div className="flex flex-col gap-5">
                <h2 className="text-xl text-center mt-4 "> Document Details</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4 px-2">
                  <div>
                    <label htmlFor="panNumber">Pan Number</label>
                    <Field
                      type="text"
                      className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                      name="panNumber"
                      placeholder="Enter pan number"
                    />
                    {errors.panNumber && touched.panNumber ? (
                      <div className="text-red-500">{errors.panNumber}</div>
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
                      <div className="text-red-500">{errors.panAttachment}</div>
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
                    <label htmlFor="dob"> Authorised Identity Number</label>
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
                      <div className="text-red-500">{errors.gstNumber}</div>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="dob">Cancelled Cheque number:</label>
                    <Field
                      type="text"
                      className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                      name="cancelledCheque"
                      placeholder="Enter Cancelled Cheque number:"
                    />
                    {errors.cancelledCheque && touched.cancelledCheque ? (
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
                      <div className="text-red-500">{errors.companyPan}</div>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="mobile">Registration Certificate: </label>
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
                    {errors.cancelledChequeAttachment &&
                    touched.cancelledChequeAttachment ? (
                      <div className="text-red-500">
                        {errors.cancelledChequeAttachment}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="mt-8 mb-2 mx-4">
                <h2 className="text-lg">Terms and Condition</h2>
              </div>

              <label className="inline-flex items-center mx-4 space-x-2">
                <Field
                  name="agree"
                  className="form-checkbox is-outline h-5 w-5 rounded border-slate-400/70 before:bg-slate-500 checked:border-slate-500 hover:border-slate-500 focus:border-slate-500 dark:border-navy-400 dark:before:bg-navy-200 dark:checked:border-navy-200 dark:hover:border-navy-200 dark:focus:border-navy-200"
                  type="checkbox"
                />
                <p>
                  By checking this you agree to all the terms and conditions
                  mentioned above
                </p>
              </label>
              {agreeError != "" ? (
                <div className="text-red-500">{agreeError}</div>
              ) : (
                ""
              )}

              <div
                className={`flex px-4 flex-col sm:flex-row mt-8 gap-5 ${
                  step > 0 ? "justify-between" : "justify-end"
                } `}
              >
                {step ? (
                  <Button onClick={onBack} disabled={loader}>
                    Prev
                  </Button>
                ) : (
                  ""
                )}
                <button
                  className="px-10 py-2 rounded-lg bg-blue-500 text-white"
                  type="submit"
                  disabled={loader}
                >
                  {step > 2 ? "Next" : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default DocumentUploadComponent;
