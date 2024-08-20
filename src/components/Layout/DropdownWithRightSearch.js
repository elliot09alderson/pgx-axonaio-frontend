import React, { useState } from "react";
import styled from "styled-components";

const options = [
  { label: "+ 91", value: 1 },
  { label: "+1", value: 2 },
  { label: "+3", value: 3 },
  { label: "+4", value: 4 },
  { label: "+51", value: 5 },
];

const Container = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const LeftContainer = styled.div`
  position: relative;
  display: inline-block;
  background-color: #979797;
`;

const RightContainer = styled.div`
  flex: 1;
  /* margin-left: 16px; */
  border-left: 1px solid #ddd;
`;

const LeftRightDropdown = ({ name, searchText, onHandleSearchText }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  // const [searchText, setSearchText] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <Container>
      <LeftContainer>
        <button
          className="h-8 px-2 first-text focus:outline-none rounded-l-md"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {selectedOption ? selectedOption.label : "Select an option"}
        </button>
        {isDropdownOpen && (
          <ul className="absolute  ring-1 ring-gray-400  focus:outline-none">
            {filteredOptions.map((option) => (
              <li
                className="px-2 py-1 list-none cursor-pointer hover:opacity-90 fourth-bg border-b border-gray-300"
                key={option.value}
                selected={option === selectedOption}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </LeftContainer>
      <RightContainer>
        <input
          className="ring-1 ring-gray-400  focus:outline-none h-8 w-full rounded-r-md  rounded-l-none pl-2"
          placeholder="Enter Ten Digit Number"
          name={name}
          value={searchText}
          onChange={onHandleSearchText}
        />
      </RightContainer>
    </Container>
  );
};

export default LeftRightDropdown;
