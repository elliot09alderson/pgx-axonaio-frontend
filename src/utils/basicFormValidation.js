const BusinessFormValidation = (formData) => {
  // const fields = ['companyName', 'businessType', 'businessCategory', 'description', 'website', 'city', 'state', 'address', 'pincode']
  const error = {};
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
  const companyNameRegex = /^((?:[A-Za-z]+ ?){1,3})$/;
  const websiteRegex =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  const cityRegex = /^((?:[A-Za-z]+ ?){1,3})$/;
  const pincodeRegex = /^[0-9]{6}$/;

  fields.forEach((field) => {
    if (!formData[`${field}`]) {
      error[field] = `${field} not present`;
    }

    switch (field) {
      case "companyName":
        error[field] = !companyNameRegex.test(formData[field])
          ? "Invalid companyName"
          : "";
        break;
      case "businessType":
        error[field] = formData[field] === "" ? "Invalid  businessType" : "";
        break;
      case "businessCategory":
        error[field] = formData[field] === "" ? "Invalid businessCategory" : "";
        break;
      case "description":
        error[field] = !companyNameRegex.test(formData[field])
          ? "Invalid description"
          : "";
        break;
      case "website":
        error[field] = !websiteRegex.test(formData[field])
          ? "Invalid website"
          : "";
        break;
      case "city":
        error[field] = !cityRegex.test(formData[field]) ? "Invalid city" : "";
        break;
      case "state":
        error[field] = !cityRegex.test(formData[field]) ? "Invalid state" : "";
        break;
      case "address":
        error[field] = !companyNameRegex.test(formData[field])
          ? "Invalid address"
          : "";
        break;
      case "pincode":
        error[field] = !pincodeRegex.test(formData[field])
          ? "Invalid pincode"
          : "";
        break;
      default:
        break;
    }
  });
  const {
    companyName,
    businessType,
    businessCategory,
    description,
    website,
    city,
    state,
    address,
    pincode,
  } = error;
  if (
    companyName === "" &&
    businessType === "" &&
    businessCategory === "" &&
    description === "" &&
    website === "" &&
    city === "" &&
    state === "" &&
    address === "" &&
    pincode === ""
  )
    return null;
  return error;
};

const BankDetailsFormValidation = (formData) => {
  const error = {};
  const fields = [
    "accountHolderName",
    "accountType",
    "accountNumber",
    "confirmAn",
    "ifscCode",
    "branchName",
  ];
  fields.forEach((field) => {
    if (!formData[`${field}`]) {
      error[[field]] = `${field} not present`;
    }

    const accountHolderNameRegex = /^((?:[A-Za-z]+ ?){1,3})$/;
    const accountTypeRegex = /[a-zA-Z]/;
    const accountNumberRegex = /^[0-9]{9,22}$/;
    const ifscCodeRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

    switch (field) {
      case "accountHolderName":
        error[field] = !accountHolderNameRegex.test(formData[field])
          ? "Invalid accountHolderName"
          : "";
        break;
      case "accountType":
        error[field] = !accountTypeRegex.test(formData[field])
          ? "Invalid  accountType"
          : "";
        break;
      case "accountNumber":
        error[field] = !accountNumberRegex.test(formData[field])
          ? "Number should be 9 to 22"
          : "";
        break;
      case "confirmAn":
        error[field] = !accountNumberRegex.test(formData[field])
          ? "Invalid confirmAn"
          : "";
        break;
      case "ifscCode":
        error[field] = !ifscCodeRegex.test(formData[field])
          ? "Invalid ifscCode"
          : "";
        break;
      case "branchName":
        error[field] = !accountHolderNameRegex.test(formData[field])
          ? "Invalid branchName"
          : "";
        break;
      default:
        break;
    }
  });
  const {
    accountHolderName,
    accountType,
    accountNumber,
    confirmAn,
    ifscCode,
    branchName,
  } = error;
  if (
    accountHolderName === "" &&
    accountType === "" &&
    accountNumber === "" &&
    confirmAn === "" &&
    ifscCode === "" &&
    branchName === ""
  )
    return null;
  return error;
};

const DocumentUploadFormValidation = (formData) => {
  // console.log(formData);
  const error = {};
  const fields = [
    "panNumber",
    "aadharVoterIdPassportDLNumber",
    "gstNumber",
    "cancelledCheque",
    "companyPan",
    "registrationCertificate",
  ];
  const nameRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
  const aadharVoterIdPassportDLNumberRegex = /^\d{12}$/;
  // /^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$/;
  // /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/
  const gstNumberRegex =
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  const cancelledChequeRegex = /[a-z0-9A-Z]{5,16}$/;
  const companyPanRegex = /[A-Z0-9]{10,25}$/;
  const registrationCertificateRegex = /[a-zA-Z0-9]{10,25}$/;

  fields.forEach((field) => {
    if (!formData[`${field}`]) {
      error[[field]] = `${field} not present`;
    }

    switch (field) {
      case "panNumber":
        error[field] = !nameRegex.test(formData[field])
          ? "Invalid panNumber"
          : "";
        break;
      case "aadharVoterIdPassportDLNumber":
        error[field] = !aadharVoterIdPassportDLNumberRegex.test(formData[field])
          ? "Invalid  passport number or Adhaar Number"
          : "";
        break;
      case "gstNumber":
        error[field] = !gstNumberRegex.test(formData[field])
          ? "Invalid gstnumber"
          : "";
        break;
      case "cancelledCheque":
        error[field] = !cancelledChequeRegex.test(formData[field])
          ? "Invalid cancelCheque"
          : "";
        break;
      case "companyPan":
        error[field] = !companyPanRegex.test(formData[field])
          ? "Invalid companyPan"
          : "";
        break;
      case "registrationCertificate":
        error[field] = !registrationCertificateRegex.test(formData[field])
          ? "Invalid registrationCertificate"
          : "";
        break;
      default:
        break;
    }
  });
  const {
    panNumber = "",
    aadharVoterIdPassportDLNumber = "",
    gstNumber = "",
    cancelledCheque = "",
    companyPan = "",
    registrationCertificate = "",
  } = error;
  if (
    panNumber === "" &&
    aadharVoterIdPassportDLNumber === "" &&
    gstNumber === "" &&
    cancelledCheque === "" &&
    companyPan === "" &&
    registrationCertificate === ""
  )
    return null;
  return error;
};

export {
  BusinessFormValidation,
  BankDetailsFormValidation,
  DocumentUploadFormValidation,
};
