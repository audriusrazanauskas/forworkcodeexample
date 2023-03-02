import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_ADD_SUPPLIER_REQUEST,
  PRODUCT_ADD_SUPPLIER_SUCCESS,
  PRODUCT_ADD_SUPPLIER_FAIL,
  PRODUCT_ADD_SUPPLIER_RESET,
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
import { logout } from "./userActions";

export const listProducts =
  (
    keyword = "",
    pageNumber = "",
    pageSize = "",
    manufacturer = "",
    category = ""
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}&pageSize=${pageSize}&manufacturer=${manufacturer}&category=${category}`
      );

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listProductsByCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_BY_CATEGORY_REQUEST });

    const { data } = await axios.get(`/api/products/category/${id}`);

    dispatch({
      type: PRODUCT_LIST_BY_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_BY_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}/delete`, config);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products`, {}, config);

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`/api/products/${productId}/reviews`, review, config);

      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload: message,
      });
    }
  };

export const addProductSupplier =
  (productId, supplier) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_ADD_SUPPLIER_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        `/api/products/${productId}/suppliers`,
        supplier,
        config
      );

      dispatch({
        type: PRODUCT_ADD_SUPPLIER_SUCCESS,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_ADD_SUPPLIER_FAIL,
        payload: message,
      });
    }
  };

export const updateProductSupplier =
  (productId, supplier) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_UPDATE_SUPPLIER_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(`/api/products/${productId}/suppliers`, supplier, config);

      dispatch({
        type: PRODUCT_UPDATE_SUPPLIER_SUCCESS,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_UPDATE_SUPPLIER_FAIL,
        payload: message,
      });
    }
  };

export const updateProductSupplierById =
  (productId, supplierId, supplier) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_UPDATE_SUPPLIER_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(
        `/api/products/${productId}/suppliers/${supplierId}`,
        supplier,
        config
      );

      dispatch({
        type: PRODUCT_UPDATE_SUPPLIER_SUCCESS,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_UPDATE_SUPPLIER_FAIL,
        payload: message,
      });
    }
  };

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST });

    const { data } = await axios.get(`/api/products/top`);

    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
/* 
export const listProductsByCategory = (category) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_BY_CATEGORY_REQUEST });

    const { data } = await axios.get(`/api/products/category/${category}`);

    dispatch({
      type: PRODUCT_LIST_BY_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_BY_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductsBySubCategory = (subCategory) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_BY_SUBCATEGORY_REQUEST });

    const { data } = await axios.get(`/api/products/subcategory/${subCategory}`);

    dispatch({
      type: PRODUCT_LIST_BY_SUBCATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_BY_SUBCATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const listProductsBySubCategoryAndCategory = (subCategory, category) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_BY_SUBCATEGORY_AND_CATEGORY_REQUEST });

    const { data } = await axios.get(`/api/products/subcategory/${subCategory}/category/${category}`);

    dispatch({
      type: PRODUCT_LIST_BY_SUBCATEGORY_AND_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_BY_SUBCATEGORY_AND_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

 */

export const listProductSuppliers =
  (productId) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_SUPPLIERS_LIST_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/products/${productId}/suppliers`,
        config
      );

      dispatch({
        type: PRODUCT_SUPPLIERS_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_SUPPLIERS_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//product can have multiple suppliers with different prices and ids
// i want to write a code that can delete a supplier by choosing his id from product suppliers list
// change the axios.delete ${supplierId} to work without hard coding the id to the url
export const deleteProductSupplier =
  (productId, supplierId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_SUPPLIER_DELETE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.delete(
        `/api/products/${productId}/suppliers/${supplierId}`,
        config
      );

      dispatch({ type: PRODUCT_SUPPLIER_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_SUPPLIER_DELETE_FAIL,
        payload: message,
      });
    }
  };
