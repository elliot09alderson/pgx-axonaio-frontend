import React, { useState } from "react";
import DropdownList from "../Layout/DropdownList";
import TableComponent from "../Layout/TableComponent";

import { ReportsData } from "../../dummy/Data";
import GenerateReportPop from "../Layout/GenerateReportPop";

const ReportComponent = () => {
  const [tabelValue, setTableValue] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoad, setIsLoad] = useState(true);
  const [selectCurrent, setSelectCurrent] = useState(0);
  const onGenerateHandler = () => {
    setIsOpen(!isOpen);
  };
  const onSetTableData = () => {
    setIsLoad(!isLoad);
  };

  const onHandleTableData = (data) => {
    setTableValue(data);
  };
  const onHandleCommonTab = (index) => {
    setSelectCurrent(index);
  };
  return (
    <div className="flex flex-col w-full my-4 ">
      <p className="text-center first-text font-semibold ">
        Generated reports are shown below.
      </p>
      <div className="flex flex-col">
        <div className="flex flex-col ">
          <div>
            <DropdownList
              onMessage={onHandleTableData}
              mode="reports"
              dropOptionIndex={selectCurrent}
              onHandleCommonTab={onHandleCommonTab}
              isButtonShow={isLoad}
            />
          </div>
          <div>{/* <Dropdown /> */}</div>
        </div>
        <div className="flex items-center justify-center py-2 mb-2">
          {" "}
          <button
            className="underline focus:outline-none"
            onClick={() => {
              onGenerateHandler();
              // setBlurDB(true);
            }}
          >
            {" "}
            Generate New Report
          </button>
        </div>
      </div>
      <div className="relative z-0">
        {isOpen && (
          <GenerateReportPop
            setIsOpen={setIsOpen}
            onSetTableData={onSetTableData}
            onClose={onGenerateHandler}
            // setBlurDB={setBlurDB}
          />
        )}
      </div>
      <TableComponent Headers={ReportsData} data={tabelValue} />
    </div>
  );
};

export default ReportComponent;
