import React from "react";
import styled from "styled-components";

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const Textarea = styled.textarea`
  display: block;
  width: 100%;
  height: 100px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #0077cc;
    box-shadow: 0 0 0 2px #b3d4fc;
  }
`;

const TextareaWithLabel = ({ label, name, value, onChange }) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-xs first-text font-bold sm:font-semibold sm:text-sm"
      >
        {label}
      </label>
      <textarea
        className="w-full ring-1 ring-gray-400 pl-2 focus:outline-none h-16 rounded-lg"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
};

export default TextareaWithLabel;
