import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { listProductsByCategory } from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import TableContainer from "../components/TableContainer";
import { DefaultButton } from "../components/buttons/DefaultButton";
import { Breadcrumbs } from "../components/misc/Breadcrumbs";
import { Pagination } from "../components/table/Pagination";
import { TableSearch } from "../components/inputs/TableSearch";
import { icons } from "../utils/icons";
import MotionHoc from "../components/motion/MotionHoc";
/* import TestComponent from "../components/TestComponent"; */
import { addToCart, removeFromCart } from "../actions/cartActions";

const SuppliesCategory = ({ title }) => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [searchTitle, setSearchTitle] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const pageSizes = [4, 10, 25, 100];

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productListByCategory = useSelector(
    (state) => state.productListByCategory
  );

  const { loading, error, products, pages } = productListByCategory;

  // dispatch all products in useffect by category id

  useEffect(() => {
    dispatch(listProductsByCategory(id));
  }, [dispatch, id]);

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

          return <TableText>{contents}</TableText>;
        },
      },

      {
        Header: "Manufacturer",
        disableSortBy: false,
        accessor: (row) => {
          const { manufacturer } = row;

          return (
            <TableCell>
              <TableText>{manufacturer}</TableText>
            </TableCell>
          );
        },
      },
      {
        Header: "Supplier",
        disableSortBy: false,
        accessor: (row) => {
          const { suppliers } = row;

          console.log("suppliers", suppliers);

          if (suppliers.length > 1) {
            return (
              <TableCell>
                <TableText>multiple</TableText>
              </TableCell>
            );
          } else if (suppliers.length === 1) {
            return (
              <TableCell>
                <TableText>{suppliers[0].name}</TableText>
              </TableCell>
            );
          } else {
            return (
              <TableCell>
                <TableText>none</TableText>
              </TableCell>
            );
          }
        },
      },
      /*  {
        Header: "Lowest Supplier Price",
        disableSortBy: false,
        accessor: (row) => {
          const { suppliers } = row;

          if (suppliers.length > 1) {
            const lowestPrice = suppliers.reduce((prev, current) =>
              prev.price < current.price ? prev : current
            );

            return (
              <TableCell>
                <TableText>{lowestPrice.price}</TableText>
              </TableCell>
            );
          } else if (suppliers.length === 1) {
            return (
              <TableCell>
                <TableText>{suppliers[0].price}</TableText>
              </TableCell>
            );
          } else {
            return (
              <TableCell>
                <TableText>none</TableText>
              </TableCell>
            );
          }
        },
      }, */
      /*   {
        Header: "Price",
        disableSortBy: false,
        accessor: (row) => {
          const { price } = row;

          return <TableText>{price}</TableText>;
        },
      }, */
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

  const gotoPage = (page) => {
    setPage(page);
  };

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
            <Breadcrumbs label1="Admin" label2="Products" />
          </InnerHeaderLeft>
          <InnerHeaderRight>aa</InnerHeaderRight>
        </InnerHeader>

        <Main>
          <InnerWrapper>
            <Top>
              <TopLeft>
                <TitleWrapper>
                  <Title>{title}</Title>
                </TitleWrapper>
                aa
              </TopLeft>
              <TopRight>
                <Filters>aa</Filters>
              </TopRight>
            </Top>

            <ContentWrapper>
              <TableWrapper>
                <TableContainer
                  columns={columns}
                  data={products}
                  loading={loading}
                  error={error}
                />
                {/*       <Pagination
                  page={page}
                  pages={pages}
                  nextPage={nextPage}
                  previousPage={previousPage}
                  gotoPage={gotoPage}
                  handlePageSizeChange={handlePageSizeChange}
                  pageSize={pageSize}
                  pageSizes={pageSizes}
                /> */}
              </TableWrapper>
            </ContentWrapper>
          </InnerWrapper>
        </Main>
      </Wrapper>
    </>
  );
};
const TableButtonIcon = styled.img`
  height: 18px;
`;
const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  background: #f8f8f8;
`;

const Main = styled.div`
  width: 100%;
  padding: 0rem 2rem 6rem;
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
const Filter = styled.div`
  display: flex;
  align-items: center;
  p {
    font-size: 12px;
  }
`;
const FilterSelect = styled.select`
  background: #fff;
  border: 1px solid #eef0f4;
  border-radius: 200px;
  width: 100%;
  padding: 0rem 1.5rem;
  margin-left: 1rem;
  font-size: 16px;
  color: #727190;
  font-weight: 500;
  -webkit-letter-spacing: 0px;
  -moz-letter-spacing: 0px;
  -ms-letter-spacing: 0px;
  letter-spacing: 0px;
  text-transform: none;
  cursor: pointer;
  height: 48px;
  option {
    font-size: 12px;
    color: #727190;
    font-weight: 500;
    letter-spacing: 0px;
    text-transform: none;
    cursor: pointer;
  }
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

const ProductNameWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ProductImageWrapper = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 8px;
  overflow: hidden;
  background: #f2f6ff;
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
  color: #91a5b6;
  margin: 0;
  letter-spacing: 0px;
  white-space: nowrap;
  width: 250px;
  text-overflow: ellipsis;
  overflow: hidden;
  letter-spacing: 0.1px;
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
  color: #727190;
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

export default SuppliesCategory;
