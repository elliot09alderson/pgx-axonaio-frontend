const BusinessFormIsEmpty = (formData) => {
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
  fields.forEach((field) => {
    if (!formData[`${field}`]) {
      error[[field]] = `${field} not present`;
    }
  });

  if (Object.keys(error).length === 0) return null;
  return error;
};

const BankDetailsFormISEmpty = (formData) => {
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
  });
  if (Object.keys(error).length === 0) return null;
  return error;
};

const DocumentUploadIsEmpty = (formData) => {
  const error = {};
  const fields = [
    "panNumber",
    "aadharVoterIdPassportDLNumber",
    "gstNumber",
    "cancelledCheque",
    "companyPan",
    "registrationCertificate",
  ];
  fields.forEach((field) => {
    if (!formData[`${field}`]) {
      error[[field]] = `${field} not present`;
    }
  });
  if (Object.keys(error).length === 0) return null;
  return error;
};

const IsEmptySignup = (formData) => {
  const error = {};
  const fields = ["name", "phonenumber", "email", "password"];
  fields.forEach((field) => {
    if (!formData[`${field}`]) {
      error[[field]] = `${field} not present`;
    }
  });
  if (Object.keys(error).length === 0) return null;
  return error;
};

const IsEmptyLogin = (formData) => {
  console.log(formData);
  const error = {};
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
  const fields = ["email", "password"];
  fields.forEach((field) => {
    if (!formData[`${field}`]) {
      error[[field]] = `${field} not present`;
    }
    switch (field) {
      case "email":
        error[field] = !emailRegex.test(formData[field]) ? "Invalid Email" : "";
        break;
      case "password":
        error[field] = !passwordRegex.test(formData[field])
          ? "Password must contain at least 8 characters, including at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
          : "";
        break;
      default:
        break;
    }
  });
  console.log(error);
  const { name = "", email = "", password = "", phonenumber = "" } = error;
  if (name === "" && email === "" && password === "" && phonenumber === "")
    return null;
  return error;
};

const signupValidation = (formData) => {
  console.log(formData);
  const phoneRegex = /^\d{10}$/;
  const nameRegex = /^[a-z A-Z]+$/;
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
  let error = {};
  const fields = ["name", "phonenumber", "email", "password"];
  fields.forEach((field) => {
    if (!formData[`${field}`]) {
      error[field] = `${field} not present`;
    }
    switch (field) {
      case "name":
        error[field] = !nameRegex.test(formData[field]) ? "Invalid Name" : "";
        break;
      case "phonenumber":
        error[field] = !phoneRegex.test(formData[field])
          ? "Invalid Phone Number"
          : "";
        break;
      case "email":
        error[field] = !emailRegex.test(formData[field]) ? "Invalid Email" : "";
        break;
      case "password":
        error[field] = !passwordRegex.test(formData[field])
          ? "Password must contain at least 8 characters, including at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
          : "";
        break;
      default:
        break;
    }
  });
  console.log(error);

  const { name = "", email = "", password = "", phonenumber = "" } = error;
  if (name === "" && email === "" && password === "" && phonenumber === "")
    return null;
  return error;
};

const validationForm = (formData) => {
  console.log(formData);
  const phoneRegex = /^\d{10}$/;
  const nameRegex = /^[a-z A-Z]+$/;
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let error = {};
  const fields = ["phoneNo"];
  fields.forEach((field) => {
    if (!formData[`${field}`]) {
      error[field] = `${field} not present`;
    }
    switch (field) {
      // case 'name':
      //   error[field] = !nameRegex.test(formData[field]) ? "Invalid Name" : ""
      //   break;
      case "phoneNo":
        error[field] = !phoneRegex.test(formData[field])
          ? "Invalid Phone Number"
          : "";
        break;
      // case 'email':
      //   error[field] = !emailRegex.test(formData[field]) ? "Invalid Email" : "";
      //   break
      default:
        break;
    }
  });
  // const { name = "", email = "", password = "", phoneNo = "" } = error;
  const { phoneNo = "" } = error;
  // if (name === "" && email === "" && password === "" && phoneNo === "") return null
  if (phoneNo === "") return null;
  return error;
};
export {
  signupValidation,
  BusinessFormIsEmpty,
  DocumentUploadIsEmpty,
  BankDetailsFormISEmpty,
  IsEmptySignup,
  IsEmptyLogin,
  validationForm,
};
