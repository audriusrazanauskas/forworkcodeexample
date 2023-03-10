import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { listProducts, listTopProducts } from "../actions/productActions";
import TableContainerPagination from "../components/TableContainerPagination";
import SearchBox from "../components/SearchBox";
import { useTable, usePagination } from "react-table";
import TablePag from "../components/TablePag";
import TableTest from "../components/TableTest";

/* import "bootstrap/dist/css/bootstrap.min.css"; */
import { addToCart, removeFromCart } from "../actions/cartActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { icons } from "../utils/icons";

const TestScreen2 = ({ match }) => {
  const keyword = useParams().keyword;

  const navigate = useNavigate();

  const pageNumber = useParams().pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  // We'll start our table without any data
  const [data, setData] = React.useState([]);
  const [loadingTable, setLoadingTable] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);

  const fetchData = React.useCallback(() => {
    // This will get called when the table needs new data
    // You could fetch your data from literally anywhere,
    // even a server. But for this example, we'll just fake it.

    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current;

    // Set the loading state
    setLoadingTable(true);

    // We'll even set a delay to simulate a server here
    setTimeout(() => {
      // Only update the data if this is the latest fetch
      if (fetchId === fetchIdRef.current) {
        const startRow = 5 * page;
        const endRow = startRow + 5;

        // Your server could send back total page count.
        // For now we'll just fake it, too
        setPageCount(Math.ceil(products.length / 5));

        setLoadingTable(false);
      }
    }, 10);
  }, []);

  useEffect(() => {
    fetchData(dispatch(listProducts(keyword, pageNumber)));
    console.log(products);
  }, [dispatch, keyword, pageNumber]);

  const columns = useMemo(
    () => [
      {
        Header: "SKU",
        disableSortBy: false,
        accessor: (row) => {
          const { sku } = row;

          return <TableText className="small">#{sku}</TableText>;
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

          return <TableText>{manufacturer}</TableText>;
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

  return (
    <>
      <Meta />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Wrapper>
            <InnerHeader>
              <InnerHeaderLeft>
                <SearchBox />
              </InnerHeaderLeft>
              <InnerHeaderRight>
                <CartButton>
                  <CartButtonIcon src={icons.cartwhite} />
                  Supply Cart
                </CartButton>
              </InnerHeaderRight>
            </InnerHeader>
            <Main>
              <TitleWrapper>
                <Title>??lifavimas ir poliravimas</Title>
                <Breadcrumbs>
                  <BreadcrumbItem>
                    <BreadcrumbText>Supplies</BreadcrumbText>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <BreadcrumbText>??lifavimas ir poliravimas</BreadcrumbText>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <BreadcrumbText>Akmen??liai</BreadcrumbText>
                  </BreadcrumbItem>
                </Breadcrumbs>
              </TitleWrapper>
              <FilterWrapper>
                <FilterLeft>
                  <Tag className="active">Akmen??liai</Tag>
                  <Tag>Diskai</Tag>
                  <Tag>Gumyt??s</Tag>
                  <Tag>Juostel??s</Tag>
                  <Tag>Pastos</Tag>
                  <Tag>Ratukai</Tag>
                  <Tag>??epet??liai</Tag>
                </FilterLeft>
                <FilterRight>filter</FilterRight>
              </FilterWrapper>
              <ContentWrapper>
                <TableWrapper>
                  <TableTest
                    columns={columns}
                    data={products}
                    loading={loadingTable}
                    pageCount={pageCount}
                    fetchData={fetchData}
                  />
                </TableWrapper>
              </ContentWrapper>
            </Main>
          </Wrapper>
        </>
      )}
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
  height: 44px;
  width: 44px;
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
  margin-left: 1rem;
`;

const ProductName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #000;
  margin-bottom: 2px;
`;

const ProductDescription = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #727190;
  margin: 0;
  white-space: nowrap;
  width: 300px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const TableText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #636363;
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
`;

const CartButtonIcon = styled.img`
  height: 16px;
`;

export default TestScreen2;
