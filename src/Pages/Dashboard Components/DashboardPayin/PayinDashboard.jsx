import React from "react";
import PieChart from "../../../components/graphComponent/PieChart.js";
import BarChart from "../Graph&Chart/BarChart.jsx";
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";
import PieChartWithPaddingAngle from "./PieChartWithPaddingAngle.jsx";

const demoPayInMerchantTransactions = [
  {
    merchant_id: "60adbc9a1140c84cfc5d4695", // Example ObjectId referencing a User
    transaction_gid: "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p", // Generated UUID
    vendor_transaction_id: "VENDOR123456",
    vendor_id: "VENDOR789",
    utr: "UTR123456789",
    order_id: "ORDER123",
    transaction_response: "Transaction successful",
    transaction_method_id: "UPI123",
    transaction_type: "sale",
    transaction_username: "username123",
    transaction_email: "user@example.com",
    transaction_contact: "+1234567890",
    transaction_amount: 100.5,
    transaction_status: "success",
    transaction_mode: "UPI",
    transaction_notes: "This is a test transaction",
    transaction_description: "Purchase of goods",
    rupaypay_tax: "10%",
    goods_service_tax: "5%",
    android_status: false,
    adjustment_done: false,
    transaction_date: "2024-05-03T12:30:45.000Z", // Current date
    transaction_ip: "192.168.1.1",
    created_date: "2024-05-06T12:30:45.000Z", // Created date
    created_merchant: "merchant1",
    created_employee: "employee1",
    udf1: "Custom data 1",
    udf2: "Custom data 2",
    udf3: "Custom data 3",
    udf4: "Custom data 4",
    udf5: "Custom data 5",
    createdAt: "2024-05-06T13:45:12.000Z", // Auto-generated timestamp
    updatedAt: "2024-05-06T13:45:12.000Z", // Auto-generated timestamp
  },
  {
    merchant_id: "60adbc9a1140c84cfc5d4695", // Example ObjectId referencing a User
    transaction_gid: "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p", // Generated UUID
    vendor_transaction_id: "VENDOR123456",
    vendor_id: "VENDOR789",
    utr: "UTR123456789",
    order_id: "ORDER123",
    transaction_response: "Transaction successful",
    transaction_method_id: "UPI123",
    transaction_type: "sale",
    transaction_username: "username123",
    transaction_email: "user@example.com",
    transaction_contact: "+1234567890",
    transaction_amount: 100.5,
    transaction_status: "success",
    transaction_mode: "UPI",
    transaction_notes: "This is a test transaction",
    transaction_description: "Purchase of goods",
    rupaypay_tax: "10%",
    goods_service_tax: "5%",
    android_status: false,
    adjustment_done: false,
    transaction_date: "2024-05-04T12:30:45.000Z", // Current date
    transaction_ip: "192.168.1.1",
    created_date: "2024-05-06T12:30:45.000Z", // Created date
    created_merchant: "merchant1",
    created_employee: "employee1",
    udf1: "Custom data 1",
    udf2: "Custom data 2",
    udf3: "Custom data 3",
    udf4: "Custom data 4",
    udf5: "Custom data 5",
    createdAt: "2024-05-06T13:45:12.000Z", // Auto-generated timestamp
    updatedAt: "2024-05-06T13:45:12.000Z", // Auto-generated timestamp
  },
  {
    merchant_id: "60adbc9a1140c84cfc5d4695", // Example ObjectId referencing a User
    transaction_gid: "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p", // Generated UUID
    vendor_transaction_id: "VENDOR123456",
    vendor_id: "VENDOR789",
    utr: "UTR123456789",
    order_id: "ORDER123",
    transaction_response: "Transaction successful",
    transaction_method_id: "UPI123",
    transaction_type: "sale",
    transaction_username: "username123",
    transaction_email: "user@example.com",
    transaction_contact: "+1234567890",
    transaction_amount: 100.5,
    transaction_status: "success",
    transaction_mode: "UPI",
    transaction_notes: "This is a test transaction",
    transaction_description: "Purchase of goods",
    rupaypay_tax: "10%",
    goods_service_tax: "5%",
    android_status: false,
    adjustment_done: false,
    transaction_date: "2024-05-06T12:30:45.000Z", // Current date
    transaction_ip: "192.168.1.1",
    created_date: "2024-05-06T12:30:45.000Z", // Created date
    created_merchant: "merchant1",
    created_employee: "employee1",
    udf1: "Custom data 1",
    udf2: "Custom data 2",
    udf3: "Custom data 3",
    udf4: "Custom data 4",
    udf5: "Custom data 5",
    createdAt: "2024-05-06T13:45:12.000Z", // Auto-generated timestamp
    updatedAt: "2024-05-06T13:45:12.000Z", // Auto-generated timestamp
  },
  {
    merchant_id: "60adbc9a1140c84cfc5d4695", // Example ObjectId referencing a User
    transaction_gid: "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p", // Generated UUID
    vendor_transaction_id: "VENDOR123456",
    vendor_id: "VENDOR789",
    utr: "UTR123456789",
    order_id: "ORDER123",
    transaction_response: "Transaction successful",
    transaction_method_id: "UPI123",
    transaction_type: "sale",
    transaction_username: "username123",
    transaction_email: "user@example.com",
    transaction_contact: "+1234567890",
    transaction_amount: 22100.5,
    transaction_status: "success",
    transaction_mode: "UPI",
    transaction_notes: "This is a test transaction",
    transaction_description: "Purchase of goods",
    rupaypay_tax: "10%",
    goods_service_tax: "5%",
    android_status: false,
    adjustment_done: false,
    transaction_date: "2024-05-04T12:30:45.000Z", // Current date
    transaction_ip: "192.168.1.1",
    created_date: "2024-05-06T12:30:45.000Z", // Created date
    created_merchant: "merchant1",
    created_employee: "employee1",
    udf1: "Custom data 1",
    udf2: "Custom data 2",
    udf3: "Custom data 3",
    udf4: "Custom data 4",
    udf5: "Custom data 5",
    createdAt: "2024-05-06T13:45:12.000Z", // Auto-generated timestamp
    updatedAt: "2024-05-06T13:45:12.000Z", // Auto-generated timestamp
  },
  {
    merchant_id: "60adbc9a1140c84cfc5d4695", // Example ObjectId referencing a User
    transaction_gid: "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p", // Generated UUID
    vendor_transaction_id: "VENDOR123456",
    vendor_id: "VENDOR789",
    utr: "UTR123456789",
    order_id: "ORDER123",
    transaction_response: "Transaction successful",
    transaction_method_id: "UPI123",
    transaction_type: "sale",
    transaction_username: "username123",
    transaction_email: "user@example.com",
    transaction_contact: "+1234567890",
    transaction_amount: 12200.5,
    transaction_status: "failed",
    transaction_mode: "UPI",
    transaction_notes: "This is a test transaction",
    transaction_description: "Purchase of goods",
    rupaypay_tax: "10%",
    goods_service_tax: "5%",
    android_status: false,
    adjustment_done: false,
    transaction_date: "2024-05-06T12:30:45.000Z", // Current date
    transaction_ip: "192.168.1.1",
    created_date: "2024-05-06T12:30:45.000Z", // Created date
    created_merchant: "merchant1",
    created_employee: "employee1",
    udf1: "Custom data 1",
    udf2: "Custom data 2",
    udf3: "Custom data 3",
    udf4: "Custom data 4",
    udf5: "Custom data 5",
    createdAt: "2024-05-06T13:45:12.000Z", // Auto-generated timestamp
    updatedAt: "2024-05-06T13:45:12.000Z", // Auto-generated timestamp
  },
  {
    merchant_id: "60adbc9a1140c84cfc5d4695", // Example ObjectId referencing a User
    transaction_gid: "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p", // Generated UUID
    vendor_transaction_id: "VENDOR123456",
    vendor_id: "VENDOR789",
    utr: "UTR123456789",
    order_id: "ORDER123",
    transaction_response: "Transaction successful",
    transaction_method_id: "UPI123",
    transaction_type: "sale",
    transaction_username: "username123",
    transaction_email: "user@example.com",
    transaction_contact: "+1234567890",
    transaction_amount: 100.5,
    transaction_status: "success",
    transaction_mode: "UPI",
    transaction_notes: "This is a test transaction",
    transaction_description: "Purchase of goods",
    rupaypay_tax: "10%",
    goods_service_tax: "5%",
    android_status: false,
    adjustment_done: false,
    transaction_date: "2024-05-06T12:30:45.000Z", // Current date
    transaction_ip: "192.168.1.1",
    created_date: "2024-05-06T12:30:45.000Z", // Created date
    created_merchant: "merchant1",
    created_employee: "employee1",
    udf1: "Custom data 1",
    udf2: "Custom data 2",
    udf3: "Custom data 3",
    udf4: "Custom data 4",
    udf5: "Custom data 5",
    createdAt: "2024-05-06T13:45:12.000Z", // Auto-generated timestamp
    updatedAt: "2024-05-06T13:45:12.000Z", // Auto-generated timestamp
  },
  {
    merchant_id: "60adbc9a1140c84cfc5d4695", // Example ObjectId referencing a User
    transaction_gid: "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p", // Generated UUID
    vendor_transaction_id: "VENDOR123456",
    vendor_id: "VENDOR789",
    utr: "UTR123456789",
    order_id: "ORDER123",
    transaction_response: "Transaction successful",
    transaction_method_id: "UPI123",
    transaction_type: "sale",
    transaction_username: "username123",
    transaction_email: "user@example.com",
    transaction_contact: "+1234567890",
    transaction_amount: 100.5,
    transaction_status: "failed",
    transaction_mode: "UPI",
    transaction_notes: "This is a test transaction",
    transaction_description: "Purchase of goods",
    rupaypay_tax: "10%",
    goods_service_tax: "5%",
    android_status: false,
    adjustment_done: false,
    transaction_date: "2024-05-06T12:30:45.000Z", // Current date
    transaction_ip: "192.168.1.1",
    created_date: "2024-05-06T12:30:45.000Z", // Created date
    created_merchant: "merchant1",
    created_employee: "employee1",
    udf1: "Custom data 1",
    udf2: "Custom data 2",
    udf3: "Custom data 3",
    udf4: "Custom data 4",
    udf5: "Custom data 5",
    createdAt: "2024-05-06T13:45:12.000Z", // Auto-generated timestamp
    updatedAt: "2024-05-06T13:45:12.000Z", // Auto-generated timestamp
  },
  {
    merchant_id: "60adbc9a1140c84cfc5d4695", // Example ObjectId referencing a User
    transaction_gid: "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p", // Generated UUID
    vendor_transaction_id: "VENDOR123456",
    vendor_id: "VENDOR789",
    utr: "UTR123456789",
    order_id: "ORDER123",
    transaction_response: "Transaction successful",
    transaction_method_id: "UPI123",
    transaction_type: "sale",
    transaction_username: "username123",
    transaction_email: "user@example.com",
    transaction_contact: "+1234567890",
    transaction_amount: 200.5,
    transaction_status: "failed",
    transaction_mode: "UPI",
    transaction_notes: "This is a test transaction",
    transaction_description: "Purchase of goods",
    rupaypay_tax: "10%",
    goods_service_tax: "5%",
    android_status: false,
    adjustment_done: false,
    transaction_date: "2024-05-06T12:30:45.000Z", // Current date
    transaction_ip: "192.168.1.1",
    created_date: "2024-05-06T12:30:45.000Z", // Created date
    created_merchant: "merchant1",
    created_employee: "employee1",
    udf1: "Custom data 1",
    udf2: "Custom data 2",
    udf3: "Custom data 3",
    udf4: "Custom data 4",
    udf5: "Custom data 5",
    createdAt: "2024-05-06T13:45:12.000Z", // Auto-generated timestamp
    updatedAt: "2024-05-06T13:45:12.000Z", // Auto-generated timestamp
  },
];

