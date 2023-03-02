import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { getSupplierDetails } from "../actions/supplierActions";

const SupplierScreen = ({ history, match }) => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const supplierDetails = useSelector((state) => state.supplierDetails);
  const { loading, error, supplier } = supplierDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (!supplier._id || supplier._id !== id) {
      dispatch(getSupplierDetails(id));
    }
  }, [dispatch, match, id]);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={supplier.name} />

          <h3>{supplier.name}</h3>
        </>
      )}
    </>
  );
};

export default SupplierScreen;
