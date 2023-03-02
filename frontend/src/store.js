import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
  productSupplierAddReducer,
  productSuppliersListReducer,
  productSupplierUpdateReducer,
  productSupplierDeleteReducer,
  productListByCategoryReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userDeleteReducer,
  userUpdateReducer,
  userListReducer,
} from "./reducers/userReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListMyReducer,
  orderListReducer,
} from "./reducers/orderReducers";

import {
  supplierListReducer,
  supplierCreateReducer,
  supplierDeleteReducer,
  supplierDetailsReducer,
  supplierUpdateReducer,
} from "./reducers/supplierReducers";

import {
  categoryListReducer,
  categoryDetailsReducer,
  categoryCreateReducer,
  categoryUpdateReducer,
  categoryDeleteReducer,
} from "./reducers/categoryReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  productSupplierAdd: productSupplierAddReducer,
  productSuppliersList: productSuppliersListReducer,
  productSupplierUpdate: productSupplierUpdateReducer,
  productSupplierDelete: productSupplierDeleteReducer,
  productListByCategory: productListByCategoryReducer,

  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,

  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,

  supplierList: supplierListReducer,
  supplierDetails: supplierDetailsReducer,
  supplierCreate: supplierCreateReducer,
  supplierUpdate: supplierUpdateReducer,
  supplierDelete: supplierDeleteReducer,

  categoryList: categoryListReducer,
  categoryDetails: categoryDetailsReducer,
  categoryCreate: categoryCreateReducer,
  categoryUpdate: categoryUpdateReducer,
  categoryDelete: categoryDeleteReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {};

/* const productFromStorage = localStorage.getItem("product")
  ? JSON.parse(localStorage.getItem("product"))
  : {};
 */
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
  orderPay: { success: false },

  /* productDetails: { product: productFromStorage }, */
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
