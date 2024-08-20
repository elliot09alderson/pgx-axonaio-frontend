import React from "react";

const Account = () => {
  const MerchantBusinessDetails = [
    { desc: "Merchant Name", val: "TESTING" },
    { desc: "Merchant Aadhar No.", val: "12270110032127" },
    { desc: "Bank Name", val: "ICICI" },
    { desc: "Account Number", val: "732894636472" },
    { desc: "Ifsc Code", val: "ICICB52653C" },
    { desc: "Pincode", val: "560076" },
  ];
  const MerchantAccountDetails = [
    { desc: " Name", val: "Rajat" },
    { desc: "Phone No.", val: "9071116764" },
    { desc: "Email", val: "rajat@trustlypay.in" },
    { desc: "Status", val: "active" },
  ];
  return (
    <div className="relative md:h-[100vh]  sm:h-[100vh] ">
      <div className="card-parent flex flex-col  gap-12 sm:gap-4 sm:flex-row items-center sm:-mt-4 justify-center sm:justify-evenly mt-8 mx-4 lg:h-[100vh] h-full ">
        <div className=" flex flex-col third-bg first-text shadow-md items-center justify-center p-4">
          <h1 className="text-center text-3xl first-text mb-4 drop-shadow-md">
            Account Details
          </h1>
          <div className="flex flex-col gap-4">
            {MerchantAccountDetails.map((item, i) => (
              <div className="flex  justify-start gap-4 items-center">
                <div key={i} className="font-bold">
                  {item.desc}
                </div>
                <div className="font-semibold second-text">{item.val}</div>
              </div>
            ))}
          </div>
        </div>
        <div className=" flex flex-col third-bg first-text shadow-md items-center justify-center p-4 sm:mb-0 mb-32 mx-3 ">
          <h1 className="text-center sm:text-3xl text-xl first-text mb-2 p-2 mt-0 drop-shadow-md">
            Registered Merchant <br /> Business Details
          </h1>
          <p className="text-center text-xs font-semibold sm:font-bold second-text mb-4">
            Transactions will be accepted from these accounts only
          </p>
          <div className="flex flex-col gap-4">
            {MerchantBusinessDetails.map((item, i) => (
              <div className="flex justify-start gap-3 items-center">
                <div key={i} className="font-bold text-xs">
                  {item.desc} :
                </div>
                <div className="font-semibold second-text sm:text-sm text-xs">
                  {item.val}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0  w-full sm:flex-row flex justify-between items-center py-2 gap-2  flex-col third-bg h-auto  px-8">
        <span className="first-text sm:text-sm sm:font-bold font-semibold  text-center text-xs ">
          ©️ 2022-2023 Copyright Payblink . Merchant Agreement . Terms of Use .
          Privacy Policy
        </span>
        <span className="text-xs first-text text-center font-bold pb-2 sm:pb-0 ">
          Version 1.2
        </span>
      </div>
    </div>
  );
};

export default Account;
