import React from 'react';
import styled from 'styled-components';

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;
const PopupRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;
const InputLabel = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const InputField = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid grey;
`;

const DropdownContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const DropdownLabel = styled.label`
  font-weight: bold;
  margin-right: 10px;
`;

const DropdownSelect = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid grey;
`;

const PopupMerchantForm = ({ onClose }) => {
  const inputs = [
    { label: "Company Name:", name: "companyName", type: "input" },
    {
      label: "Business Type:",
      name: "businessType",
      type: "select",
      options: ["a", "b", "c", "d"],
    },
    {
      label: "Business Category ",
      name: "businessCategory",
      type: "select",
      options: ["a", "b", "c", "d"],
    },
    { label: "Description:", name: "description", type: "input" },
    { label: "Website:", name: "website", type: "input" },
    { label: "City:", name: "city", type: "input" },
    { label: "State:", name: "state", type: "input" },
    { label: "Address:", name: "address", type: "input" },
    { label: "Pincode:", name: "pincode", type: "input" },
  ];
  return (
    <PopupContainer>
      <PopupContent>
        <PopupRow>
          <InputLabel>Name:</InputLabel>
          <InputField type="text" />
        </PopupRow>

        <DropdownContainer>
          <DropdownLabel>Option 1:</DropdownLabel>
          <DropdownSelect>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </DropdownSelect>
        </DropdownContainer>
        {/* {
          inputs.map((item, index) => {

          })
        } */}
        <button onClick={onClose}>Close</button>
      </PopupContent>
    </PopupContainer>
  );
};

export default PopupMerchantForm;
