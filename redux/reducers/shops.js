// src/redux/reducers/shopReducer.js
import {
    CREATE_SHOP_REQUEST,
    CREATE_SHOP_SUCCESS,
    CREATE_SHOP_FAILURE,
    UPDATE_SHOP_REQUEST,
    UPDATE_SHOP_SUCCESS,
    UPDATE_SHOP_FAILURE,
    DELETE_SHOP_REQUEST,
    DELETE_SHOP_SUCCESS,
    DELETE_SHOP_FAILURE,
    GET_NEARBY_SHOPS_REQUEST,
    GET_NEARBY_SHOPS_SUCCESS,
    GET_NEARBY_SHOPS_FAILURE,
    GET_SHOP_BY_ID_REQUEST,
    GET_SHOP_BY_ID_SUCCESS,
    GET_SHOP_BY_ID_FAILURE,
} from '../actions/actionTypes';

const initialState = {
    shops: [],
    shopDetails: {
        id: null,
        name: '',
        address: '',
        contact: '',
        description: '',
        coverImage: null,
        profileLogo: null,
        vendors: [],
        rating: 0,
        openHours: '',
        closeHours: '',
        location: null,
        distance: '',
        
    },
    loading: false,
    error: null,
};

const shopReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_SHOP_REQUEST:
        case UPDATE_SHOP_REQUEST:
        case DELETE_SHOP_REQUEST:
        case GET_NEARBY_SHOPS_REQUEST:
        case GET_SHOP_BY_ID_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case CREATE_SHOP_SUCCESS:
            return {
                ...state,
                loading: false,
                shops: [...state.shops, action.payload],
            };

        case UPDATE_SHOP_SUCCESS:
            return {
                ...state,
                loading: false,
                shops: state.shops.map(shop => shop.id === action.payload.id ? action.payload : shop),
            };

        case DELETE_SHOP_SUCCESS:
            return {
                ...state,
                loading: false,
                shops: state.shops.filter(shop => shop.id !== action.payload),
            };

        case GET_NEARBY_SHOPS_SUCCESS:
            return {
                ...state,
                loading: false,
                shops: action.payload,
            };

        case GET_SHOP_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                shopDetails: action.payload,
            };

        // Grouped failure cases
        case CREATE_SHOP_FAILURE:
        case UPDATE_SHOP_FAILURE:
        case DELETE_SHOP_FAILURE:
        case GET_NEARBY_SHOPS_FAILURE:
        case GET_SHOP_BY_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state; // Always include a default case
    }
};

export default shopReducer;