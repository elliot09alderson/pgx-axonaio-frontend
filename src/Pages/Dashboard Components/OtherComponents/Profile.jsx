import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileDetails } from "../../../redux/reducers/fetchDetails/fetchDetails";
const Profile = () => {
  const { mode } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProfileDetails({ mode }));
  }, []);

  const { profileDetails, successMessage, errorMessage, loader } = useSelector(
    (state) => state.details
  );

  const {
    aadharVoterIdPassportDLNumber,
    accountHolderName,
    accountNumber,
    accountType,
    address,
    app_mode,
    bg_verified,
    branchName,
    businessCategory,
    businessType,
    cancelledChequeAttachment,
    charge_enabled,
    city,
    companyName,
    companyPan,
    confirmAn,
    createdAt,
    description,
    doc_verified,
    documents_upload,
    email,
    gstNumber,
    ifscCode,
    isAccess,
    isBasic,
    isEmailVerify,
    is_account_locked,
    is_active,
    is_merchant,
    is_reseller,
    is_reseller_admin,
    m_id,
    panNumber,
    merchant_business,
    cancelledCheque,
    merchant_status,
    registrationCertificate,
    panAttachment,
    phonenumber,
    aadharVoterIdPassportAttachment,
    website,
    state,
    pincode,
  } = profileDetails;

  const companyInfo = [
    { name: "Company Type", value: businessType },
    { name: "Business Category", value: businessCategory },
    // { name: "Business Sub Category ", value: "Coding Institute" },
    { name: "WebApp/Url ", value: website },
    { name: "Document Submission ", value: isBasic ? " completed" : "pending" },
    {
      name: "Background Verification ",
      value: bg_verified ? " completed" : "pending",
    },
  ];

  const BusinessDetails = [
    { name: "address", value: address },
    { name: "business Category", value: businessCategory },
    { name: "business Type", value: businessType },
    { name: "city", value: city },
    { name: "company Name", value: companyName },
    { name: "pincode", value: pincode },
    { name: "state", value: state },
    { name: "website", value: website },
  ];
  const BankDetails = [
    {
      name: "Account Holder's Name",
      value: accountHolderName,
    },
    { name: "accountNumber", value: accountNumber },
    { name: "accountType", value: accountType },
    { name: "branchName", value: branchName },
    { name: "ifscCode", value: ifscCode },
  ];
  const DocumentDetails = [
    {
      name: "aadhar VoterId Passport Attachment",
      value: aadharVoterIdPassportAttachment,
    },

    {
      name: "Identity Number",
      value: aadharVoterIdPassportDLNumber,
    },
    {
      name: "Email Verified",
      value: isEmailVerify ? "✔ verified" : "pending",
    },
    { name: "Company GST No ", value: gstNumber },
    { name: "cancelled Cheque", value: cancelledCheque },
    { name: "cancelledChequeAttachment", value: cancelledChequeAttachment },
    { name: "companyPan", value: companyPan },
    { name: "gstNumber ", value: gstNumber },
    { name: "panAttachment  ", value: panAttachment },
    { name: "panNumber  ", value: panNumber },
    { name: "registrationCertificate  ", value: registrationCertificate },
  ];

  console.log(profileDetails);
  return (
    <div className=" w-full py-5 gap-2 flex flex-col  ">
      <div className=" grid grid-cols-1 sm:grid-cols-2 rounded-t-lg p-4 bg-white gap-8 ">
        <div className="h-full flex flex-col  gap-4 bg-stone-300 rounded-lg  p-4">
          <h1 className="text-3xl mb-4 drop-shadow-md  text-slate-700">
            Company Details
          </h1>
          <div className="flex flex-col gap-5">
            {companyInfo.map((item, i) => (
              <div key={i} className="  rounded-md gap-2 flex     items-center">
                <h2 className="text-black font-bold lg:text-sm w-[60%] overflow-hidden   text-sm">
                  {item.name}
                </h2>

                <p className=" first-text  text-left overflow-hidden sm:text-sm text-xs w-[40%]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-full  flex flex-col bg-stone-300 rounded-lg  p-4 gap-4">
          <h1 className="text-3xl mb-4 drop-shadow-md  text-slate-700 ">
            Bank Details
          </h1>
          <div className="flex flex-col gap-5">
            {BankDetails.map((item, i) => (
              <div key={i} className="   rounded-md gap-2 flex  items-center ">
                <h2 className="text-black font-bold lg:text-sm  text-sm w-[60%] overflow-hidden  ">
                  {item.name}
                </h2>

                <p className="first-text  text-left sm:text-sm  overflow-hidden  text-xs w-[40%]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-2 bg-grey-500"></div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 p-4  bg-white gap-8 rounded-b-lg">
        <div className="h-full  flex flex-col  bg-stone-300 rounded-lg shadow-sm  p-4 gap-4">
          <h1 className="text-3xl mb-4 drop-shadow-md  text-slate-700">
            Document Details
          </h1>

          <div className="flex flex-col gap-5">
            {DocumentDetails.map((item, i) => (
              <div key={i} className=" rounded-md gap-2 flex items-center">
                <h2 className="text-black font-bold sm:text-sm text-sm w-[60%] overflow-hidden  ">
                  {item.name}
                </h2>

                <p className="first-text  sm:text-sm  overflow-hidden  text-xs w-[40%]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="h-full   flex flex-col p-4 gap-5 bg-stone-300 rounded-lg shadow-sm  ">
          <h1 className="text-3xl mb-2 drop-shadow-md  text-slate-700">
            Business Details
          </h1>
          <div className="flex flex-col gap-5">
            {BusinessDetails.map((item, i) => (
              <div key={i} className=" rounded-md gap-2 flex items-center">
                <h2 className="text-black font-bold lg:text-sm text-sm w-[60%] overflow-scroll-x  ">
                  {item.name}
                </h2>

                <p className="first-text  sm:text-sm  overflow-hidden  text-xs w-[40%]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
