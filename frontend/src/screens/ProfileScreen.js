import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Table, Form, Button, Row, Col, Tabs, Tab } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { textBlack } from "../utils/colors";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const [image, setImage] = useState("");

  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
        setImage(user.image);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({ id: user._id, name, email, password, image })
      );
    }
  };

  return (
    <>
      <Wrapper>
        <Main>
          <Left>
            <TitleWrapper>
              <h1>Account Settings</h1>
              <p>Manage your account settings and preferences</p>
            </TitleWrapper>
            <TabsWrapper>
              <Tabs defaultActiveKey="details" id="profile-edit-tabs">
                <Tab eventKey="details" title="My Details">
                  {loading ? (
                    <Loader />
                  ) : error ? (
                    <Message variant="danger">{error}</Message>
                  ) : (
                    <>
                      <h1>My Details</h1>
                      <ContentWrapper>
                        <Form onSubmit={submitHandler}>
                          <Details>
                            <DetailsLeft>asasfasf</DetailsLeft>
                            <DetailsRight>
                              <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                  type="name"
                                  placeholder="Enter name"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                ></Form.Control>
                              </Form.Group>
                            </DetailsRight>
                          </Details>

                          <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="Enter email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                          </Form.Group>

                          <Form.Group controlId="image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter image url"
                              value={image}
                              onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>
                            <Form.Control
                              id=""
                              type="file"
                              onChange={uploadFileHandler}
                            />

                            {uploading && <Loader />}
                          </Form.Group>

                          <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              type="password"
                              placeholder="Enter password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                          </Form.Group>

                          <Form.Group controlId="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                              type="password"
                              placeholder="Confirm password"
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                            ></Form.Control>
                          </Form.Group>

                          <Button type="submit" variant="primary">
                            Update
                          </Button>
                        </Form>
                      </ContentWrapper>
                    </>
                  )}
                </Tab>
                <Tab eventKey="password" title="Password">
                  password
                </Tab>
              </Tabs>
            </TabsWrapper>
          </Left>
          <Right>aa</Right>
        </Main>
      </Wrapper>

      {/*   <Col md={9}>
          <h2>My Orders</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant="danger">{errorOrders}</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className="btn-sm" variant="light">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col> */}
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
  width: 100%;
`;

const Right = styled.div`
  display: flex;
`;

const Main = styled.div`
  width: 100%;
  padding: 2rem 2rem;
  display: flex;
  justify-content: space-between;
`;

const ContentWrapper = styled.div`
  width: 100%;
  padding: 2rem 2rem;
  border-radius: 22px;
  border: 1px solid #e6e8ec;
`;

const TitleWrapper = styled.div`
  width: 100%;
  padding: 0rem 0rem;
  border-bottom: 0px solid #e6e8ec;
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 7px;
    padding: 0;
    color: ${textBlack};
    letter-spacing: 0px;
    text-transform: capitalize;
    text-decoration: none;
  }
  p {
    letter-spacing: 0px;
    font-size: 16px;
    font-weight: 500;
    color: #7a7a7a;
    margin: 0;
  }
`;

const TabsWrapper = styled.div`
  width: 100%;
  padding: 0rem 0rem;
  border-bottom: 1px solid #e6e8ec;
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 1.5rem;
    padding: 0;
    color: ${textBlack};
    letter-spacing: 0px;
    text-transform: capitalize;
    text-decoration: none;
  }
  p {
    letter-spacing: 0px;
    font-size: 16px;
    font-weight: 500;
    color: #727190;
    margin: 0;
  }
`;

const Details = styled.div`
  width: 100%;
  display: flex;
`;

const DetailsLeft = styled.div`
  width: 50%;
`;

const DetailsRight = styled.div`
  width: 50%;
`;
export default ProfileScreen;
