import React from "react";
import styled from "styled-components";
import { ErrorPara } from "../OnboardingFormComponent/BusinessComponent";

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0px;
  position: relative;
`;

export const SearchLabel = styled.label`
  font-size: ${(props) => (props?.fs ? props?.fs : "12px")};
  font-weight: 600;
  margin-bottom: 8px;
`;


const FormMandatory = styled.span`
  color: red;
  font-size: large;
`;
const Search = ({
  label,
  value,
  onChange,
  optional = false,
  type,
  name,
  plcaeholder = "",
  fs,
  pd,
  error,
  showOptional = true,
  className,
}) => {
  return (
    <div className="flex flex-col">
      <label
        fs={fs}
        className="first-text text-xs sm:text-sm font-bold sm:font-semibold "
      >
        {label}{" "}
        {optional ? (
          showOptional ? (
            <span>(Optional)</span>
          ) : (
            ""
          )
        ) : (
          <FormMandatory>*</FormMandatory>
        )}
      </label>
      <input
        className="rounded-lg h-8  ring-1 ring-gray-400 pl-2 focus:outline-none"
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={plcaeholder}
        pd={pd}
      />
      {error !== undefined && error[name] && (
        <ErrorPara>{error[name]}</ErrorPara>
      )}
    </div>
  );
};

export default Search;
