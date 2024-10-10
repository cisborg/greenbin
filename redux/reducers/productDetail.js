// productDetailsReducer.js
import {
    FETCH_PRODUCTS,
    FETCH_PRODUCT_DETAILS,
    UPDATE_PRODUCT,
    REMOVE_PRODUCT,
    RESET_PRODUCT_DETAILS
} from '../actions/actionTypes';

const initialState = {
    products: [],
    productDetails: null,
};

const productDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return { ...state, products: action.payload };
        case FETCH_PRODUCT_DETAILS:
            return { ...state, productDetails: action.payload };
        case UPDATE_PRODUCT:
            return {
                ...state,
                products: state.products.map(product =>
                    product.id === action.payload.id ? action.payload : product
                ),
            };
        case REMOVE_PRODUCT:
            return { ...state, products: state.products.filter(product => product.id !== action.payload) };
        case RESET_PRODUCT_DETAILS:
            return { ...state, productDetails: null };
        default:
            return state;
    }
};

export default productDetailsReducer;
