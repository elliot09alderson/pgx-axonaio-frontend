import React from "react";

const companyInfo = [
  { name: "Company Type", value: "Pvt. Ltd." },
  { name: "Business Category", value: "EdTech" },
  { name: "Business Sub Category ", value: "Coding Institute" },
  { name: "WebApp/Url ", value: "We Dont have Website  " },
];
const BankDetails = [
  { name: "accountHolderName", value: "pratik verma" },
  { name: "accountNumber", value: "439834903890890" },
  { name: "accountType", value: "a" },
  { name: "branchName", value: "Yerwada" },
  { name: "ifscCode", value: "HDFC0009669" },
];

const BusinessDetails = [
  { name: "address", value: "Pratik Verma" },
  { name: "business Category", value: "c" },
  { name: "business Type", value: "Please choose one option" },
  { name: "city", value: "Delhi" },
  { name: "company Name", value: "XYZ " },
  { name: "description", value: "Hyderabad, Telangana, Bharat " },
  { name: "pincode", value: "760006 " },
  { name: "state", value: "chhattisgarh " },
  { name: "website", value: "www.google.com " },
];

const DocumentDetails = [
  {
    name: "aadhar VoterId Passport Attachment",
    value: "1690435323389-login.jpg",
  },
  { name: "Identity Number", value: "993325526859" },
  { name: "Company GST No ", value: "Coding Institute" },
  { name: "cancelled Cheque", value: "2390293u21j2293  " },
  { name: "cancelledChequeAttachment", value: "1690435319790-login.jpg" },
  { name: "companyPan", value: "BMOCV0503L " },
  { name: "gstNumber ", value: "22AAAAA0000A1Z5,   " },
  { name: "panAttachment  ", value: "1690435316126-login.jpg" },
  { name: "panNumber  ", value: "BMOPV0503L  " },
  { name: "registrationCertificate  ", value: "290312938392091  " },
];

const ResellerProfile = () => {
  return (
    <div className="select-none w-full py-10 flex flex-col  ">
      <div className=" grid grid-cols-1 sm:grid-cols-2 rounded-t-lg p-4 third-bg gap-8 ">
        <div className="h-full flex flex-col  gap-4  p-4">
          <h1 className="text-3xl mb-4 drop-shadow-md ">Company Details</h1>
          {companyInfo.map((item, i) => (
            <div key={i} className="  rounded-md gap-2 flex     items-center">
              <h2 className="text-black sm:text-lg w-[60%] overflow-hidden   text-sm">
                {item.name}
              </h2>

              <p className=" first-text font-bold text-left overflow-hidden sm:text-sm text-xs w-[40%]">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="h-full  flex flex-col justify-center p-4 gap-4">
          <h1 className="text-3xl mb-2 drop-shadow-md ">Bank Details</h1>
          {BankDetails.map((item, i) => (
            <div key={i} className="   rounded-md gap-2 flex  items-center ">
              <h2 className="text-black sm:text-lg  text-sm w-[60%] overflow-hidden  ">
                {item.name}
              </h2>

              <p className="first-text font-bold text-left sm:text-sm  overflow-hidden  text-xs w-[40%]">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="h-2 bg-grey-500"></div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 p-4  third-bg gap-8 rounded-b-lg">
        <div className="h-full    flex flex-col  justify-center gap-5 p-5">
          <h1 className="text-3xl mb-4 drop-shadow-md">Document Details</h1>
          {DocumentDetails.map((item, i) => (
            <div key={i} className=" rounded-md gap-2 flex items-center">
              <h2 className="text-black sm:text-lg text-sm w-[60%] overflow-hidden  ">
                {item.name}
              </h2>

              <p className="first-text font-bold sm:text-sm  overflow-hidden  text-xs w-[40%]">
                {item.value}
              </p>
            </div>
          ))}
        </div>
        <div className="h-full   flex flex-col p-4 gap-5 ">
          <h1 className="text-3xl mb-2 drop-shadow-md">Business Details</h1>
          {BusinessDetails.map((item, i) => (
            <div key={i} className=" rounded-md gap-2 flex items-center">
              <h2 className="text-black sm:text-lg text-sm w-[60%] overflow-hidden  ">
                {item.name}
              </h2>

              <p className="first-text font-bold sm:text-sm  overflow-hidden  text-xs w-[40%]">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResellerProfile;
