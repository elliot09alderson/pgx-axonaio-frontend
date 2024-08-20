import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  padding: 50px 120px 50px 40px;
  border-radius: 8px;
  background-color: rgb(85, 34, 136);
  margin-left: 100px;
  margin-top: 20px;
`;

const Column = styled.div`
  flex: 1;
  margin-right: 16px;
  padding: 20px 40px 20px 10px;
  &:last-child {
    margin-right: 0;
    align-self: flex-end;
  }
`;

const Title = styled.h3`
  margin: 0 0 8px;
  color: #fff;
  font-size: ${(props) => (props.fs ? props.fs : "12px")};
  font-weight: 500;
  opacity: ${(props) => (props.op ? props.op : "")};
`;

const Text = styled.p`
  margin: 0;
  color: #fff;
  font-size: 13px;
`;

const SmallSpan = styled.span`
  margin-right: 5px;
`;

const TextCard = ({ description, amount }) => {
  return (
    <CardContainer>
      <Column>
        <Title op=".6" fs="30px">
          Payment request from Axonpay
        </Title>
        <Text />
      </Column>
      <Column>
        <Title>PAYMENT FOR</Title>
        <Text>{description} </Text>
      </Column>
      <Column>
        <Title>AMOUNT PAYABLE</Title>
        <Text>
          <SmallSpan>₹</SmallSpan>
          {amount}.00{" "}
        </Text>
      </Column>
      <Column>
        <Title>
          Powered by{" "}
          <span>
            <a href="###">Finxpay</a>{" "}
          </span>
        </Title>
      </Column>
    </CardContainer>
  );
};

export default TextCard;
