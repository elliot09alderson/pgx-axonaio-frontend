export const paymentValidation = (formData) => {
  const nameRegex = /^[a-z A-Z]+$/;
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let error = {};
  const fields = ["name", "email"];
  fields.forEach((field) => {
    if (!formData[`${field}`]) {
      error[field] = `${field} not present`;
    }
    switch (field) {
      case "name":
        error[field] = !nameRegex.test(formData[field]) ? "Invalid Name" : "";
        break;
      case "email":
        error[field] = !emailRegex.test(formData[field]) ? "Invalid Email" : "";
        break;
      default:
        break;
    }
  });
  const { name = "", email = "" } = error;
  if (name === "" && email === "") return null;
  return error;
};
