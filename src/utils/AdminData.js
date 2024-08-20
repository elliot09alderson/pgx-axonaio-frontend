import { faDashboard, faSearch, faSignOut, faUser, faUserGroup, faWrench } from "@fortawesome/free-solid-svg-icons"

export const AdminData = [
  ["Dashboard"], ["Merchant Charges", "Merchant gateway Routing", "Live Merchants", "IP Whitelist", "Vendor Configuration"],
  ["No Of Transactions", "Total Transactions Amount", "Transaction Report"], ["Employee details", "Add Employees"]
]

export const AdminTableData = [
  "Sno", "Merchant Id", "Name", "Company Type", "Created Date", "Action"
]

export const MenuData = [
  { name: "Dashboard", icon: faDashboard, subMenus: [{ tabs: ["Dashboard"] }] },
  {
    name: "Technical", icon: faWrench,
    subMenus: [{ title: "Merchant Setting", tabs: ["Merchant Charges", "Merchant gateway Routing", "Live Merchants", "IP Whitelist", "Vendor Configuration"] }]
  },
  {
    name: "Merchant", icon: faUserGroup, subMenus: [{ title: "Transactions", tabs: ["No Of Transactions", "Total Transactions Amount", "Transaction Report"] }, { title: "Transaction Methods", tabs: [] },
    { title: "Merchant Details", tabs: [] }, { title: "Merchant Cases", tabs: [] }, { title: "Adjustments", tabs: [] }
    ]
  },
  {
    name: "HRM", icon: faSearch, subMenus: [{ title: "Employee management", tabs: [] }, { title: "Vendor Management", tabs: [] }]
  },
  {
    name: "Reseller Management", icon: faUserGroup, subMenus: [{ title: "Transactions", tabs: [] }]
  },
  {
    name: "Price setting", icon: faSearch, subMenus: [{ title: "Transactions", tabs: [] }]
  },
  {
    name: "My Account", icon: faUser, subMenus: [{ tabs: ["My Details", "Change Password", "Login Activities"] }]
  },
  {
    name: "Log Out", icon: faSignOut, subMenus: [{ tabs: [] }]
  }
]

export const No_of_Transaction = ["Transactions", "Transaction methods", "Merchant details", "Merchant cases", "Adjustments"]
export const MerchantTableData = ["Sno", "Merchant Name", "	Merchant Id", "No Of Successful Transaction", "No Of Failed Transaction",
  "No Of Authorized Transaction", "Total No Of Transactions"
]

export const MenuDropItem = ["Merchant Setting", "Merchant gateway Routing", "Live Merchants", "IP Whitelist", "Vendor Configaration"]
export const hrmDetails = ["Employee management", "Vendor Management"]
export const employeeDetails = ["Sno", "User Name", "Name", "Designation", "Official Email", "Mobile No", "Department", "Status", "created_date"]