// src/redux/reducers/adminReducer.js
import {
    FETCH_ADMINS_REQUEST,
    FETCH_ADMINS_SUCCESS,
    FETCH_ADMINS_FAILURE,
    ADD_ADMIN_REQUEST,
    ADD_ADMIN_SUCCESS,
    ADD_ADMIN_FAILURE,
    DELETE_ADMIN_REQUEST,
    DELETE_ADMIN_SUCCESS,
    DELETE_ADMIN_FAILURE,
    UPDATE_ADMIN_CREDENTIALS_REQUEST,
    UPDATE_ADMIN_CREDENTIALS_SUCCESS,
    UPDATE_ADMIN_CREDENTIALS_FAILURE,
    UPDATE_ADMIN_PASSWORD_REQUEST,
    UPDATE_ADMIN_PASSWORD_SUCCESS,
    UPDATE_ADMIN_PASSWORD_FAILURE,
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    DELETE_SQUAD_REQUEST,
    DELETE_SQUAD_SUCCESS,
    DELETE_SQUAD_FAILURE,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
} from '../actions/actionTypes';

const initialState = {
    admins: [],
    users: [],
    products: [],
    squads: [],
    loading: false,
    error: null,
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ADMINS_REQUEST:
        case ADD_ADMIN_REQUEST:
        case DELETE_ADMIN_REQUEST:
        case UPDATE_ADMIN_CREDENTIALS_REQUEST:
        case UPDATE_ADMIN_PASSWORD_REQUEST:
        case FETCH_USERS_REQUEST:
        case DELETE_SQUAD_REQUEST:
        case DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FETCH_ADMINS_SUCCESS:
            return {
                ...state,
                loading: false,
                admins: action.payload,
            };

        case ADD_ADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
                admins: [...state.admins, action.payload],
            };

        case DELETE_ADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
                admins: state.admins.filter(admin => admin.id !== action.payload),
            };

        case UPDATE_ADMIN_CREDENTIALS_SUCCESS:
        case UPDATE_ADMIN_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
            };

        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
            };

        case DELETE_SQUAD_SUCCESS:
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
            };

        case FETCH_ADMINS_FAILURE:
        case ADD_ADMIN_FAILURE:
        case DELETE_ADMIN_FAILURE:
        case UPDATE_ADMIN_CREDENTIALS_FAILURE:
        case UPDATE_ADMIN_PASSWORD_FAILURE:
        case FETCH_USERS_FAILURE:
        case DELETE_SQUAD_FAILURE:
        case DELETE_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default adminReducer;
