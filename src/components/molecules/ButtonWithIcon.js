import React from "react";
import styled from "styled-components";

export const Icon = styled.span`
  margin-left: 8px;
`;

const Label = styled.span`
  font-weight: bold;
`;

const ButtonWithIcon = ({ icon, label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="third-bg rounded-lg px-2   cursor-pointer select-none text-second transition-all flex items-center justify-center "
    >
      {label && (
        <label className="text-xs sm:text-sm font-bold sm:font-semibold first-text text-center mt-1">
          {label}
        </label>
      )}
      {icon && <Icon>{icon}</Icon>}
    </div>
  );
};
export default ButtonWithIcon;
