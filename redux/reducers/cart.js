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
    count: 0, // Count of unique items
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const existingItemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
            let updatedCartItems;
            let newCount = state.count;

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
                newCount += 1; // Increment count for new unique item
            }

            return {
                ...state,
                cartItems: updatedCartItems,
                totalQuantity: updatedCartItems.reduce((total, item) => total + item.quantity, 0),
                totalPrice: updatedCartItems.reduce((total, item) => total + item.price * item.quantity, 0),
                count: newCount, // Update count
            };

        case REMOVE_FROM_CART:
            const filteredCartItems = state.cartItems.filter(item => item.id !== action.payload);
            const removedItemIndex = state.cartItems.findIndex(item => item.id === action.payload);
            let updatedCount = state.count;

            // Decrement count if the removed item was the only one of that type
            if (removedItemIndex >= 0 && state.cartItems[removedItemIndex].quantity === 1) {
                updatedCount -= 1;
            }

            return {
                ...state,
                cartItems: filteredCartItems,
                totalQuantity: filteredCartItems.reduce((total, item) => total + item.quantity, 0),
                totalPrice: filteredCartItems.reduce((total, item) => total + item.price * item.quantity, 0),
                count: updatedCount, // Update count
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
