import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { SUPPLIER_UPDATE_RESET } from "../constants/supplierConstants";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button, Tabs, Tab, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { getSupplierDetails, updateSupplier } from "../actions/supplierActions";

const SupplierEditScreen = ({}) => {
  const supplierId = useParams().id;

  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const supplierDetails = useSelector((state) => state.supplierDetails);
  const { loading, error, supplier } = supplierDetails;

  const supplierUpdate = useSelector((state) => state.supplierUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = supplierUpdate;

  console.log(supplierDetails);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: SUPPLIER_UPDATE_RESET });
      navigate("/admin/supplierlist");
    } else {
      if (!supplier.name || supplier._id !== supplierId) {
        dispatch(getSupplierDetails(supplierId));
      } else {
        setName(supplier.name);
      }
    }
  }, [dispatch, supplierId, supplier, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateSupplier({
        _id: supplierId,
        name,
      })
    );
  };

  return (
    <>
      aa
      <FormContainer>
        <h1>Edit Supplier</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>

              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

const Container = styled.div`
  width: 100%;
`;

export default SupplierEditScreen;
