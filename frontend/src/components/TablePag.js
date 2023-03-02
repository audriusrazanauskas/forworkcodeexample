import React, { useEffect } from "react";
import styled from "styled-components";
import { useTable, useSortBy, usePagination } from "react-table";
import { Table } from "reactstrap";
import { icons } from "../utils/icons";
import { primary, white } from "../utils/colors";
import Loader from "./Loader";
import Message from "./Message";

const TablePag = ({ loading, error, columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <PaginationWrapper className="pagination">
            <Left>
              <ItemsPerPageWrapper>
                <span>Show</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                  }}
                >
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>
                <span> items per page</span>
              </ItemsPerPageWrapper>
            </Left>
            <Right>
              <PaginationButtonsWrapper>
                <PaginationButton
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                >
                  <PaginationButtonIcon src={icons.paginationarrowleftdouble} />
                </PaginationButton>
                <PaginationButton
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  <PaginationButtonIcon src={icons.paginationarrowleft} />
                </PaginationButton>
                <PaginationButton
                  onClick={() => gotoPage(pageIndex)}
                  disabled={!canNextPage}
                  className="active"
                >
                  {pageIndex + 1}
                </PaginationButton>
                <PaginationButton
                  onClick={() => gotoPage(pageIndex + 1)}
                  disabled={!canNextPage}
                >
                  {pageIndex + 2}
                </PaginationButton>
                <PaginationButton
                  onClick={() => gotoPage(pageIndex + 2)}
                  disabled={!canNextPage}
                >
                  {pageIndex + 3}
                </PaginationButton>
                <PaginationButton
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                >
                  <PaginationButtonIcon src={icons.paginationarrowright} />
                </PaginationButton>
                <PaginationButton
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                >
                  <PaginationButtonIcon
                    src={icons.paginationarrowrightdouble}
                  />
                </PaginationButton>
              </PaginationButtonsWrapper>
            </Right>
          </PaginationWrapper>
        </>
      )}
    </>
  );
};

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 1.5rem;
`;

const PaginationButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const PaginationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #7d8193;
  font-weight: 500;
  height: 42px;
  width: 42px;
  border-radius: 50%;
  border: none;
  background: #f0f2f4;  
  cursor: pointer;
  margin-left: 8px;
  &.active {
    background: ${primary};
    color: ${white};
`;

const PaginationButtonIcon = styled.img`
  height: 12px;
`;

const Left = styled.div`
  display: flex;
`;

const Right = styled.div`
  display: flex;
`;

const ItemsPerPageWrapper = styled.div`
  display: flex;
  align-items: center;

  span {
    color: #989ea7;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0px;
  }
  select {
    background: #f0f2f4;
    height: 42px;
    border-radius: 100px;
    font-size: 14px;
    font-weight: 600;
    border: none;
    padding: 5px 12px;
    margin: 0 16px;
  }
`;

export default TablePag;
