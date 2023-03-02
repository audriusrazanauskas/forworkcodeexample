import axios from "axios";
import {
  SUPPLIER_LIST_REQUEST,
  SUPPLIER_LIST_SUCCESS,
  SUPPLIER_LIST_FAIL,
  SUPPLIER_DETAILS_REQUEST,
  SUPPLIER_DETAILS_SUCCESS,
  SUPPLIER_DETAILS_FAIL,
  SUPPLIER_CREATE_REQUEST,
  SUPPLIER_CREATE_SUCCESS,
  SUPPLIER_CREATE_FAIL,
  SUPPLIER_CREATE_RESET,
  SUPPLIER_UPDATE_REQUEST,
  SUPPLIER_UPDATE_SUCCESS,
  SUPPLIER_UPDATE_FAIL,
  SUPPLIER_UPDATE_RESET,
  SUPPLIER_DELETE_REQUEST,
  SUPPLIER_DELETE_SUCCESS,
  SUPPLIER_DELETE_FAIL,
  SUPPLIER_DELETE_RESET,
} from "../constants/supplierConstants";

import { logout } from "./userActions";

export const listSuppliers =
  (keyword = "", pageNumber = "", pageSize = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: SUPPLIER_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/suppliers?keyword=${keyword}&pageNumber=${pageNumber}&pageSize=${pageSize}`
      );

      dispatch({
        type: SUPPLIER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SUPPLIER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getSupplierDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SUPPLIER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/suppliers/${id}`);

    dispatch({
      type: SUPPLIER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUPPLIER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createSupplier = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUPPLIER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/suppliers`, {}, config);

    dispatch({
      type: SUPPLIER_CREATE_SUCCESS,
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
      type: SUPPLIER_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateSupplier = (supplier) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUPPLIER_UPDATE_REQUEST,
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
      `/api/suppliers/${supplier._id}`,
      supplier,
      config
    );

    dispatch({
      type: SUPPLIER_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: SUPPLIER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: SUPPLIER_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const deleteSupplier = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUPPLIER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/suppliers/${id}`, config);

    dispatch({
      type: SUPPLIER_DELETE_SUCCESS,
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
      type: SUPPLIER_DELETE_FAIL,
      payload: message,
    });
  }
};
