import React, { useState } from 'react';
import styled from 'styled-components';

const TableWrapper = styled.table`
  border-collapse: collapse;
  width: 100%;
  overflow-x: auto;
`;

const TableHead = styled.thead`
  background-color: #f2f2f2;
`;

const TableRow = styled.tr`
  border: 1px solid #ddd;
`;

const TableData = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
`;

const TableHeadData = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

const RangeText = styled.span`
  font-size: 14px;
`;

const PageButton = styled.button`
  margin: 0 8px;
`;

function Table({ data, rowsPerPage = 5 }) {
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const currentData = data.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const firstRow = firstIndex + 1;
  const lastRow = lastIndex > data.length ? data.length : lastIndex;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <TableWrapper>
        <TableHead>
          <TableRow>
            {data.map((item, index) => {
              return (
                <TableHeadData key={index}>
                  {item}
                </TableHeadData>
              );
            })}
          </TableRow>
        </TableHead>
        <tbody>
          {currentData.map((row, index) => (
            <TableRow key={index}>
              <TableData>{row}</TableData>
              <TableData>{row}</TableData>
              <TableData>{row}</TableData>
              <TableData>{row}</TableData>
              <TableData>{row}</TableData>
              <TableData>{row}</TableData>
            </TableRow>
          ))}
        </tbody>
      </TableWrapper>
      <PaginationWrapper>
        <RangeText>
          Showing {firstRow}-{lastRow} of {data.length} rows
        </RangeText>
        <div>
          <PageButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </PageButton>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PageButton
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={currentPage === page}
            >
              {page}
            </PageButton>
          ))}
          <PageButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </PageButton>
        </div>
      </PaginationWrapper>
    </>
  );
}

export default Table;
