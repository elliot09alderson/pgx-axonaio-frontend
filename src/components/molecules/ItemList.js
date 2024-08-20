import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import styled from 'styled-components';
const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding:12px 0px 12px 25px;
  cursor: pointer;
  &:hover {
    background-color: #26b24b;
    border-top: 1px solid #231f20;
  }
  &.active {
    background-color: #26b24b;
    font-weight: bold;
    color: #fff;
  }
  &.activate {
    background-color: rgb(76 30 149);
    font-weight: bold;
    color: #26b24b;
  }
`;
const FontItem = styled.span`
  background-color: #231f20;
  margin-right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  text-align: center;
  padding-top: 2px;
  transition: color 0.3s;
  color: #fff;
`
const Menuspan = styled.span`
  color: #fff;
  /* padding-left: 5px; */
  line-height: 30px;
  font-size: 15px !important;
`
const ItemList = ({ item, index, selecMenu, onHandleDrop }) => {
  const onHandleDropList = (index) => {
    onHandleDrop(index)
  }
  return (
    <MenuItem key={`${item}+${index}`} onClick={() => onHandleDropList(index)} className={Number(selecMenu) === index ? "active" : ""}>
      <FontItem>
        <FontAwesomeIcon icon={item.icon} />
      </FontItem>
      <Menuspan>{item.name}</Menuspan>
    </MenuItem>
  )
}

export default ItemList