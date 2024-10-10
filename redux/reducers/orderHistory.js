// orderHistoryReducer.js
import {
    CREATE_ORDER,
    FETCH_ORDER,
    DELETE_ORDER,
    UPDATE_ORDER
} from '../actions/actionTypes';

const initialState = {
    orders: [],
};

const orderHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER:
            return { ...state, orders: [...state.orders, action.payload] };
        case FETCH_ORDER:
            return { ...state, orders: state.orders.map(order => 
                order.id === action.payload.id ? action.payload : order
            )};
        case DELETE_ORDER:
            return { ...state, orders: state.orders.filter(order => order.id !== action.payload) };
        case UPDATE_ORDER:
            return {
                ...state,
                orders: state.orders.map(order =>
                    order.id === action.payload.id ? action.payload : order
                ),
            };
        default:
            return state;
    }
};

export default orderHistoryReducer;
