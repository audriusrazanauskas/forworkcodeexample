import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { listProducts } from "../actions/productActions";
import MotionHoc from "../components/motion/MotionHoc";

const HomeComponent = () => {
  return (
    <>
      <Meta />
      <h1>HomeScreen</h1>
    </>
  );
};

const Home = MotionHoc(HomeComponent);

export default Home;
