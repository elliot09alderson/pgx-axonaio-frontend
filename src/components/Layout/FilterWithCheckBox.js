import React, { useState } from "react";
import styled from "styled-components";
import Search from "../molecules/Serach";
import DropCheckBox from "./DropCheckboxLayout";

const FilterPopup = ({ onClose }) => {
  const [checkedFilters, setCheckedFilters] = useState([]);

  // const handleFilterChange = (event) => {
  //   const { value, checked } = event.target;
  //   if (checked) {
  //     setCheckedFilters([...checkedFilters, value]);
  //   } else {
  //     setCheckedFilters(checkedFilters.filter((filter) => filter !== value));
  //   }
  // };

  const handleApplyFilters = () => {
    // TODO: apply filters
    onClose();
  };

  const handleClearFilters = () => {
    setCheckedFilters([]);
  };

  return (
    <div className="absolute top-8 sm:top-10 md:p-8 rounded-xl  p-2 px-4 sm:p-4 left-0 third-bg first-text md:text-md sm:text-sm  text-xs gap-2 flex flex-col">
      <div className="flex items-center justify-center gap-5 py-1">
        <div
          className="px-2 py-1 cursor-pointer font-bold hover:opacity-70 transition-all "
          onClick={handleClearFilters}
        >
          Clear All
        </div>
        <div
          className="px-2 py-1 cursor-pointer font-bold hover:opacity-70 transition-all "
          onClick={handleApplyFilters}
        >
          Apply
        </div>
      </div>
      <Search label="Transaction" className={"h-8"} />
      <h5 className="text-xs sm:text-sm md:text-md m-0 p-0 ">Filters</h5>
      <DropCheckBox />
    </div>
  );
};

export default FilterPopup;
