import React, { useState, useEffect } from "react";
import Card from "../Layout/CardLayout";
import Dropdown from "../Layout/DropdownComponent";
import DropdownList from "../Layout/DropdownList";
import TabLayout from "../TabComponent.js/TabLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  get_settlements,
  messageClear,
} from "../../redux/payin/settlementReducer";
import PayinSettlementTable from "../../Pages/Dashboard Components/PayinSettltmentTable";

const SettlementComponent = ({ data, TableData }) => {
  const [tabelValue, setTableValue] = useState([]);
  const [selectCurrent, setSelectCurrent] = useState(0);

  const setUpTableValue = async (data) => {
    let results = [];
    for (let i = 0; i < data.length; i++) {
      let obj = {};
      TableData.forEach((element) => {
        if (element === "Transaction Date" || element === "Settlement Date")
          obj[element] = new Date(data[i][element]).toISOString();
        else obj[element] = data[i][element];
      });
      results.push(obj);
    }
    setTableValue((prev) => (prev = results));
  };

  const onHandleCommonTab = (index) => {
    setSelectCurrent(index);
  };
  const headers = [
    { header: "Amount", accessorKey: "amount" },
    { header: "Fees", accessorKey: "fees" },
    { header: "Tax", accessorKey: "tax" },
    { header: "Settlement_Amount", accessorKey: "settlement_amount" },
    { header: "Settlement Date", accessorKey: "settlement_date" },
    { header: "status", accessorKey: "status" },
    {
      header: "actions",
      accessorKey: "",
      cell: (info) => "Edit | Delete",
    },
  ];
  return (
    <div>
      <TabLayout tabs={data} />
      <div className="flex items-center justify-evenly gap-5 my-4  flex-wrap">
        <Card
          title={"Unsettled Amount"}
          rupees={"$ 5"}
          content={"Settlement cycle -"}
        />
        <Card
          title={"Settled Amount"}
          rupees={"$ 5"}
          content={"Settlement cycle -"}
        />
      </div>
      <div className="flex mt-2">
        <div className="flex items-center flex-wrap gap-2 justify-center">
          <DropdownList
            onMessage={setUpTableValue}
            mode="settlement"
            dropOptionIndex={selectCurrent}
            onHandleCommonTab={onHandleCommonTab}
            isButtonShow={true}
          />
          <div className="">
            <Dropdown />
          </div>
        </div>
      </div>

      {/* <TableComponent
        oneDown={true}
        data={tabelValue}
        Headers={SettlementData}
      /> */}

      <div className="w-full h-full sm:px-[2vw] sm:py-1 py-0 px-0">
        <PayinSettlementTable headers={headers} className="second-bg" />
      </div>
    </div>
  );
};

export default SettlementComponent;
