import React from "react";
import styled from "styled-components";
import CheckoutHeader from "./CheckoutHeader";
import CheckoutBox from "./CheckoutBox";

const MainWrapper = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 100vh;
`;
const Checkout = styled.div`
  max-width: 690px;
  margin: 20px auto;
`;
const Container = styled.div``;
const CheckoutLayOut = () => {
  return (
    <MainWrapper>
      <Checkout>
        <Container>
          {/* <CheckoutHeader /> */}
          <CheckoutBox />
        </Container>
      </Checkout>
    </MainWrapper>
  );
};

export default CheckoutLayOut;
