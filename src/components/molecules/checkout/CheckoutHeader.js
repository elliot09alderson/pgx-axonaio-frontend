import React from "react";
import styled from "styled-components";
import { logo } from "../../../assests";

const Container = styled.div`
  background: #4b00d4;
  padding: 10px;
  padding-top: 0;
  padding-bottom: 0;
  border-radius: 10px 10px 0 0;
`;
const HeaderRow = styled.div`
  align-items: center !important;
  display: flex;
  flex-wrap: wrap;
  background-color: golden;
`;
const HeaderCol = styled.div`
  flex: 0 0 auto;
  width: 66.66666667%;
`;
const HeaderColSmall = styled.div`
  flex: 0 0 auto;
  width: 33.3333333%;
`;
const CheckoutTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  position: relative;
  top: 20px;
`;
const CheckoutLogo = styled.div`
   background: #ffffff;
  border: 2px solid #f4f4f4;
  border-radius: 6px;
  min-width: 100px;
  height: 100px;
  margin-right: 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
const CheckoutLogoImg = styled.img`
  width: 120px;
  max-width: 100%;
  height: auto;
`;
const CheckoutTopContent = styled.div`
  padding-bottom: 10px;
`;
const CheckoutTopContentTitle = styled.h4`
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
  margin-bottom: 5px;
`;
const CheckoutTopContentPara = styled.p`
  font-weight: 700;
  font-size: ${(props) => props.fs};
  color: ${(props) => props.color};
  margin-bottom: 0;
`;
const CheckoutTransaction = styled.div`
  min-width: 163px;
  padding: 16px 15px;
  background: #ffffff;
  border-radius: 4px;
  margin-top: 5px;
  float: right;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
const CheckoutHeader = () => {
  return (
    <Container>
      <HeaderRow>
        <HeaderCol>
          <CheckoutTop>
            <CheckoutLogo>
              <CheckoutLogoImg src={logo} />
            </CheckoutLogo>
            <CheckoutTopContent>
              <CheckoutTopContentTitle>
                Pythru Fintech Services Pvt Ltd.
              </CheckoutTopContentTitle>
              <CheckoutTopContentPara color="#19d1af" fs="16px">
                Amount Payable : $8,622
              </CheckoutTopContentPara>
            </CheckoutTopContent>
          </CheckoutTop>
        </HeaderCol>
        <HeaderColSmall>
          <CheckoutTransaction>
            <CheckoutTopContentPara color="#4b00d4" fs="12px">
              Transaction ID : TW8787ds
            </CheckoutTopContentPara>
          </CheckoutTransaction>
        </HeaderColSmall>
      </HeaderRow>
    </Container>
  );
};

export default CheckoutHeader;
