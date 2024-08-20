import React, { useState } from 'react';
import styled from 'styled-components';

const options = [{ label: 'Option 1', value: 1 }, { label: 'Option 2', value: 2 }, { label: 'Option 3', value: 3 }, { label: 'Option 4', value: 4 }, { label: 'Option 5', value: 5 },];

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: white;
  color: black;
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0;
  margin: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
`;

const Option = styled.li`
  padding: 8px 12px;
  list-style-type: none;
  cursor: pointer;
  background-color: ${props => (props.selected ? '#f2f2f2' : 'white')};

  &:hover {
    background-color: #f2f2f2;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: none;
  border-bottom: 1px solid #ddd;
  font-size: 16px;

  &:focus {
    outline: none;
  }
`;

const DropdownWithSearch = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleOptionClick = option => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <Container>
      <DropdownButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        {selectedOption ? selectedOption.label : 'Select an option'}
      </DropdownButton>
      {isDropdownOpen && (
        <DropdownList>
          <SearchInput
            placeholder="Search options..."
            value={searchText}
            onChange={event => setSearchText(event.target.value)}
          />
          {filteredOptions.map(option => (
            <Option
              key={option.value}
              selected={option === selectedOption}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </Option>
          ))}
        </DropdownList>
      )}
    </Container>
  );
};

export default DropdownWithSearch;
