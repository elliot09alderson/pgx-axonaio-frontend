import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styled from "styled-components";
import { Icon } from "../molecules/ButtonWithIcon";

const CheckboxDiv = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const DropCheckBox = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <>
      <div
        className="cursor-pointer p-2 m-0 second-bg rounded-lg flex items-center justify-center fourth-text"
        onClick={handleClick}
      >
        Type{" "}
        <Icon>
          {" "}
          <FontAwesomeIcon icon={faArrowDown} />
        </Icon>
      </div>
      <CheckboxDiv isOpen={isOpen}>
        <div className="flex flex-wrap items-center py-1 justify-between">
          <div className="flex items-center justify-between">
            <input
              type="checkbox"
              name="item1"
              className="mb-[6px]"
              value="Item 1"
            />
            <label>Item 1</label>
          </div>
          <div className="flex items-center justify-between">
            <input
              type="checkbox"
              name="item2"
              className="mb-[6px]"
              value="Item 2"
            />
            <label>Item 2</label>
          </div>
          <div className="flex items-center justify-between">
            <input
              type="checkbox"
              name="item3"
              className="mb-[6px]"
              value="Item 3"
            />
            <label>Item 3</label>
          </div>
        </div>
      </CheckboxDiv>
    </>
  );
};

export default DropCheckBox;
