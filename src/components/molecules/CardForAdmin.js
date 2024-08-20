import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  width: 220px;
  height: 150px;
  color: #fff;
  background-image: linear-gradient(120deg, #0073b7 0%, #637e8e 100%);
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const CardTitle = styled.h2`
  font-size: 24px;
  margin: 0 0 16px;
  text-align: center;
`;

const CardText = styled.p`
  color: #fff;
  font-size: 16px;
  margin: 0;
  text-align: center;
  font-weight:500;
`;

const CardForAdmin = ({ title, text }) => {
  return (
    <CardContainer>
      <CardTitle>{title ?? 'Total GTV'}</CardTitle>
      <CardText>{text ?? '₹00'}</CardText>
    </CardContainer>
  );
};

export default CardForAdmin;
