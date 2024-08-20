import React, { useState } from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select`
  padding: 8px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: ${({ width }) => width || '200px'};
  height: 50px;
`;

const StyledOption = styled.option`
  padding: 8px;
  font-size: 16px;
`;

const Dropdown = ({ options, onSelect, width }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onSelect(selectedValue);
  };

  return (
    <StyledSelect value={selectedOption} onChange={handleSelectChange} width={width} >
      {options.map((option) => (
        <StyledOption key={option} value={option}>
          {option}
        </StyledOption>
      ))}
    </StyledSelect>
  );
};

export default Dropdown;
