import React, { useState } from "react";
import styled from "styled-components";
import ButtonWithIcon from "../molecules/ButtonWithIcon";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterPopup from "./FilterWithCheckBox";
import Search from "../molecules/Serach";

const Dropdown = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseFilterPopup = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex relative z-10">
      <ButtonWithIcon
        icon={<FontAwesomeIcon icon={faArrowDown} />}
        label={"Search & Filter"}
        onClick={toggleDropdown}
      />
      {isOpen && <FilterPopup onClose={handleCloseFilterPopup} />}
    </div>
  );
};

export default Dropdown;
