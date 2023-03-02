import React from "react";
import styled from "styled-components";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import { useState } from "react";
import { Container } from "react-bootstrap";
import { AnimatePresence } from "framer-motion";

// general imports
import { Header } from "./components/Header";
import Footer from "./components/Footer";
import SideMenu, { menuItems } from "./components/SideMenu";
import Sidebar from "./components/Sidebar";
import Sidebar2 from "./components/Sidebar2";

// admin screens imports
import ProductsAdmin from "./screens/admin/ProductsAdmin";
import CategoriesAdmin from "./screens/admin/CategoriesAdmin";
import SuppliersAdmin from "./screens/admin/SuppliersAdmin";

// screens imports

import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
/* import SuppliesScreen from "./screens/SuppliesScreen"; */
import Cart from "./components/Cart";
import SupplierEditScreen from "./screens/SupplierEditScreen";
import SupplierListScreen from "./screens/SupplierListScreen";
import SupplierScreen from "./screens/SupplierScreen";
import TestScreen from "./screens/TestScreen";
import TestScreen2 from "./screens/TestScreen2";
import TestScreen3 from "./screens/TestScreen3";
import UpdateProductSupplierById from "./components/UpdateProductSupplierById";
import UpdateProductSupplierPriceModal from "./components/UpdateProductSupplierPriceModal";
import Home from "./screens/Home";
import Documents from "./screens/Documents";
import Supplies from "./screens/Supplies";
import SuppliesCategory from "./screens/SuppliesCategory";
import Endodontija from "./screens/Endodontija";

const Dashboard = () => <h1>Dashboard</h1>;
const Content = () => <h1>Content</h1>;
const Courses = () => <h1>Content/Courses</h1>;
const Videos = () => <h1>Content/Videos</h1>;
const Design = () => <h1>Design</h1>;
const Content2 = () => <h1>Content2</h1>;
const Courses2 = () => <h1>Content/Courses 2</h1>;
const Videos2 = () => <h1>Content/Videos 2</h1>;
const Design2 = () => <h1>Design 2</h1>;

const App = () => {
  const [inactive, setInactive] = useState(false);

  return (
    /*  <Router>
      <Header />
      <Sidebar />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/cart/:id?" element={<CartScreen />} />
            <Route path="/admin/userlist" element={<UserListScreen />} />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
            <Route path="/admin/productlist" element={<ProductListScreen />} />
            <Route path="/admin/orderlist" element={<OrderListScreen />} />
            <Route path="/search/:keyword" element={<HomeScreen />} />
            <Route
              path="/admin/product/:id/edit"
              element={<ProductEditScreen />}
            />
            <Route path="/" element={<HomeScreen />}  />
            <Route path="*" element={<p>Path not resolved</p>} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router> */

    <Router>
      {/*   
        {menuItems.map((menu, index) => (
          <Routes>
            <Route
              key={menu.name}
         
              path={menu.to}
              element={<h1>{menu.name}</h1>}
            ></Route>
            {menu.subMenus && menu.subMenus.length > 0
              ? menu.subMenus.map((subMenu, i) => (
                  <Route
                    key={subMenu.name}
                    path={subMenu.to}
                    element={<h1>{subMenu.name}</h1>}
                  ></Route>
                ))
              : null}
          </Routes>
        ))} */}
      {/* <SideMenu
        onCollapse={(inactive) => {
          console.log(inactive);
          setInactive(inactive);
        }}
      /> */}
      <Wrapper>
        <Sidebar />

        <InnerWrapper>
          <Header />
          <Main className={`${inactive ? "inactive" : ""}`}>
            <AnimatePresence exitBeforeEnter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/documents" element={<Documents />} />
                <Route path={"/login"} element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route
                  path={"/supplies"}
                  element={<Supplies title="All Products" />}
                />
                <Route
                  path={"/supplies/category/:id"}
                  element={<SuppliesCategory title="Plombavimas" />}
                />
                <Route
                  path={"/supplies/endodontija"}
                  element={
                    <Endodontija
                      title="Endodontija"
                      categoryId="63e2a164fecf0e39e1cb25e5"
                    />
                  }
                />
                <Route path="/shipping" element={<ShippingScreen />} />
                <Route path="/payment" element={<PaymentScreen />} />
                <Route path="/order/:id" element={<OrderScreen />} />
                <Route path="/placeorder" element={<PlaceOrderScreen />} />
                <Route path="/product/:id" element={<ProductScreen />} />
                <Route path="/supplier/:id" element={<SupplierScreen />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/cart/:id?" element={<CartScreen />} />
                {/* Admin Routes */}
                <Route path="/admin/products" element={<ProductsAdmin />} />
                <Route
                  path="/admin/products/:category"
                  element={
                    <ProductsAdmin categoryId="63d41f9dc7187f92fab604e0" />
                  }
                />
                <Route
                  path="/admin/product/:id/delete"
                  element={<ProductsAdmin />}
                />
                <Route
                  path="/admin/products/:pageNumber"
                  element={<ProductsAdmin />}
                />
                <Route path="/admin/categories" element={<CategoriesAdmin />} />
                <Route path="/admin/suppliers" element={<SuppliersAdmin />} />
                <Route path="/admin/userlist" element={<UserListScreen />} />
                <Route
                  path="/admin/user/:id/edit"
                  element={<UserEditScreen />}
                />
                <Route path="/admin/orderlist" element={<OrderListScreen />} />

                <Route path="/test" element={<TestScreen />} />
                <Route path="/test/:pageNumber" element={<TestScreen />} />
                <Route path="/test2" element={<TestScreen2 />} />
                <Route path="/test2/:pageNumber" element={<TestScreen2 />} />
                <Route path="/test3" element={<TestScreen3 />} />
                <Route path="/test3/:pageNumber" element={<TestScreen3 />} />
                <Route path="/search/:keyword" element={<Home />} />
                <Route
                  path="/admin/product/:id/edit"
                  element={<ProductEditScreen />}
                />
                <Route
                  path="/admin/product/:id/suppliers/:supplierId"
                  element={<UpdateProductSupplierPriceModal />}
                />
                <Route
                  path="/admin/supplier/:id/edit"
                  element={<SupplierEditScreen />}
                />
              </Routes>
            </AnimatePresence>
          </Main>
        </InnerWrapper>
      </Wrapper>

      {/*   <Sidebar2 /> */}
    </Router>
  );
};
const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Main = styled.div`
  transition: margin-left 0.2s ease-in;
  padding: 80px 0 0;
  box-sizing: border-box;
  min-height: 100vh;
  background: #f8f8f8;
  width: 100%;
`;

export default App;