// ---------------

const successCount = demoPayInMerchantTransactions.reduce(
  (acc, transaction) => {
    if (transaction.transaction_status === "success") {
      return acc + 1;
    }
    return acc;
  },
  0
);

const totalTransactions = demoPayInMerchantTransactions.length;
// Calculate success percentage
const successPercentage = (successCount / totalTransactions) * 100;

const failureCount = demoPayInMerchantTransactions.reduce(
  (acc, transaction) => {
    if (transaction.transaction_status === "failed") {
      return acc + 1;
    }
    return acc;
  },
  0
);

// Calculate success percentage
const failurePercentage = (failureCount / totalTransactions) * 100;

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// for number of transactions happened
function giveMeArrayDayWise() {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return daysOfWeek[date.getDay()];
  };

  // Get the array of transaction counts for each day of the week
  const getTransactionCounts = (transactions) => {
    const transactionCounts = Array(7).fill(0); // Initialize array with zeros for each day of the week
    const transactionAmounts = Array(7).fill(0);
    let totalSuccessAmount = 0;
    let totalFailedAmount = 0;

    let totalSuccessCount = 0;
    let totalFailedCount = 0;

    // Count transactions for each day of the week
    transactions.forEach((transaction) => {
      const dayOfWeek = getDayOfWeek(transaction.transaction_date);
      const index = daysOfWeek.indexOf(dayOfWeek);
      if (index !== -1) {
        transactionCounts[index]++;
        transactionAmounts[index] += transaction.transaction_amount;
      }
      if (transaction.transaction_status === "success") {
        totalSuccessAmount += transaction.transaction_amount;
        totalSuccessCount++;
      } else if (transaction.transaction_status === "failed") {
        totalFailedAmount += transaction.transaction_amount;
        totalFailedCount++;
      }
    });

    return {
      transactionCounts,
      transactionAmounts,
      totalFailedAmount,
      totalSuccessAmount,
      totalSuccessCount,
      totalFailedCount,
    };
  };

  // Get the array of transaction counts for the last 7 days
  const transactionsInLast7Days = getTransactionCounts(
    demoPayInMerchantTransactions
  );

  return transactionsInLast7Days;
}

