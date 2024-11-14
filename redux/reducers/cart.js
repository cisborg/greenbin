// src/redux/reducers/cartReducer.js
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_ITEM_QUANTITY,
    CLEAR_CART,
} from '../actions/actionTypes';

const initialState = {
    cartItems: [],
    totalQuantity: 0,
    totalPrice: 0,
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const existingItemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
            let updatedCartItems;

            if (existingItemIndex >= 0) {
                // Update quantity if the item already exists in the cart
                const updatedItem = {
                    ...state.cartItems[existingItemIndex],
                    quantity: state.cartItems[existingItemIndex].quantity + action.payload.quantity,
                };
                updatedCartItems = [
                    ...state.cartItems.slice(0, existingItemIndex),
                    updatedItem,
                    ...state.cartItems.slice(existingItemIndex + 1),
                ];
            } else {
                // Add new item to the cart
                updatedCartItems = [...state.cartItems, { ...action.payload, quantity: action.payload.quantity }];
            }

            return {
                ...state,
                cartItems: updatedCartItems,
                totalQuantity: updatedCartItems.reduce((total, item) => total + item.quantity, 0),
                totalPrice: updatedCartItems.reduce((total, item) => total + item.price * item.quantity, 0),
            };

        case REMOVE_FROM_CART:
            const filteredCartItems = state.cartItems.filter(item => item.id !== action.payload);
            return {
                ...state,
                cartItems: filteredCartItems,
                totalQuantity: filteredCartItems.reduce((total, item) => total + item.quantity, 0),
                totalPrice: filteredCartItems.reduce((total, item) => total + item.price * item.quantity, 0),
            };

        case UPDATE_CART_ITEM_QUANTITY:
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
            if (itemIndex >= 0) {
                const updatedItemQuantity = {
                    ...state.cartItems[itemIndex],
                    quantity: action.payload.quantity,
                };
                const updatedCartItemsQuantity = [
                    ...state.cartItems.slice(0, itemIndex),
                    updatedItemQuantity,
                    ...state.cartItems.slice(itemIndex + 1),
                ];

                return {
                    ...state,
                    cartItems: updatedCartItemsQuantity,
                    totalQuantity: updatedCartItemsQuantity.reduce((total, item) => total + item.quantity, 0),
                    totalPrice: updatedCartItemsQuantity.reduce((total, item) => total + item.price * item.quantity, 0),
                };
            }
            return state;

        case CLEAR_CART:
            return initialState;

        default:
            return state;
    }
};

export default cartReducer;
