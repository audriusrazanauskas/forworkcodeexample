import React, { useState, useEffect, useMemo, useRef } from "react";
import Pagination from "@material-ui/lab/Pagination";
import TutorialDataService from "./TutorialService";
import { useTable } from "react-table";
import styled from "styled-components";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";

import TestComponent from "../components/TestComponent";

import Meta from "../components/Meta";

const TestScreen = ({ props }) => {
  /*   const keyword = useParams().keyword;

  const navigate = useNavigate();

  const pageNumber = useParams().pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));

    console.log("Pages", products);
  }, [dispatch, keyword, pageNumber]);
 */
  return (
    <>
      <Meta />
      <Wrapper>
        <TestComponent />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background: #fff;
`;

export default TestScreen;
