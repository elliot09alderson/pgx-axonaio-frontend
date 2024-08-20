import React from "react";
import styled from "styled-components";
const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalSub = styled.div`
  position: relative;
  padding: 32px;
  width: 100%;
  max-width: 640px;
  background-color: #fff;
`;
const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
`;
const ModalDrawer = (props) => {
  return props.trigger ? (
    <ModalContainer>
      <ModalSub>
        <CloseButton onClick={() => props.setTrigger()}>close</CloseButton>
        {props.children}
      </ModalSub>
    </ModalContainer>
  ) : (
    <></>
  );
};

export default ModalDrawer;
