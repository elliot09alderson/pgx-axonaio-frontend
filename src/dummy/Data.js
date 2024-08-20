import {
  faChartBar,
  faCircleDollarToSlot,
  faHandshake,
  faCreditCard,
  faNotdef,
  faHandHoldingDollar,
  faPeopleRoof,
  faBarsProgress,
  faSackDollar,
  faReceipt,
  faThList,
  faFileInvoiceDollar,
  faFileInvoice,
} from "@fortawesome/free-solid-svg-icons";

export const Data = [
  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLost: 823,
  },
  {
    id: 2,
    year: 2017,
    userGain: 45677,
    userLost: 345,
  },
  {
    id: 3,
    year: 2018,
    userGain: 78888,
    userLost: 555,
  },
  {
    id: 4,
    year: 2019,
    userGain: 90000,
    userLost: 4555,
  },
  {
    id: 5,
    year: 2020,
    userGain: 4300,
    userLost: 234,
  },
];

export const PayInData = [
  {
    id: 1,
    title: "Summary",
    icon: faChartBar,
    link: "payin/summary",
  },
  {
    id: 2,
    title: "Transaction",
    icon: faCircleDollarToSlot,
    link: "payin/transaction",
  },
  {
    id: 3,
    title: "Settlements",
    icon: faHandshake,
    link: "payin/settlement",
  },
  {
    id: 4,
    title: "Payment Links",
    icon: faCreditCard,
    link: "payin/paymentlink",
  },
  {
    id: 10,
    title: "Reports",
    icon: faNotdef,
    link: "payin/reports",
  },
];

export const ResellerData = [
  {
    id: 11,
    title: "Summary",
    icon: faChartBar,
    link: "reseller/summary",
  },
  {
    id: 12,
    title: "PayIn",
    icon: faSackDollar,
    link: "reseller/payin",
  },
  {
    id: 13,
    title: "PayOut",
    icon: faHandHoldingDollar,
    link: "reseller/payout",
  },
  {
    id: 14,
    title: "Manage Merchant",
    icon: faBarsProgress,
    link: "reseller/manage-merchant",
  },
  {
    id: 15,
    title: "Manage Employee",
    icon: faPeopleRoof,
    link: "reseller/manage-employee",
  },
];
export const PayOutData = [
  {
    id: 5,
    title: "Transaction",
    icon: faCircleDollarToSlot,
    link: "payout/transaction",
  },
  {
    id: 6,
    title: "Beneficiaries",
    icon: faThList,
    link: "payout/beneficiariy",
  },
  {
    id: 7,
    title: "Accounts",
    icon: faFileInvoiceDollar,
    link: "payout/account",
  },
  {
    id: 8,
    title: "Fund Settlement",
    icon: faFileInvoice,
    link: "payout/fund-settlement",
  },
  {
    id: 9,
    title: "Reseller",
    icon: faReceipt,
    link: "payout/reseller",
  },
];

export const graphsetData = (Data, status) => {
  let obj = {
    labels: Data.map((data) => data.transaction_status ?? data._id),
    datasets: [
      {
        label: status,
        data: Data.map((data) => data.count),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };
  return obj;
};

export const transactionData = (Data, status) => {
  let obj = {
    labels: Data.map((data) => data.transaction_status),
    datasets: [
      {
        label: status,
        data: Data.map((data) => data.count),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };
  return obj;
};

export const graphBarData = (Data, status) => {
  let obj = {
    labels: Data?.map((data) => data.dateRange),
    datasets: [
      {
        label: status,
        data: Data?.map((data) => data.amount),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };
  return obj;
};

export const AdminPayData = (Data, status) => {
  let obj = {
    labels: Data?.map((data) => data._id),
    datasets: [
      {
        label: status,
        data: Data?.map((data) => data.total),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };
  return obj;
};
export const TableData = [
  "Date & Time",
  "Order ID",
  "Agent Name",
  "Order Amt.",
  "Transaction ID",
  "Transaction Amt.",
  "Phone No.",
  "Payment Method",
  "Status",
];

export const SettlementData = [
  "Settlement Date",
  "Transaction Id",
  "Transaction Date",
  "Amount",
  "Settlement Fee",
  "Settlement Tax",
  "Total Deduction",
  "Settlement Amount",
  "Status",
];

export const ReportsData = [
  "Report From",
  "Report To",
  "Payment Mode",
  "Status",
  "Report Type",
  "Date",
];

export const PaymentMode = [
  "All",
  "Upi",
  "Net Banking",
  "Credit Card",
  "Debit Card",
  "Wallet",
  "Qr Code",
];

export const Status = ["All", "Success", "Pending", "Failed", "Cancelled"];

export const ReportsType = ["Transaction", "Settlement", "PayLink"];

export const PayLinkTab = [
  { id: 0, label: "All" },
  { id: 0, label: "Orders" },
];
export const PayLinkHeader = [
  {
    id: 0,
    tab: "All",
    headers: [
      "Created At",
      "Link ID",
      "FX Link ID",
      "Amount",
      "Phone No.",
      "Email ID",
      "Status",
    ],
  },
  {
    id: 1,
    tab: "Orders",
    headers: [
      "Date & Time",
      "Order ID",
      "Transaction ID",
      "FX Link ID",
      "Link ID",
      "Amount",
      "Phone No.",
      "Email ID",
      "Status",
    ],
  },
];

export const MenuDropItem = [
  "Merchant Setting",
  "Merchant gateway Routing",
  "Live Merchants",
  "IP Whitelist",
  "Vendor Configaration",
];
