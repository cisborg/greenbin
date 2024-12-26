// src/redux/reducers/shoppingReducer.js

import {
    CREATE_LIST_REQUEST,
    CREATE_LIST_SUCCESS,
    CREATE_LIST_FAILURE,
    FETCH_PRODUCTS_REQUEST,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE,
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    JOIN_LIST_REQUEST,
    JOIN_LIST_SUCCESS,
    JOIN_LIST_FAILURE,
    ACCEPT_NOTIFICATION_REQUEST,
    ACCEPT_NOTIFICATION_SUCCESS,
    ACCEPT_NOTIFICATION_FAILURE,
    REWARD_USER_REQUEST,
    REWARD_USER_SUCCESS,
    REWARD_USER_FAILURE,
} from '../actions/actionTypes';

const initialState = {
    lists: {}, // { listCode: { userId, products: [] } }
    users: [], // [{ id, name, listCode }]
    notifications: [], // [{ userId, listCode }]
    rewards: {}, // { userId: couponCount }
    loading: false,
    error: null,
};

const shoppingReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_LIST_REQUEST:
        case FETCH_PRODUCTS_REQUEST:
        case FETCH_USERS_REQUEST:
        case JOIN_LIST_REQUEST:
        case ACCEPT_NOTIFICATION_REQUEST:
        case REWARD_USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case CREATE_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                lists: {
                    ...state.lists,
                    [action.payload.listCode]: {
                        userId: action.payload.userId,
                        products: [],
                    },
                },
            };

        case FETCH_PRODUCTS_SUCCESS:
            const { listCode, products } = action.payload;
            return {
                ...state,
                loading: false,
                lists: {
                    ...state.lists,
                    [listCode]: {
                        ...state.lists[listCode],
                        products,
                    },
                },
            };

        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
            };

        case JOIN_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                notifications: [
                    ...state.notifications,
                    { userId: action.payload.userId, listCode: action.payload.listCode },
                ],
            };

        case ACCEPT_NOTIFICATION_SUCCESS:
            return {
                ...state,
                loading: false,
                notifications: state.notifications.filter(
                    notification => notification.userId !== action.payload.userId
                ),
            };

        case REWARD_USER_SUCCESS:
            const rewardedUserId = action.payload.userId;
            return {
                ...state,
                loading: false,
                rewards: {
                    ...state.rewards,
                    [rewardedUserId]: (state.rewards[rewardedUserId] || 0) + 2,
                },
            };

        case CREATE_LIST_FAILURE:
        case FETCH_PRODUCTS_FAILURE:
        case FETCH_USERS_FAILURE:
        case JOIN_LIST_FAILURE:
        case ACCEPT_NOTIFICATION_FAILURE:
        case REWARD_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default shoppingReducer;
