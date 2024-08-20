import React, { useState } from "react";
import styled from "styled-components";
import { logo } from "../../../assests";
import {
  CheckoutHeading,
  EmiPayData,
  NetBankingData,
  UpiData,
  WalletsData,
  checkoutData,
} from "../../../utils/checkoutData";
import CardLayout from "./CardLayout";
import NetBankingLayout from "./NetBankingLayout";

// const CheckoutGrid = styled.div`
//   border: 1px solid rgba(231, 234, 252, 0.75);
//   padding-top: 35px;
//   padding-bottom: 10px;
//   padding-left: 10px;
//   padding-right: 10px;
//   margin-bottom: 10px;
// `;

function CheckoutGrid({ children }) {
  return (
    <div className="flex md:flex-row flex-col items-center justify-center">
      {children}
    </div>
  );
}
const CheckoutCard = styled.div`
  background: #ffffff;
`;
// const CheckoutRow = styled.div`
//   /* --bs-gutter-y: 0; */
//   display: flex;
//   flex-wrap: wrap;

//   border: 1px solid black;
// `;
function CheckoutRow({ children }) {
  return (
    <div className="border-2 border-slate-800 flex sm:flex-row items-center justify-center mx-0 p-0 flex-col">
      {children}
    </div>
  );
}
const CheckoutCol = styled.div`
  flex: 0 0 auto;
  width: 100%;
`;
// const CheckoutSettingMenu = styled.div``;

function CheckoutSettingMenu({ children }) {
  return <div className="flex flex-col m-0 p-0">{children}</div>;
}
const CheckoutSettingMenuTitle = styled.h2`
  font-weight: 700;
  font-size: 14px;
  color: #000000;
  margin-bottom: 20px;
`;

// const CheckoutTabContainer = styled.div`
//   flex: 0 0 auto;
//   width: 100%;
// `;

function CheckoutTabContainer({ children }) {
  return (
    <div className="flex w-full items-center justify-center mx-0 px-0 ">
      {children}
    </div>
  );
}
// const CheckoutTabContainerUl = styled.ul`
//   display: block;
//   border: 0;
//   margin: 0;
//   list-style: none;
//   padding: 15px !important;
//   min-width: 220px;
//   background: rgba(231, 234, 252, 0.46);
//   min-height: 463px;
//   border-radius: 4px 4px 0 0;
// `;
function CheckoutTabContainerUl({ children }) {
  return (
    <ul className="list-none p-2 min-w-[300px] sm:min-w-[200px]   bg-slate-500 rounded-lg min-h-[463px] ">
      {children}
    </ul>
  );
}
const CheckoutTabContainerLi = styled.li`
  padding-bottom: 12px;
  box-shadow: 0px 5px 10px rgba(132, 39, 225, 0.06);
  a:not([href]):not([tabindex]):hover {
    color: #fff; /* Set a specific color value */
    text-decoration: none;
  }
  a:hover img {
    filter: brightness(0) invert(1); /* Set the image color to white */
  }
`;
const CheckoutTabContainerRef = styled.a`
  font-size: 14px;
  font-weight: 400;
  padding: 15px 10px;
  border: 1px solid rgba(231, 234, 252, 0.75);
  box-shadow: 0px 5px 10px rgba(132, 39, 225, 0.06);
  border-radius: 5px;
  display: flex;
  align-items: center;
  background: ${(props) => (props.active ? "rgb(239, 229, 255)" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#ccc")};
  margin-right: 0;
  cursor: pointer;
  &:hover {
    background-color: #552288;
    color: #fff;
    width: 100%;
    text-decoration: none;
    border-color: transparent;
  }
`;
const CheckoutTabContainerImg = styled.img`
  width: 20px;
  margin-right: 10px;
  color: #ccc;
  transition: 0.7s;
`;
const CheckoutPowerdBy = styled.div`
  width: full;
  clear: both;
  display: flex;
  flex-direction: column;
  background: rgba(231, 234, 252, 0.46);
  padding: 0 15px 15px;
  border-radius: 0 0 4px 4px;
  text-align: center !important;
`;
const CheckoutPowerdByPara = styled.p`
  font-size: 12px;
  margin-bottom: 5px;
  font-weight: 500;
`;
const CheckoutPowerdByImg = styled.img`
  max-width: 90px;
  margin: auto;
`;
const CheckoutBox = () => {
  const [selectSideTab, setSelectSideTab] = useState(0);
  const [selectHeader, setSelectHeader] = useState(CheckoutHeading[1]);
  const [setlectBody, setSelectBody] = useState([]);
  const onHandleBodyData = (index) => {
    switch (index) {
      case 1:
        setSelectBody(NetBankingData);
        break;
      case 2:
        setSelectBody(UpiData);
        break;
      case 3:
        setSelectBody(WalletsData);
        break;
      case 4:
        setSelectBody(EmiPayData);
        break;
      default:
        break;
    }
  };
  const onHandleSideTab = (index) => {
    setSelectSideTab(Number(index));
    setSelectHeader(CheckoutHeading[index]);
    onHandleBodyData(index);
  };
  return (
    <CheckoutGrid>
      <CheckoutCard>
        <CheckoutRow>
          <CheckoutSettingMenu>
            <CheckoutCol>
              <CheckoutSettingMenu>
                <CheckoutSettingMenuTitle>
                  Select your payment method
                </CheckoutSettingMenuTitle>
                <CheckoutTabContainer>
                  <CheckoutTabContainerUl>
                    {checkoutData.map((item, index) => {
                      return (
                        <CheckoutTabContainerLi key={index}>
                          <CheckoutTabContainerRef
                            onClick={() => onHandleSideTab(index)}
                            active={Number(selectSideTab) === index}
                          >
                            <CheckoutTabContainerImg src={item?.logo} />
                            {item?.name}
                          </CheckoutTabContainerRef>
                        </CheckoutTabContainerLi>
                      );
                    })}
                    <CheckoutPowerdBy>
                      <CheckoutPowerdByPara>Powered By</CheckoutPowerdByPara>
                      <CheckoutPowerdByImg src={logo} />
                    </CheckoutPowerdBy>
                  </CheckoutTabContainerUl>
                </CheckoutTabContainer>
              </CheckoutSettingMenu>
            </CheckoutCol>
          </CheckoutSettingMenu>
          {selectSideTab === 0 && <CardLayout />}
          {selectSideTab !== 0 && (
            <NetBankingLayout
              bodyData={setlectBody}
              header={selectHeader}
              showUpi={selectSideTab === 2}
              showQR={selectSideTab === 5}
              showNetBank={selectSideTab === 1}
            />
          )}
        </CheckoutRow>
      </CheckoutCard>
    </CheckoutGrid>
  );
};

export default CheckoutBox;
