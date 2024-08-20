import * as Yup from "yup";

export const BusinessSchema = Yup.object({
  companyName: Yup.string().min(3).max(25).required("please enter companyName"),
  businessType: Yup.string().required("please enter business Type"),
  businessCategory: Yup.string().required("please enter business Category"),
  description: Yup.string().min(3).max(25).required("please enter description"),
  website: Yup.string().min(3).max(25).required("please enter website"),
  city: Yup.string().min(3).max(25).required("please enter city"),
  state: Yup.string().min(3).max(25).required("please enter state"),
  address: Yup.string().min(3).max(25).required("please enter address"),
  pincode: Yup.string().min(3).max(12).required("please enter pincode"),
});

export const DocumentSchema = Yup.object().shape({
  panAttachment: Yup.mixed().required("File is required"),
  cancelledChequeAttachment: Yup.mixed().required("File is required"),

  aadharVoterIdPassportAttachment: Yup.mixed().required("File is required"),
  aadharVoterIdPassportDLNumber: Yup.string()
    .min(3)
    .max(25)
    .required("please enter the required information"),
  panNumber: Yup.string().min(3).max(25).required("please enter pan number"),
  cancelledCheque: Yup.string()
    .min(3)
    .max(25)
    .required("please enter Cancelled cheque number"),

  gstNumber: Yup.string().required("please enter GST number"),
  companyPan: Yup.string()
    .min(3)
    .max(25)
    .required("please enter company pan number"),
  registrationCertificate: Yup.string()
    .min(3)
    .max(25)
    .required("please enter registration Certificate"),
});

export const BankSchema = Yup.object({
  accountHolderName: Yup.string()
    .min(4)
    .max(25)
    .required("please enter Account Holder's Name"),
  accountType: Yup.string().required("please enter account Type"),
  accountNumber: Yup.string()
    .min(10)
    .max(25)
    .required("please enter your Account Number"),
  confirmAn: Yup.string()
    .required("Account number mismatched")
    .oneOf([Yup.ref("accountNumber"), null], "Account Number must match"),
  ifscCode: Yup.string().min(4).max(12).required("Ifsc Code Required"),
  branchName: Yup.string().min(3).max(25).required("please enter Branch Name"),
});

export const PersonalSchema = Yup.object({
  name: Yup.string().min(3).max(25).required("please enter name"),
  phonenumber: Yup.string().min(10).required("please enter phone no"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});
