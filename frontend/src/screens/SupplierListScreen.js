import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  listSuppliers,
  deleteSupplier,
  createSupplier,
} from "../actions/supplierActions";
import { useNavigate } from "react-router-dom";
import TableContainer from "../components/TableContainer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SUPPLIER_CREATE_RESET } from "../constants/supplierConstants";

const SupplierListScreen = ({}) => {
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const supplierList = useSelector((state) => state.supplierList);
  const { loading, error, suppliers } = supplierList;

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

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    dispatch({ type: SUPPLIER_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login");
    }

    if (successCreate) {
      navigate(`/admin/supplier/${createdSupplier._id}/edit`);
    } else {
      dispatch(listSuppliers());
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdSupplier,
  ]);

  const createSupplierHandler = () => {
    dispatch(createSupplier());
  };

  const columns = useMemo(
    () => [
      {
        Header: "Supplier Name",
        accessor: "name",
        disableSortBy: false,
      },
      {
        Header: "ID",
        accessor: "_id",
        disableSortBy: false,
      },
      {
        Header: "Date",
        accessor: "createdAt",
        disableSortBy: false,
        /*  {supplier.createdAt.substring(0, 10)} */
      },
      {
        Header: "Actions",
        accessor: (values) => {
          const supplierId = values._id;

          return supplierId;
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
              <LinkContainer to={`/admin/supplier/${value}/edit`}>
                <Button variant="light" className="btn-sm">
                  Details
                </Button>
              </LinkContainer>
              <Button
                variant="light"
                className="btn-sm"
                onClick={() => deleteHandler(value)}
              >
                Delete
              </Button>
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <Wrapper>
        <InnerHeader>
          <Left>
            <Form onSubmit={submitHandler} inline>
              <Form.Control
                type="text"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search Products..."
                className="mr-sm-2 ml-sm-5"
              ></Form.Control>
            </Form>
          </Left>
          <Right>
            <Button variant="outline-primary" onClick={createSupplierHandler}>
              Create Supplier
            </Button>
          </Right>
        </InnerHeader>
        <Main>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <TableContainer columns={columns} data={suppliers} />
          )}
        </Main>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background: #fff;
`;

const InnerHeader = styled.div`
  width: 100%;
  border-bottom: 1px solid #e6e8ec;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  display: flex;
`;

const Right = styled.div`
  display: flex;
`;

const Main = styled.div`
  width: 100%;
  padding: 2rem 2rem;
`;

export default SupplierListScreen;
