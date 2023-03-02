import React, { useEffect } from "react";
import styled from "styled-components";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Row, Col, ListGroup, Form, Button, Card } from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

const Cart = ({}) => {
  const productId = useParams().id;

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const qty = searchParams.get("qty") ? Number(searchParams.get("qty")) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <>
      <Wrapper>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <>
            <Header>
              Prekės:
              <span>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
            </Header>
            <InnerWrapper>
              <Items>
                {cartItems.map((item) => (
                  <Item key={item.product}>
                    <Left>
                      <ImageWrapper>
                        <Image src={item.image} />
                      </ImageWrapper>
                      <ItemInfo>
                        <Link to={`/product/${item.product}`}>
                          <ItemName>{item.name}</ItemName>
                        </Link>

                        <ItemPrice>
                          ${item.price}$ x {item.qty}
                        </ItemPrice>
                      </ItemInfo>
                    </Left>
                    <Right>
                      <Quantity>
                        <span>Qty</span>
                        <Form.Control
                          as="select"
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Quantity>
                      <ItemTotalPrice>
                        ${item.qty * item.price.toFixed(2)}
                      </ItemTotalPrice>
                    </Right>
                    <DeleteButton
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </DeleteButton>
                  </Item>
                ))}
              </Items>

              <TotalWrapper>
                <Total>
                  Total
                  <span>
                    ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)
                  </span>
                </Total>
                <TotalPrice>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </TotalPrice>
              </TotalWrapper>

              <ButtonWrapper>
                <Left></Left>

                <Right>
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </Button>
                </Right>
              </ButtonWrapper>
            </InnerWrapper>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default Cart;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const Header = styled.div`
  width: 100%;
  font-size: 1rem;
  font-weight: 600;
  color: #2a364e;
  display: flex;
  align-items: baseline;
  line-height: 1;
  padding: 0.5rem 0;

  span {
    font-size: 14px;
    font-weight: 500;
    color: #757980;
    margin-left: 10px;
    line-height: 1;
  }
`;

const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Items = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  max-height: calc(100% - 15rem);
  overflow-y: auto;
`;
const DeleteButton = styled.div`
  background: #ececec;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  .fas {
    font-size: 10px;
  }
`;

const Item = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ececec;
  padding: 1rem 0;
  justify-content: space-between;
  position: relative;
  &:hover {
    ${DeleteButton} {
      opacity: 1;
    }
  }
`;

const ImageWrapper = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-shrink: 0;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 14px;
  text-align: left;
  width: 100%;
  max-width: 300px;
  padding-right: 1rem;
`;
const ItemName = styled.h6`
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.2;
  margin: 0;
  padding: 0;
  color: #2a364e;
  text-transform: capitalize;
  letter-spacing: 0px;
  text-decoration: none;
  &:hover {
    cursor: pointer;
    color: blue;
  }
`;
const ItemPrice = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #8d8d8d;
  margin: 5px 0 0;
  padding: 0;
  letter-spacing: 0px;
  width: 100px;
  line-height: 1;
`;
const ItemTotalPrice = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #2a364e;
  margin: 0;
  padding: 0;
  letter-spacing: 0px;
  padding: 0 0 0 1rem;
`;
const Left = styled.div`
  display: flex;
  align-items: center;
`;
const Right = styled.div`
  display: flex;
  align-items: center;
`;
const Quantity = styled.div`
  display: flex;
  align-items: center;
  span {
    font-size: 12px;
    color: #797979;
    margin-right: 10px;
    font-weight: 500;
  }
  .form-control {
    width: 83px;
    height: 40px;
    background: #f8f8f8;
    border-radius: 23px;
    text-align: center;
    line-height: 1;
    color: #2a364e;
    font-size: 1rem;
    font-weight: 500;
  }
`;
const TotalWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 2.5rem 0;
  border-bottom: 1px solid #ececec;
`;
const Total = styled.span`
  font-size: 24px;
  font-weight: 500;
  line-height: 1;
  margin: 0;
  padding: 0;
  color: #2a364e;
  span {
    font-size: 16px;
    font-weight: 500;
    color: #757980;
    margin-left: 10px;
    line-height: 1;
  }
`;
const TotalPrice = styled.span`
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
  margin: 0;
  padding: 0;
  color: #2a364e;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.5rem 0;
`;
