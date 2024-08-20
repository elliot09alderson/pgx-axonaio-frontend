import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { masterIcon } from "../../../assests";
import Search from "../Serach";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

export const Container = styled.div`
  // display: inline-block;
  // width: 424px;
  // box-shadow: 0px 4px 24px rgba(222, 222, 222, 0.25);
  // border-radius: 4px;
  // margin: 0 10px;
`;

export const CheckoutRight = styled.div`
  box-shadow: 0px 4px 24px rgba(222, 222, 222, 0.25);
  border-radius: 4px;
  margin: 0 10px;
`;
export const CheckoutHeading = styled.div`
  padding: 25px 10px;
  border-bottom: 1px solid rgba(223, 223, 223, 0.25);
`;
export const CheckoutHeadingTitle = styled.h2`
  /* margin-top: 36px; */
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 0;
`;
export const CheckoutFormDiv = styled.div`
  padding: 10px;
`;
export const CheckoutForm = styled.form``;
export const CheckoutCardNumber = styled.div``;
export const CheckoutCardNumberRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
export const CheckoutCardInputDiv = styled.div`
  flex: 0 0 auto;
  width: ${(props) => props.width};
`;
export const CheckoutCardImageOuterDiv = styled.div`
  flex: 0 0 auto;
  width: ${(props) => props.width};
  margin-top: 32px;
  padding: ${(props) => (props.pd ? props.pd : "10px")};
`;
export const CheckoutCardExpiryRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;
export const CheckoutCardInnerDiv = styled.div`
  font-size: 24px;
  color: #4b00d4;
`;
const CheckoutCardImage = styled.img`
  max-width: 100%;
  height: auto;
`;
export const CheckoutCardPayButton = styled.button`
  width: 100%;
  text-align: center;
  color: #4b00d4;
  background-color: #fff;
  border: 1px solid #4b00d4;
  transition: 0.7s;
  border-radius: 4px;
  padding: 12px 30px;
  font-weight: 700;
  &:hover {
    background-color: #552288;
    color: #fff;
    width: 100%;
    border-color: transparent;
  }
`;
const CardLayout = () => {
  return (
    <Container>
      <CheckoutRight>
        <CheckoutHeading>
          <CheckoutHeadingTitle>Enter Card Details</CheckoutHeadingTitle>
        </CheckoutHeading>
        <CheckoutFormDiv>
          <CheckoutForm>
            <CheckoutCardNumber>
              <CheckoutCardNumberRow mb="0px">
                <CheckoutCardInputDiv width="83.33333333%">
                  <Search
                    label="Card Number"
                    plcaeholder="4544 4544 1154 4545"
                    type="text"
                  />
                </CheckoutCardInputDiv>
                <CheckoutCardImageOuterDiv width="16.66666667%">
                  <CheckoutCardInnerDiv>
                    <CheckoutCardImage src={masterIcon} />
                  </CheckoutCardInnerDiv>
                </CheckoutCardImageOuterDiv>
              </CheckoutCardNumberRow>
              <CheckoutCardNumberRow mb="0px">
                <CheckoutCardInputDiv width="83.33333333%">
                  <Search
                    label="Name of the card Holder"
                    plcaeholder=""
                    type="text"
                  />
                </CheckoutCardInputDiv>
                <CheckoutCardImageOuterDiv width="16.66666667%">
                  <CheckoutCardInnerDiv />
                </CheckoutCardImageOuterDiv>
              </CheckoutCardNumberRow>
              <CheckoutCardExpiryRow mb="0px">
                <CheckoutCardInputDiv width="41.66666667%">
                  <Search
                    label="Expiry Date ( MM/YY )"
                    plcaeholder=""
                    type="text"
                  />
                </CheckoutCardInputDiv>
                <CheckoutCardInputDiv width="35.66666667%">
                  <Search label="CVV" plcaeholder="" type="text" />
                </CheckoutCardInputDiv>
                <CheckoutCardImageOuterDiv width="16.66666667%">
                  <CheckoutCardInnerDiv>
                    <FontAwesomeIcon icon={faCircleInfo} />
                  </CheckoutCardInnerDiv>
                </CheckoutCardImageOuterDiv>
              </CheckoutCardExpiryRow>
              <CheckoutCardNumberRow>
                <CheckoutCardInputDiv width="83.33333333%">
                  <CheckoutCardPayButton type="submit">
                    PAY NOW
                  </CheckoutCardPayButton>
                </CheckoutCardInputDiv>
                <CheckoutCardImageOuterDiv width="16.66666667%">
                  <CheckoutCardInnerDiv />
                </CheckoutCardImageOuterDiv>
              </CheckoutCardNumberRow>
            </CheckoutCardNumber>
          </CheckoutForm>
        </CheckoutFormDiv>
      </CheckoutRight>
    </Container>
  );
};

export default CardLayout;
