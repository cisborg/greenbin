// goodsReducer.js
import {
    FETCH_GOODS,
    ADD_GOOD,
    REMOVE_GOOD,
    UPDATE_GOOD,
    ADD_TO_CART,
    ADD_QUANTITY,
    DECREASE_QUANTITY
} from '../actions/actionTypes';

const initialState = {
    goods: [],
    cart: [],
};

const goodsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_GOODS:
            return { ...state, goods: action.payload };
        case ADD_GOOD:
            return { ...state, goods: [...state.goods, action.payload] };
        case REMOVE_GOOD:
            return { ...state, goods: state.goods.filter(good => good.id !== action.payload) };
        case UPDATE_GOOD:
            return {
                ...state,
                goods: state.goods.map(good => 
                    good.id === action.payload.id ? action.payload : good
                ),
            };
        case ADD_TO_CART:
            return { ...state, cart: [...state.cart, action.payload] };
        case ADD_QUANTITY:
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
                ),
            };
        case DECREASE_QUANTITY:
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload && item.quantity > 1 
                    ? { ...item, quantity: item.quantity - 1 } 
                    : item
                ),
            };
        default:
            return state;
    }
};

export default goodsReducer;
