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

const SuppliesScreen = ({ props }) => {
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

export default SuppliesScreen;
