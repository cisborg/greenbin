// src/redux/reducers/productReducer.js
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  FETCH_PRODUCT_BY_ID_REQUEST,
  FETCH_PRODUCT_BY_ID_SUCCESS,
  FETCH_PRODUCT_BY_ID_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  PURCHASE_PRODUCT_REQUEST,
  PURCHASE_PRODUCT_SUCCESS,
  PURCHASE_PRODUCT_FAILURE,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SUBSCRIBE_PRODUCT_REQUEST,
  SUBSCRIBE_PRODUCT_SUCCESS,
  SUBSCRIBE_PRODUCT_FAILURE,
  CANCEL_SUBSCRIPTION_REQUEST,
  CANCEL_SUBSCRIPTION_SUCCESS,
  CANCEL_SUBSCRIPTION_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  products: [],
  activeProduct: null,
  loading: false,
  error: null,
  cart: [],
  subscriptions: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
    case CREATE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
    case DELETE_PRODUCT_REQUEST:
    case PURCHASE_PRODUCT_REQUEST:
    case SUBSCRIBE_PRODUCT_REQUEST:
    case CANCEL_SUBSCRIPTION_REQUEST:
    case FETCH_PRODUCT_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_PRODUCTS_SUCCESS:
      console.log("=>FETCH_PRODUCTS_SUCCESS dispatch received");
      return {
        ...state,
        loading: false,
        products: action.payload["data"],
      };

    case FETCH_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        activeProduct: action.payload,
      };

    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload],
      };

    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };

    case PURCHASE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== action.payload),
      };

    case SUBSCRIBE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        subscriptions: [...state.subscriptions, action.payload],
      };

    case CANCEL_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        subscriptions: state.subscriptions.filter(
          (sub) => sub.productId !== action.payload
        ),
      };

    case FETCH_PRODUCTS_FAILURE:
    case CREATE_PRODUCT_FAILURE:
    case UPDATE_PRODUCT_FAILURE:
    case DELETE_PRODUCT_FAILURE:
    case PURCHASE_PRODUCT_FAILURE:
    case SUBSCRIBE_PRODUCT_FAILURE:
    case FETCH_PRODUCT_BY_ID_FAILURE:
    case CANCEL_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default productReducer;
