import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;
const Input = styled.input`
  padding: 10px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

function InputWithLabel(props) {
  const { label, level, ...inputProps } = props;

  return (
    <div>
      <Label>{label}</Label>
      <Input {...inputProps} />
      {level && <div>{level}</div>}
    </div>
  );
}

export default InputWithLabel;