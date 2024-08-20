import React from 'react'
import { DropDownDiv, SelectDiv, SelectMethod, SelectOptions } from '../Layout/DropdownList';

const DropdownOptions = ({ constantOptions, selectValue, onChangeHandler }) => {
  return (
    <DropDownDiv>
      <SelectDiv>
        <SelectMethod
          value={selectValue}
          onChange={(e) => onChangeHandler(e.target.value)}
        >
          {constantOptions.map((item) => {
            return (
              <SelectOptions key={item} value={item}>
                {item}
              </SelectOptions>
            );
          })}
        </SelectMethod>
      </SelectDiv>
    </DropDownDiv>
  )
}

export default DropdownOptions