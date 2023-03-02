import React, { useEffect } from "react";
import styled from "styled-components";
import { icons } from "../../utils/icons";
import { primary, white } from "../../utils/colors";

export const Pagination = ({
  page,
  pages,
  nextPage,
  previousPage,
  gotoPage,
  pageSize,
  pageSizes,
  handlePageSizeChange,
}) => {
  const canPreviousPage = page > 1;

  const canNextPage = page < pages;

  useEffect(() => {
    console.log("Pagination component loaded");
  }, []);

  return (
    <>
      <Wrapper className="pagination">
        <Left>
          <ItemsPerPageWrapper>
            <span>Show</span>
            <select onChange={handlePageSizeChange} value={pageSize}>
              {pageSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span> items per page</span>
          </ItemsPerPageWrapper>
        </Left>
        <Right>
          <ButtonsWrapper>
            <PaginationButton
              onClick={() => gotoPage(1)}
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

            {page - 1 > 0 && (
              <PaginationButton
                onClick={() => gotoPage(page - 1)}
                disabled={!canPreviousPage}
              >
                {page - 1}
              </PaginationButton>
            )}

            <PaginationButton onClick={() => gotoPage(page)} className="active">
              {page}
            </PaginationButton>

            {page < pages && (
              <PaginationButton
                onClick={() => gotoPage(page + 1)}
                disabled={!canNextPage}
              >
                {page + 1}
              </PaginationButton>
            )}

            {page + 2 < pages && (
              <PaginationButton
                onClick={() => gotoPage(page + 2)}
                disabled={!canNextPage}
              >
                {page + 2}
              </PaginationButton>
            )}

            {page + 3 < pages && (
              <PaginationButton
                onClick={() => gotoPage(page + 3)}
                disabled={!canNextPage}
              >
                {page + 3}
              </PaginationButton>
            )}

            <PaginationButton
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              <PaginationButtonIcon src={icons.paginationarrowright} />
            </PaginationButton>
            <PaginationButton
              onClick={() => gotoPage(pages)}
              disabled={!canNextPage}
            >
              <PaginationButtonIcon src={icons.paginationarrowrightdouble} />
            </PaginationButton>
          </ButtonsWrapper>
        </Right>
      </Wrapper>
    </>
  );
};
const Left = styled.div`
  max-width: 70%;
`;

const Right = styled.div`
  display: flex;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 1.5rem;
`;

const ButtonsWrapper = styled.div`
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
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const PaginationButtonIcon = styled.img`
  height: 12px;
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
