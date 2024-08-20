import React from "react";
import styled from "styled-components";

const TableContainer = styled.table`
  border: 2px solid forestgreen;
  width: 40%;
  height: 200px;
  border-radius: 10px;
  background: #fff;
`;
const TableRow = styled.tr`
  border: 1px solid black;
`;
const TableHead = styled.th`
  text-align: center;
  border-bottom: 1px solid black;
`;
const TableData = styled.td`
  text-align: center;
`;
const TableComponent = ({ data, mode }) => {
  return (
    <TableContainer>
      <TableRow>
        <TableHead>No of {mode}</TableHead>
        <TableHead>Count</TableHead>
      </TableRow>
      {data.map((item) => {
        return (
          <TableRow key={item?._id}>
            <TableData>No of {item.transaction_status ?? item._id}</TableData>
            <TableHead>{item.count}</TableHead>
          </TableRow>
        );
      })}
    </TableContainer>
  );
};

export default TableComponent;
