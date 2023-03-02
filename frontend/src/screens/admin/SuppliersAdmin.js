import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  listSuppliers,
  deleteSupplier,
  createSupplier,
} from "../../actions/supplierActions";
import { SUPPLIER_CREATE_RESET } from "../../constants/supplierConstants";
import { useNavigate } from "react-router-dom";
import { primary, white } from "../../utils/colors";
import { icons } from "../../utils/icons";
import TableContainer from "../../components/TableContainer";
import { DefaultButton } from "../../components/buttons/DefaultButton";
import { toast } from "react-toastify";
import { Breadcrumbs } from "../../components/misc/Breadcrumbs";
import { Pagination } from "../../components/table/Pagination";
import { TableSearch } from "../../components/inputs/TableSearch";
import Moment from "react-moment";

const SuppliersAdmin = ({}) => {
  const navigate = useNavigate();

  const [supplierName, setSupplierName] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const pageSizes = [4, 10, 25, 100];

  const dispatch = useDispatch();

  const supplierList = useSelector((state) => state.supplierList);
  const { loading, error, suppliers, pages } = supplierList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const supplierDelete = useSelector((state) => state.supplierDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = supplierDelete;

  const supplierCreate = useSelector((state) => state.supplierCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    supplier: createdSupplier,
  } = supplierCreate;

  const createSupplierHandler = () => {
    dispatch(createSupplier());
  };

  const onChangeSupplierName = (e) => {
    const supplierName = e.target.value;
    setSupplierName(supplierName);
  };

  const getRequestParams = (supplierName, page, pageSize) => {
    let params = {};

    if (supplierName) {
      params["keyword"] = supplierName;
    }

    if (page) {
      params["page"] = page;
    } else {
      params["page"] = 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    } else {
      params["size"] = 10;
    }

    return params;
  };

  useEffect(() => {
    const params = getRequestParams(supplierName, page, pageSize);

    dispatch({ type: SUPPLIER_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login");
    }

    if (successCreate) {
      navigate(`/admin/supplier/${createdSupplier._id}/edit`);
    } else {
      dispatch(listSuppliers(supplierName, page, pageSize));
      console.log(params);
    }

    console.log("Suppliers", suppliers);
  }, [
    dispatch,
    supplierName,
    page,
    pageSize,
    successDelete,
    successCreate,
    createdSupplier,
  ]);

  const findBySupplierName = () => {
    setPage(1);
    dispatch(listSuppliers(supplierName));
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        disableSortBy: false,
        accessor: (row) => {
          const { name } = row;

          return (
            <TableCell>
              <TableText>{name}</TableText>
            </TableCell>
          );
        },
      },
      {
        Header: "ID",
        disableSortBy: false,
        accessor: (row) => {
          const { _id } = row;

          return (
            <TableCell>
              <TableText>{_id}</TableText>
            </TableCell>
          );
        },
      },
      {
        Header: "Created at",
        disableSortBy: false,
        accessor: (row) => {
          const { createdAt } = row;

          const dateToFormat = createdAt;

          return (
            <TableCell>
              <TableText>
                <Moment format="YYYY/MM/DD hh:mm" date={dateToFormat} />
              </TableText>
            </TableCell>
          );
        },
      },

      {
        Header: "Action",
        accessor: (values) => {
          const productId = values._id;

          return productId;
        },
        disableSortBy: true,
        Cell: ({ cell }) => {
          const { value } = cell;

          const deleteHandler = (supplierId) => {
            dispatch(deleteSupplier(supplierId));
            toast.success("Supplier Deleted");
          };

          return (
            <>
              <TableButtonsWrapper>
                <TableButton
                  className="edit"
                  onClick={() => navigate(`/admin/supplier/${value}/edit`)}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="red"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask
                      id="mask0_841_16415"
                      maskUnits="userSpaceOnUse"
                      x="3"
                      y="2"
                      width="15"
                      height="15"
                    >
                      <path d="M18 2H3V17H18V2Z" fill="currentColor" />
                    </mask>
                    <g mask="url(#mask0_841_16415)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.4164 3.87626C12.1707 3.12198 13.3936 3.12198 14.1479 3.87626L16.1281 5.85645L15.7663 6.21819L16.1281 5.85645C16.8823 6.61073 16.8823 7.83366 16.1281 8.58794L15.8513 8.31115L16.1281 8.58795L9.6075 15.1085C9.24526 15.4708 8.75396 15.6742 8.24173 15.6742H5.56143C4.88137 15.6742 4.33008 15.1229 4.33008 14.4428V11.7626C4.33008 11.2504 4.53354 10.759 4.89579 10.3968C4.8958 10.3968 4.89581 10.3968 4.89581 10.3968L11.4164 3.87626ZM11.7896 4.24946L11.792 4.25191L11.7896 4.24946L5.27143 10.7725L5.27144 10.7725M13.3966 4.62756C13.0572 4.28821 12.507 4.28821 12.1677 4.62756L11.7928 4.25271L12.1677 4.62756L5.64709 11.1481L5.64707 11.1481C5.48414 11.311 5.39258 11.5321 5.39258 11.7626V14.4428C5.39258 14.5361 5.46818 14.6117 5.56143 14.6117H8.24173C8.4722 14.6117 8.69321 14.5202 8.85616 14.3572L8.85618 14.3572L15.3768 7.83664C15.7161 7.4973 15.7161 6.9471 15.3768 6.60775L13.3966 4.62756Z"
                        fill="currentColor"
                      />
                    </g>
                  </svg>
                </TableButton>
                <TableButton
                  className="delete"
                  onClick={() => deleteHandler(value)}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="red"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.3333 5.33203C15.7015 5.33203 16 5.63051 16 5.9987C16 6.36688 15.7015 6.66536 15.3333 6.66536H14.6667L14.665 6.71289L14.0425 15.427C13.9927 16.1248 13.4121 16.6654 12.7126 16.6654H7.28744C6.58793 16.6654 6.00733 16.1248 5.95749 15.427L5.33505 6.71289C5.33392 6.69695 5.33335 6.6811 5.33333 6.66536H4.66667C4.29848 6.66536 4 6.36688 4 5.9987C4 5.63051 4.29848 5.33203 4.66667 5.33203H15.3333ZM13.3317 6.66536H6.66839L7.28744 15.332H12.7126L13.3317 6.66536ZM11.3333 3.33203C11.7015 3.33203 12 3.63051 12 3.9987C12 4.36688 11.7015 4.66536 11.3333 4.66536H8.66667C8.29848 4.66536 8 4.36688 8 3.9987C8 3.63051 8.29848 3.33203 8.66667 3.33203H11.3333Z"
                      fill="currentColor"
                    />
                  </svg>
                </TableButton>
              </TableButtonsWrapper>
            </>
          );
        },
      },
    ],
    []
  );

  const gotoPage = (page) => {
    setPage(page);
  };

  const canPreviousPage = page > 1;

  const canNextPage = page < pages;

  const previousPage = () => {
    setPage(page - 1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  return (
    <>
      <Wrapper>
        <InnerHeader>
          <InnerHeaderLeft>
            <Breadcrumbs label1="Admin" label2="Suppliers" />
          </InnerHeaderLeft>
          <InnerHeaderRight>
            <DefaultButton
              onClick={createSupplierHandler}
              label="Create Supplier"
              icon={icons.whiteplus}
            ></DefaultButton>
          </InnerHeaderRight>
        </InnerHeader>

        <Main>
          <InnerWrapper>
            <Top>
              <TopLeft>
                <TitleWrapper>
                  <Title>Suppliers</Title>
                </TitleWrapper>
                <TableSearch
                  onClick={findBySupplierName}
                  onChange={onChangeSupplierName}
                  placeholder="Search by supplier name"
                />
              </TopLeft>
              <TopRight>
                <Filters></Filters>
              </TopRight>
            </Top>

            <ContentWrapper>
              <TableWrapper>
                <TableContainer
                  columns={columns}
                  data={suppliers}
                  loading={loading}
                  error={error}
                />

                <Pagination
                  page={page}
                  pages={pages}
                  nextPage={nextPage}
                  previousPage={previousPage}
                  gotoPage={gotoPage}
                  handlePageSizeChange={handlePageSizeChange}
                  pageSize={pageSize}
                  pageSizes={pageSizes}
                />
              </TableWrapper>
            </ContentWrapper>
          </InnerWrapper>
        </Main>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  background: #f8f8f8;
`;

const Main = styled.div`
  width: 100%;
  padding: 0rem 2rem;
  display: flex;
  flex-direction: column;
`;

const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 30px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
const Top = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2.5rem;
`;

const TopLeft = styled.div`
  display: flex;
  align-items: center;
`;
const TopRight = styled.div`
  display: flex;
  align-items: center;
`;

const Filters = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const TableWrapper = styled.div`
  width: 100%;
  border: 0px solid #f0f2f5;
  border-radius: 0px;
  overflow: hidden;
`;
const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-right: 3rem;
`;

const Title = styled.h1`
  font-size: 20px;
  letter-spacing: 0px;
  color: #2a364e;
  text-transform: none;
  font-weight: 600;
  padding: 0;
  margin: 0 0 10px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TableCell = styled.div`
  display: flex;
  align-items: center;
  &.sku {
    width: 50px;
  }
`;
const TableText = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: #636363;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;

  &.small {
    font-size: 13px;
  }
`;

const TableButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const TableButton = styled.button`
  background: #75797f;
  color: #2a364e;
  border-radius: 8px;
  border: none;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.5rem;

  &.favorite {
    background: #dceeff;
    color: #23629d;
  }
  &.cart {
    background: #e9f4f5;
    color: #00565c;
    width: initial;
    padding: 0 24px;
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 600;
    img {
      height: 14px;
      margin-right: 6px;
    }
  }
  &.edit {
    background: #dceeff;
    color: #3a74a9;
  }
  &.delete {
    background: #fbd3d3;
    color: #bf5959;
  }

  &:hover {
    transition: 0.2s all;
    &.edit {
      background: #3a74a9;
      color: #fff;
    }
    &.delete {
      background: #bf5959;
      color: #fff;
    }
  }
`;
const TableButtonIcon = styled.img`
  height: 22px;
`;

const InnerHeader = styled.div`
  width: 100%;
  border-bottom: 0px solid #e6e8ec;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InnerHeaderLeft = styled.div`
  display: flex;
`;

const InnerHeaderRight = styled.div`
  display: flex;
`;

const CartButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${primary};
  color: ${white};
  border-radius: 50px;
  font-size: 1rem;
  padding: 10px 36px;
  border: none;
  font-weight: 500;
`;

const CartButtonIcon = styled.img`
  height: 16px;
  margin-right: 10px;
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

export default SuppliersAdmin;
