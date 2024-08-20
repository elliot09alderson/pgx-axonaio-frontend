import React, { useState } from "react";

const TabLayout = ({ tabs }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const onHandleTabs = (index) => {
    setActiveTabIndex(index);
    // onCurrentTab(index);
  };

  return (
    <div className="flex flex-wrap  flex-col border justify-center  overflow-hidden  px-3 sm:px-3 shadow-sm  ">
      <div className="flex flex-row flex-wrap justify-start sm:gap-4 gap-0 cursor-pointer  px-0 sm:px-3  items-center   ">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`  ${
              index === activeTabIndex
                ? "first-text font-bold border-blue-900 transition-all fourth-bg mt-3"
                : "second-text   "
            } text-xs sm:text-sm md:text-md   pb-3 px-2 flex mt-3  text-center `}
            onClick={() => onHandleTabs(index)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      <div className="flex flex-col">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`${index === activeTabIndex ? "active" : ""} hidden`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabLayout;
