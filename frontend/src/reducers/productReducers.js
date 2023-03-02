import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_ADD_SUPPLIER_REQUEST,
  PRODUCT_ADD_SUPPLIER_SUCCESS,
  PRODUCT_ADD_SUPPLIER_FAIL,
  PRODUCT_ADD_SUPPLIER_RESET,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_UPDATE_SUPPLIER_REQUEST,
  PRODUCT_UPDATE_SUPPLIER_SUCCESS,
  PRODUCT_UPDATE_SUPPLIER_FAIL,
  PRODUCT_UPDATE_SUPPLIER_RESET,
  PRODUCT_SUPPLIERS_LIST_REQUEST,
  PRODUCT_SUPPLIERS_LIST_SUCCESS,
  PRODUCT_SUPPLIERS_LIST_FAIL,
  PRODUCT_SUPPLIERS_LIST_RESET,
  PRODUCT_SUPPLIER_DELETE_REQUEST,
  PRODUCT_SUPPLIER_DELETE_SUCCESS,
  PRODUCT_SUPPLIER_DELETE_FAIL,
  PRODUCT_SUPPLIER_DELETE_RESET,
  PRODUCT_LIST_BY_CATEGORY_REQUEST,
  PRODUCT_LIST_BY_CATEGORY_SUCCESS,
  PRODUCT_LIST_BY_CATEGORY_FAIL,
} from "../constants/productConstants";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productListByCategoryReducer = (
  state = { products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_BY_CATEGORY_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_BY_CATEGORY_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case PRODUCT_LIST_BY_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const productSupplierAddReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_ADD_SUPPLIER_REQUEST:
      return { loading: true };
    case PRODUCT_ADD_SUPPLIER_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_ADD_SUPPLIER_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_ADD_SUPPLIER_RESET:
      return {};
    default:
      return state;
  }
};

export const productSupplierUpdateReducer = (
  state = {
    supplier: {},
  },
  action
) => {
  switch (action.type) {
    case PRODUCT_UPDATE_SUPPLIER_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUPPLIER_SUCCESS:
      return { loading: false, success: true, supplier: action.payload };
    case PRODUCT_UPDATE_SUPPLIER_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_SUPPLIER_RESET:
      return {
        supplier: {},
      };
    default:
      return state;
  }
};

export const productTopRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_TOP_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_TOP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productSuppliersListReducer = (
  state = { suppliers: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_SUPPLIERS_LIST_REQUEST:
      return { loading: true, suppliers: [] };
    case PRODUCT_SUPPLIERS_LIST_SUCCESS:
      return { loading: false, suppliers: action.payload };
    case PRODUCT_SUPPLIERS_LIST_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_SUPPLIERS_LIST_RESET:
      return { suppliers: [] };
    default:
      return state;
  }
};

export const productSupplierDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_SUPPLIER_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_SUPPLIER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_SUPPLIER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_SUPPLIER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
