import React, { useState } from "react";
import { PayLinkHeader, PayLinkTab } from "../../dummy/Data";
import Dropdown from "../Layout/DropdownComponent";
import DropdownList from "../Layout/DropdownList";
import PayLinkLayout from "../Layout/PayLinkLayout";
import TableComponent from "../Layout/TableComponent";
import TabLayout from "../TabComponent.js/TabLayout";

import { setUpOrderTableValue, setUpTableValue } from "../../utils/TableData";

const PaymentLinkComponent = () => {
  const [headers, setHeader] = useState(PayLinkHeader[0]["headers"]);
  const [tabelValue, setTableValue] = useState([]);
  const [isButtonShow, setIsButtonShow] = useState(true);
  const [isOpenPayment, setIsOpenPayment] = useState(false);
  const [isTableLoad, setIsTableLoad] = useState(false);
  const [selectPayPageIndex, setSelectPayPageIndex] = useState({
    payIndex: 0,
    orderIndex: 0,
  });
  const onCurrentTab = (index) => {
    if (Number(index) === 0) {
      setHeader(PayLinkHeader[Number(index)]["headers"]);
      setIsButtonShow(true);
    } else if (Number(index) === 1) {
      setHeader(PayLinkHeader[Number(index)]["headers"]);
      setIsButtonShow(false);
    }
    setIsTableLoad(false);
  };
  const onPopupPaymentLink = () => {
    setIsOpenPayment(!isOpenPayment);
  };

  const onHandleTableValue = (value, index) => {
    console.log("inside onHandleTableValue", value);
    if (index === 0) setTableValue(value);
    else if (index === 1) setTableValue(value);
    else if (index === 2) setTableValue([...tabelValue, ...value]);
    setIsTableLoad(true);
  };

  const onHandleCommonTab = (index) => {
    if (isButtonShow) {
      setSelectPayPageIndex({ ...selectPayPageIndex, payIndex: index });
    } else {
      setSelectPayPageIndex({ ...selectPayPageIndex, orderIndex: index });
    }
  };
  const onHandleMessage = async (value) => {
    console.log("inside message", value);
    if (isButtonShow) {
      let results = await setUpTableValue(value, headers);
      onHandleTableValue(results, 0);
    } else {
      let results = await setUpOrderTableValue(value, headers);
      onHandleTableValue(results, 1);
    }
  };

  return (
    <div>
      <TabLayout tabs={PayLinkTab} onCurrentTab={onCurrentTab} />
      <div className="flex flex-col">
        <div className="flex px-4 items-center flex-col  mb-4  ">
          <div>
            <DropdownList
              onMessage={onHandleMessage}
              mode={isButtonShow ? "paylink" : "order"}
              onHandleCommonTab={onHandleCommonTab}
              dropOptionIndex={
                isButtonShow
                  ? selectPayPageIndex?.payIndex
                  : selectPayPageIndex?.orderIndex
              }
              isButtonShow={isButtonShow}
            />
          </div>
          <div>
            <Dropdown />
          </div>
        </div>
        <div className="flex items-center justify-center relative">
          {isButtonShow && (
            <div
              className="p-2 cursor-pointer underline"
              onClick={onPopupPaymentLink}
            >
              Create Payment Link
            </div>
          )}
        </div>
      </div>
      {isTableLoad && !isOpenPayment && (
        <TableComponent data={tabelValue} Headers={headers} />
      )}
      {isOpenPayment && (
        <PayLinkLayout
          onClick={onPopupPaymentLink}
          onHandleTableValue={onHandleTableValue}
          headers={headers}
          setIsOpenPayment={setIsOpenPayment}
        />
      )}
    </div>
  );
};

export default PaymentLinkComponent;
