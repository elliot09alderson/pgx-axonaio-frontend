import React, { useState } from "react";
import styled from "styled-components";

const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  padding: 0;
  margin: 0;
  list-style: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  z-index: 1;
`;

const DropdownItem = styled.li`
  display: block;
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }
`;

function DropdownbuiltList({ items, selectedItem, onItemSelect, label }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleHeaderClick() {
    setIsOpen(!isOpen);
  }

  function handleItemClick(item) {
    onItemSelect(item);
    setIsOpen(false);
  }

  return (
    <div className="relative ">
      <label className="text-xs sm:text-sm sm:font-semibold font-bold first-text">
        {label}
      </label>
      <div
        className="cursor-pointer justify-between flex items-center py-1 px-2 rounded-lg ring-1 second-text font-semibold ring-gray-400 first-text border"
        onClick={handleHeaderClick}
      >
        {selectedItem ? selectedItem : "Select an item"}
        {isOpen ? <span>&#9650;</span> : <span>&#9660;</span>}
      </div>
      {isOpen && (
        <DropdownList>
          {items.map((item, index) => (
            <li
              key={index}
              className="py-1 third-bg pl-2 border first-text"
              onClick={() => handleItemClick(item)}
            >
              {item}
            </li>
          ))}
        </DropdownList>
      )}
    </div>
  );
}

export default DropdownbuiltList;