const transactionsInLast7Days = giveMeArrayDayWise();
const { totalSuccessCount, totalFailedCount } = transactionsInLast7Days;

// pieChart DEMO Data
// const Demodata = {
//   labels: ["red", "blue", "yellow", "green", "purple"],
//   datasets: [
//     {
//       data: [12, 19, 3, 5, 2],
//       backgroundColor: ["#8b5cf6", "#a0aeca", "#ede9fe", "#C1D0B5", "#e5e9ee"],
//     },
//   ],
// };

// half pie

const PieData = [
  { label: "Total Transactions", value: totalTransactions },
  { label: "Success Transactions ", value: totalSuccessCount },
  { label: "Failed Transactions ", value: totalFailedCount },
  // { label: "Group D", value: 200 },
];
function BodyGraph({ children }) {
  return (
    <div className=" w-full  h-full   my-12 bg-white text-sm rounded-lg py-2 px-2 ">
      {children}
    </div>
  );
}
const PayinDashboard = () => {
  function PieChartDiv({ children }) {
    return (
      <div className=" flex  sm:w-[30vw] w-full mt-4 sm:my-12 p-8">
        {children}
      </div>
    );
  }
  function LeftBox({ children }) {
    return (
      <div className="flex lg:py-8  py-2 gap-12  w-full  my-8 rounded-xl flex-wrap justify-center items-center lg:gap-8 mb-8">
        {children}
      </div>
    );
  }

  function CardBar({
    totalFailedAmount,
    totalSuccessAmount,
    heading,
    successpercent,
    failurepercent,
    value,
    percent,
    amount = false,
    color,
  }) {
    return (
      <div className="w-full  lg:w-60  h-32 gap-4  items-center bg-[#f1f5f9]  justify-center shadow-md duration-500 hover:shadow-lg p-4 flex rounded-md ">
        <div className="widgetInfo flex flex-col gap-2">
          <p
            className={`font-medium mb-4 ${
              heading == "Failed" ? " text-red-500 " : " text-green-400 "
            }`}
          >
            {heading} Volume
          </p>
          <h4 className="text-xl font-bold text-black">
            <span>
              {amount
                ? `${
                    heading == "Failed" ? totalFailedAmount : totalSuccessAmount
                  }`
                : value}{" "}
            </span>
          </h4>
          {heading == "Success" ? (
            <div className="green h-auto  text-green-500 flex gap-2 items-center  w-full">
              <HiTrendingUp className=" text-green-500 " />
              <div>+{successpercent}% </div>
            </div>
          ) : (
            <div className="red  text-red-500 flex gap-2 items-center w-full">
              <HiTrendingDown className=" text-red-500 " />
              <div> {failurepercent}% </div>
            </div>
          )}
        </div>
        {heading == "Success" ? (
          <div
            className="widgetCircle h-16 p-4 relative flex items-center justify-center w-16 rounded-full before:content-[''] before:absolute before:bg-white before:h-14 before:w-14 before:rounded-full before:left-0 before:right-0 before:translate-x-0 before:translate-y-0 bg-green-400 "
            style={{
              background: `conic-gradient(${color} ${
                (Math.abs(successpercent) / 100) * 360
              }deg,rgb(255,255,255)0)`,
            }}
          >
            <span className="absolute text-green-400">{successpercent}%</span>
          </div>
        ) : (
          <div
            className="widgetCircle h-16 p-4 relative flex items-center justify-center w-16 rounded-full before:content-[''] before:absolute before:bg-white before:h-14 before:w-14 before:rounded-full before:left-0 before:right-0 before:translate-x-0 before:translate-y-0 bg-red-500 "
            style={{
              background: `conic-gradient(${color} ${
                (Math.abs(failurepercent) / 100) * 360
              }deg,rgb(255,255,255)0)`,
            }}
          >
            <span className="absolute text-red-500">{failurepercent}%</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {
        <div className="flex lg:flex-row gap-4 w-full px-4  py-2  flex-col bg-white rounded-lg ">
          <LeftBox>
            <div className="w-full">
              <div className="shadow-md rounded-lg md:shadow-none md:p-4 py-8 w-full flex flex-col items-center justify-center">
                <h1 className="text-xl text-center text-gray-400 p-2 mb-2 font-semibold">
                  pay In Counts
                </h1>
                <div className="flex md:flex-row gap-8 flex-col">
                  <CardBar
                    totalFailedAmount={
                      transactionsInLast7Days.totalSuccessAmount
                    }
                    totalSuccessAmount={
                      transactionsInLast7Days.totalFailedAmount
                    }
                    successpercent={successPercentage}
                    failurepercent={failurePercentage}
                    amount={true}
                    value={340000}
                    heading="Success"
                    color="#31c48d"
                  />
                  <CardBar
                    totalFailedAmount={
                      transactionsInLast7Days.totalSuccessAmount
                    }
                    totalSuccessAmount={
                      transactionsInLast7Days.totalFailedAmount
                    }
                    successpercent={successPercentage}
                    failurepercent={failurePercentage}
                    amount={true}
                    value={340000}
                    heading="Failed"
                    color="#f05252"
                  />
                </div>
              </div>
            </div>
            <div className="w-full ">
              <div className="shadow-md rounded-lg md:shadow-none md:p-4 w-full py-8 flex flex-col items-center justify-center">
                <h1 className="text-xl text-gray-400 text-center p-2 mb-2 font-semibold ">
                  payIn Volume
                </h1>
                <div className="flex  md:flex-row gap-8 flex-col">
                  <CardBar
                    totalFailedAmount={
                      transactionsInLast7Days.totalSuccessAmount
                    }
                    totalSuccessAmount={
                      transactionsInLast7Days.totalFailedAmount
                    }
                    successpercent={successPercentage}
                    failurepercent={failurePercentage}
                    amount={true}
                    value={340000}
                    heading="Success"
                    color="#31c48d"
                  />
                  <CardBar
                    totalFailedAmount={
                      transactionsInLast7Days.totalSuccessAmount
                    }
                    totalSuccessAmount={
                      transactionsInLast7Days.totalFailedAmount
                    }
                    successpercent={successPercentage}
                    failurepercent={failurePercentage}
                    amount={true}
                    value={340000}
                    heading="Failed"
                    color="#f05252"
                  />
                </div>
              </div>
            </div>
          </LeftBox>
          <div className="p-4 shadow-md rounded-lg w-full flex items-center justify-center ">
            <PieChartWithPaddingAngle data={PieData} />
          </div>
        </div>
      }

      <BodyGraph>
        <BarChart
          data_1={transactionsInLast7Days.transactionAmounts}
          data_2={transactionsInLast7Days.transactionCounts}
          // horizontal={true}
          title_1="Transaction Amount"
          title_2="Number of Transactions "
          bgColor_1="rgb(0,115,255)"
          bgColor_2="rgb(53,162,235,0.8)"
        />
      </BodyGraph>
      {/* <div className="flex items-center justify-center mt-8 flex-wrap">
        <PieChartDiv>
          <PieChart chartData={Demodata} />
        </PieChartDiv>
        <PieChartDiv>
          <PieChart chartData={Demodata} />
        </PieChartDiv>
      </div> */}
    </>
  );
};

export default PayinDashboard;
