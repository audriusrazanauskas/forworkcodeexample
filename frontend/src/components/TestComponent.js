import React, { useState, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import TutorialDataService from "../screens/TutorialService";
import { useTable } from "react-table";
import { listProducts } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import TableContainer from "./TableContainer";
import TablePag from "./TablePag";
import TablePagination from "./TablePagination";
/* import "bootstrap/dist/css/bootstrap.min.css"; */
import { addToCart, removeFromCart } from "../actions/cartActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { icons } from "../utils/icons";
import { white, black, primary } from "../utils/colors";

const TestComponent = ({}) => {
  const [searchTitle, setSearchTitle] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [manufacturer, setManufacturer] = useState("");

  const pageSizes = [10, 25, 100];

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages } = productList;

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const onChangeManufacturer = (e) => {
    const manufacturer = e.target.value;
    setManufacturer(manufacturer);
  };

  const getRequestParams = (searchTitle, page, pageSize, manufacturer) => {
    let params = {};

    if (searchTitle) {
      params["keyword"] = searchTitle;
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
    if (manufacturer) {
      params["manufacturer"] = manufacturer;
    }

    return params;
  };

  useEffect(() => {
    const params = getRequestParams(searchTitle, page, pageSize, manufacturer);
    dispatch(listProducts(searchTitle, page, pageSize, manufacturer));
    console.log(params);
  }, [dispatch, searchTitle, page, pageSize, manufacturer]);

  const findByTitle = () => {
    setPage(1);
    dispatch(listProducts(searchTitle));
  };

  const findByManufacturer = () => {
    setPage(1);
    dispatch(listProducts(manufacturer));
  };

  const handleManufacturerChange = (event) => {
    setManufacturer(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  const columns = useMemo(
    () => [
      {
        Header: "SKU",
        disableSortBy: false,
        accessor: (row) => {
          const { sku } = row;

          return (
            <TableCell className="sku">
              <TableText className="small">#{sku}</TableText>
            </TableCell>
          );
        },
      },
      {
        Header: "Product Name",
        disableSortBy: false,
        accessor: (row) => {
          const { name, description, image } = row;

          return (
            <ProductNameWrapper>
              <ProductImageWrapper>
                <ProductImage src={image} />
              </ProductImageWrapper>
              <ProductInfoWrapper>
                <ProductName>{name}</ProductName>
                <ProductDescription>{description}</ProductDescription>
              </ProductInfoWrapper>
            </ProductNameWrapper>
          );
        },
      },

      {
        Header: "Contents",
        disableSortBy: false,
        accessor: (row) => {
          const { contents } = row;

          return <TableText>#{contents}</TableText>;
        },
      },

      {
        Header: "Manufacturer",
        disableSortBy: false,
        accessor: (row) => {
          const { manufacturer } = row;

          return (
            <TableCell>
              <TableText>#{manufacturer}</TableText>
            </TableCell>
          );
        },
      },
      {
        Header: "Supplier",
        disableSortBy: false,
        accessor: (row) => {
          const { price } = row;

          return <TableText>supplier</TableText>;
        },
      },
      {
        Header: "Price",
        disableSortBy: false,
        accessor: (row) => {
          const { price } = row;

          return <TableText>{price}</TableText>;
        },
      },
      {
        Header: "Add to Cart",
        accessor: (values) => {
          const productId = values._id;

          return productId;
        },
        disableSortBy: true,
        Cell: ({ cell }) => {
          const { value } = cell;

          const addToCartHandler = (productId) => {
            dispatch(addToCart(productId, 1));
            toast("Product added to cart!");
          };

          return (
            <TableButtonsWrapper>
              <TableButton className="favorite">
                <TableButtonIcon src={icons.heart} />
              </TableButton>
              <TableButton
                className="cart"
                onClick={() => addToCartHandler(value)}
              >
                <TableButtonIcon src={icons.greenplus} />
                Add
              </TableButton>
              {/*     <TableButton onClick={() => navigate(`/product/${value}`)}>
                View
              </TableButton> */}
            </TableButtonsWrapper>
          );
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: products,
    });

  return (
    <>
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findByTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by manufacturer"
              value={manufacturer}
              onChange={onChangeManufacturer}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findByManufacturer}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-12 list">
          <div className="mt-3">
            {"Items per Page: "}
            <select onChange={handlePageSizeChange} value={pageSize}>
              {pageSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            <Pagination
              className="my-3"
              count={pages}
              page={page}
              siblingCount={1}
              boundaryCount={1}
              variant="outlined"
              shape="rounded"
              onChange={handlePageChange}
            />
          </div>

          <TablePag
            loading={loading}
            data={products}
            columns={columns}
            error={error}
          />
        </div>
      </div>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background: #fff;
`;

const Left = styled.div`
  max-width: 70%;
`;

const Right = styled.div`
  display: flex;
`;

const FilterLeft = styled.div`
  display: flex;
  align-items: center;
`;

const FilterRight = styled.div`
  display: flex;
  align-items: center;
`;

const Main = styled.div`
  width: 100%;
  padding: 2rem 2rem;
  display: flex;
  flex-direction: column;
`;
const TableWrapper = styled.div`
  width: 100%;
  border: 1px solid #f0f2f5;
  border-radius: 22px;
  overflow: hidden;
`;
const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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

const FilterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;

const Tag = styled.div`
  background: #f5f7fb;
  border-radius: 1rem;
  height: 40px;
  padding: 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 14px;
  color: #727190;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0px;
  text-transform: none;
  cursor: pointer;
  &.active {
    background: #8f7df8;
    color: #fff;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Breadcrumbs = styled.div`
  display: flex;
  margin: 0 0 2rem;
`;
const BreadcrumbText = styled.a`
  font-size: 14px;
  margin: 0;
  padding: 0;
  font-weight: 500;
  color: #727190;
  text-decoration: none;
  margin-right: 12px;
`;

const BreadcrumbItem = styled.div`
  display: flex;
  &:last-child {
    ${BreadcrumbText} {
      color: #2a364e;
    }
  }
`;

const ProductNameWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ProductImageWrapper = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 8px;
  overflow: hidden;
`;

const ProductImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const ProductInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`;

const ProductName = styled.h6`
  font-size: 16px;
  font-weight: 600;
  color: #2a364e;
  margin-bottom: 2px;
  letter-spacing: 0px;
  text-transform: none;
  white-space: nowrap;
  width: 250px;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 0 0 2px;
  padding: 0;
`;

const ProductDescription = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #727190;
  margin: 0;
  letter-spacing: 0px;
  white-space: nowrap;
  width: 250px;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const TableCell = styled.div`
  display: flex;
  align-items: center;
  &.sku {
    width: 50px;
  }
`;
const TableText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #636363;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;

  &.small {
    font-size: 12px;
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
`;
const TableButtonIcon = styled.img`
  height: 18px;
`;

const InnerHeader = styled.div`
  width: 100%;
  border-bottom: 1px solid #e6e8ec;
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

export default TestComponent;
