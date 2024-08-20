import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";
import {
  CheckoutCardImageOuterDiv,
  CheckoutCardInputDiv,
  CheckoutCardNumber,
  CheckoutCardPayButton,
  CheckoutForm,
  CheckoutFormDiv,
  CheckoutHeading,
  CheckoutHeadingTitle,
  CheckoutRight,
  Container,
} from "./CardLayout";
import Search from "../Serach";
import { qrImg } from "../../../assests";
import ModalBank from "./ModalBank";

const CheckoutCardNumberRow = styled.div`
  display: flex;
  flex-wrap: wrap;

  // margin-bottom: ${(props) => (props?.mb ? props.mb : "1rem !important")};
`;
const CheckoutCardNumberCol = styled.div`
  flex: 0 0 auto;
  width: 50%;
  padding-right: 10px;
`;
export const CheckoutCardNumberColBank = styled.div`
  background: #ffffff;
  box-shadow: 0px -1px 24px rgba(75, 0, 212, 0.08);
  border-radius: 5px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  cursor: pointer;
`;
export const CheckoutCardColBankName = styled.div`
  display: flex;
  align-items: center;
`;
export const CheckoutCardColBankIcon = styled.div`
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(231, 234, 252, 0.75);
  border-radius: 6px;
`;
export const CheckoutCardColBankPara = styled.p`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 0;
  color: #1b2559;
  margin-left: 10px;
`;
export const CheckoutCardColBankImg = styled.img`
  max-width: 100%;
  height: auto;
`;
export const CheckoutCardColBankSpan = styled.span`
  font-size: 10px;
  color: #1b2559;
  cursor: pointer;
`;
const CheckoutQrDivCol = styled.div`
  flex: 0 0 auto;
  width: 100%;
`;
const CheckoutQrScanTextDiv = styled.div`
  text-align: center !important;
`;
const CheckoutQrIconDiv = styled.div`
  width: full;
`;
const CheckoutQrIcon = styled.img`
  max-width: 100%;
  height: auto;
  margin: auto; 
  vertical-align: middle;
  overflow: clip;
`;
const CheckoutQrScanText = styled.h4`
  margin-bottom: 30px;
  font-size: 16px;
  font-weight: 500;
  margin-top: 0;
  line-height: 1.2;
`;
const CheckoutSubHeadingDiv = styled.div``;
const CheckoutSubHeading = styled.h5`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
`;
const CheckoutBankBtn = styled.div`
  margin-bottom: 18px;
`;
const CheckoutBankBtnRef = styled.a`
  border: 1px solid #8f9bba;
  box-shadow: 0px 4px 4px rgba(196, 196, 196, 0.25);
  border-radius: 6px;
  color: #8f9bba;
  padding: 11px;
  font-size: 14px;
  display: block;
  cursor: pointer;
`;
const CheckoutBankBtnSpan = styled.span`
  float: right;
`;
const NetBankingLayout = ({
  bodyData,
  header,
  showUpi,
  showQR,
  showNetBank,
}) => {
  const [isModal, setIsModal] = useState(false);
  const onHandleModal = () => {
    setIsModal(!isModal);
    console.log(isModal);
  };
  const onHandleCheckoutForm = (e) => {
    e.preventDefault();
  };
  const onHandleVerify = (e) => {
    e.preventDefault();
  };
  return (
    <Container>
      <CheckoutRight>
        <CheckoutHeading>
          <CheckoutHeadingTitle>{header}</CheckoutHeadingTitle>
        </CheckoutHeading>
        <CheckoutFormDiv>
          <CheckoutForm onSubmit={onHandleCheckoutForm}>
            <CheckoutCardNumber>
              {!showQR && (
                <CheckoutCardNumberRow>
                  {bodyData.map((item, index) => {
                    return (
                      <CheckoutCardNumberCol key={index}>
                        <CheckoutCardNumberColBank>
                          <CheckoutCardColBankName>
                            <CheckoutCardColBankIcon>
                              <CheckoutCardColBankImg src={item?.img} />
                            </CheckoutCardColBankIcon>
                            <CheckoutCardColBankPara>
                              {item?.name}
                            </CheckoutCardColBankPara>
                          </CheckoutCardColBankName>
                          <CheckoutCardColBankSpan>
                            <FontAwesomeIcon icon={item?.icon} />
                          </CheckoutCardColBankSpan>
                        </CheckoutCardNumberColBank>
                      </CheckoutCardNumberCol>
                    );
                  })}
                </CheckoutCardNumberRow>
              )}
              {showNetBank && (
                <CheckoutCardNumberRow mb="0px">
                  <CheckoutCardInputDiv width="100%">
                    <CheckoutSubHeadingDiv>
                      <CheckoutSubHeading>
                        Select another Bank
                      </CheckoutSubHeading>
                    </CheckoutSubHeadingDiv>
                    <CheckoutBankBtn>
                      <CheckoutBankBtnRef onClick={onHandleModal}>
                        Select
                        <CheckoutBankBtnSpan>
                          <FontAwesomeIcon icon={bodyData[0]?.icon} />
                        </CheckoutBankBtnSpan>
                      </CheckoutBankBtnRef>
                    </CheckoutBankBtn>
                  </CheckoutCardInputDiv>
                </CheckoutCardNumberRow>
              )}
              {isModal && <ModalBank />}
              {showQR && (
                <CheckoutCardNumberRow mb="1px">
                  <CheckoutQrDivCol>
                    <CheckoutQrScanTextDiv>
                      <CheckoutQrIconDiv>
                        <CheckoutQrIcon src={qrImg} />
                      </CheckoutQrIconDiv>
                      <CheckoutQrScanText>
                        Scan or QR Code Pay or Spot <br />
                        code to connect
                      </CheckoutQrScanText>
                    </CheckoutQrScanTextDiv>
                  </CheckoutQrDivCol>
                </CheckoutCardNumberRow>
              )}
              {(showUpi || showQR) && (
                <CheckoutCardNumberRow>
                  <CheckoutCardInputDiv width="69.33333333%">
                    <Search
                      label="Add UPI ID"
                      plcaeholder="eg : name / Mobile Number@upi"
                      type="email"
                      fs="14px"
                    />
                  </CheckoutCardInputDiv>
                  <CheckoutCardImageOuterDiv
                    pd="13px 4px 6px 10px"
                    width="29.6667%"
                  >
                    <CheckoutCardPayButton onClick={onHandleVerify}>
                      Verify
                    </CheckoutCardPayButton>
                  </CheckoutCardImageOuterDiv>
                </CheckoutCardNumberRow>
              )}
              {!showQR && (
                <CheckoutCardNumberRow>
                  <CheckoutCardInputDiv width="100%">
                    <CheckoutCardPayButton type="submit">
                      PAY NOW
                    </CheckoutCardPayButton>
                  </CheckoutCardInputDiv>
                </CheckoutCardNumberRow>
              )}
            </CheckoutCardNumber>
          </CheckoutForm>
        </CheckoutFormDiv>
      </CheckoutRight>
    </Container>
  );
};

export default NetBankingLayout;
