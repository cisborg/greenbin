// USER logics

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_SUCCESS='LOGIN_SUCCESS';
export const LOGIN_FAILURE='LOGIN_FAILURE';

export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';
export const SEND_RESET_PASSWORD = 'SEND_RESET_PASSWORD';
export const GET_ALL_USERS = 'GET_ALL_USERS';
export const CONNECTION_REQUEST = 'CONNECTION_REQUEST';
export const GET_REFERRAL_CODE = 'GET_REFERRAL_CODE';
export const DELETE_USER = 'DELETE_USER';
export const SEND_POINTS = 'SEND_POINTS';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';

// SQUADS EXPO 
export const CREATE_SQUAD_REQUEST = 'CREATE_SQUAD_REQUEST';
export const CREATE_SQUAD_SUCCESS = 'CREATE_SQUAD_SUCCESS';
export const CREATE_SQUAD_FAILURE = 'CREATE_SQUAD_FAILURE';
export const JOIN_SQUAD_REQUEST = 'REQUEST_JOIN';
export const  REQUEST_JOIN_SQUAD_SUCCESS = 'JOIN_SUCCESS';
export const  REQUEST_JOIN_SQUAD_FAILURE = 'JOIN_FAILURE';
export const APPROVE_JOIN_REQUEST_REQUEST = 'APPROVE_JOIN_REQUEST';
export const APPROVE_JOIN_REQUEST_SUCCESS = 'APPROVE_JOIN_REQUEST_SUCCESS';
export const APPROVE_JOIN_REQUEST_FAILURE = 'APPROVE_JOIN_REQUEST_FAILURE';
export const REMOVE_MEMBER_REQUEST = 'REMOVE_MEMBER_REQUEST';
export const REMOVE_MEMBER_SUCCESS = 'REMOVE_MEMBER_SUCCESS';
export const REMOVE_MEMBER_FAILURE = 'REMOVE_MEMBER_FAILURE';
export const ADD_MEMBER_SUCCESS = 'ADD_MEMBER_SUCCESS';
export const ADD_MEMBER_FAILURE = 'ADD_MEMBER_FAILURE';
export const LEAVE_SQUAD_REQUEST = 'LEAVE_SQUAD_REQUEST';
export const LEAVE_SQUAD_SUCCESS = 'LEAVE_SQUAD_SUCCESS';
export const LEAVE_SQUAD_FAILURE = 'LEAVE_SQUAD_FAILURE';
export const DELETE_SQUAD_REQUEST = 'DELETE_SQUAD_REQUEST';
export const DELETE_SQUAD_SUCCESS = 'DELETE_SQUAD_SUCCESS';
export const DELETE_SQUAD_FAILURE = 'DELETE_SQUAD_FAILURE';
export const GET_ALL_SQUADS_REQUEST = 'GET_ALL_SQUADS_REQUEST';
export const GET_ALL_SQUADS_SUCCESS = 'GET_ALL_SQUADS_SUCCESS';
export const GET_ALL_SQUADS_FAILURE = 'GET_ALL_SQUADS_FAILURE';
export const UPDATE_SQUAD_REQUEST = 'UPDATE_SQUAD_REQUEST';
export const UPDATE_SQUAD_SUCCESS = 'UPDATE_SQUAD_SUCCESS';
export const UPDATE_SQUAD_FAILURE = 'UPDATE_SQUAD_FAILURE';

// POSTS

// src/redux/actions/actionTypes.js
export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';

export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

export const SHARE_POST_REQUEST = 'SHARE_POST_REQUEST';
export const SHARE_POST_SUCCESS = 'SHARE_POST_SUCCESS';
export const SHARE_POST_FAILURE = 'SHARE_POST_FAILURE';

export const GET_ALL_POSTS_REQUEST = 'GET_ALL_POSTS_REQUEST';
export const GET_ALL_POSTS_SUCCESS = 'GET_ALL_POSTS_SUCCESS';
export const GET_ALL_POSTS_FAILURE = 'GET_ALL_POSTS_FAILURE';

export const GET_POST_BY_ID_REQUEST = 'GET_POST_BY_ID_REQUEST';
export const GET_POST_BY_ID_SUCCESS = 'GET_POST_BY_ID_SUCCESS';
export const GET_POST_BY_ID_FAILURE = 'GET_POST_BY_ID_FAILURE';

export const VIEW_SHARED_POST_REQUEST = 'VIEW_SHARED_POST_REQUEST';
export const VIEW_SHARED_POST_SUCCESS = 'VIEW_SHARED_POST_SUCCESS';
export const VIEW_SHARED_POST_FAILURE = 'VIEW_SHARED_POST_FAILURE';

export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = 'UPDATE_POST_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const POST_COMMENT_REQUEST = 'POST_COMMENT_REQUEST';
export const POST_COMMENT_SUCCESS = 'POST_COMMENT_SUCCESS';
export const POST_COMMENT_FAILURE = 'POST_COMMENT_FAILURE';

export const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE';

export const GET_ALL_COMMENTS_REQUEST = 'GET_ALL_COMMENTS_REQUEST';
export const GET_ALL_COMMENTS_SUCCESS = 'GET_ALL_COMMENTS_SUCCESS';
export const GET_ALL_COMMENTS_FAILURE = 'GET_ALL_COMMENTS_FAILURE';

export const SAVE_POST_REQUEST = 'SAVE_POST_REQUEST';
export const SAVE_POST_SUCCESS = 'SAVE_POST_SUCCESS';
export const SAVE_POST_FAILURE = 'SAVE_POST_FAILURE';

export const UNSAVE_POST_REQUEST = 'UNSAVE_POST_REQUEST';
export const UNSAVE_POST_SUCCESS = 'UNSAVE_POST_SUCCESS';
export const UNSAVE_POST_FAILURE = 'UNSAVE_POST_FAILURE';

// LEADERBOARDS

export const FETCH_SQUAD_LEADERBOARD_REQUEST = 'FETCH_SQUAD_LEADERBOARD_REQUEST';
export const FETCH_SQUAD_LEADERBOARD_SUCCESS = 'FETCH_SQUAD_LEADERBOARD_SUCCESS';
export const FETCH_SQUAD_LEADERBOARD_FAILURE = 'FETCH_SQUAD_LEADERBOARD_FAILURE';

export const FETCH_USER_LEADERBOARD_REQUEST = 'FETCH_USER_LEADERBOARD_REQUEST';
export const FETCH_USER_LEADERBOARD_SUCCESS = 'FETCH_USER_LEADERBOARD_SUCCESS';
export const FETCH_USER_LEADERBOARD_FAILURE = 'FETCH_USER_LEADERBOARD_FAILURE';

export const UPDATE_LEADERBOARD_REQUEST = 'UPDATE_LEADERBOARD_REQUEST';
export const UPDATE_LEADERBOARD_SUCCESS = 'UPDATE_LEADERBOARD_SUCCESS';
export const UPDATE_LEADERBOARD_FAILURE = 'UPDATE_LEADERBOARD_FAILURE';

// src/redux/actions/actionTypes.js
export const FETCH_ADMINS_REQUEST = 'FETCH_ADMINS_REQUEST';
export const FETCH_ADMINS_SUCCESS = 'FETCH_ADMINS_SUCCESS';
export const FETCH_ADMINS_FAILURE = 'FETCH_ADMINS_FAILURE';

export const ADD_ADMIN_REQUEST = 'ADD_ADMIN_REQUEST';
export const ADD_ADMIN_SUCCESS = 'ADD_ADMIN_SUCCESS';
export const ADD_ADMIN_FAILURE = 'ADD_ADMIN_FAILURE';

export const DELETE_ADMIN_REQUEST = 'DELETE_ADMIN_REQUEST';
export const DELETE_ADMIN_SUCCESS = 'DELETE_ADMIN_SUCCESS';
export const DELETE_ADMIN_FAILURE = 'DELETE_ADMIN_FAILURE';

export const UPDATE_ADMIN_CREDENTIALS_REQUEST = 'UPDATE_ADMIN_CREDENTIALS_REQUEST';
export const UPDATE_ADMIN_CREDENTIALS_SUCCESS = 'UPDATE_ADMIN_CREDENTIALS_SUCCESS';
export const UPDATE_ADMIN_CREDENTIALS_FAILURE = 'UPDATE_ADMIN_CREDENTIALS_FAILURE';

export const UPDATE_ADMIN_PASSWORD_REQUEST = 'UPDATE_ADMIN_PASSWORD_REQUEST';
export const UPDATE_ADMIN_PASSWORD_SUCCESS = 'UPDATE_ADMIN_PASSWORD_SUCCESS';
export const UPDATE_ADMIN_PASSWORD_FAILURE = 'UPDATE_ADMIN_PASSWORD_FAILURE';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';


export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE';

export const UPDATE_PRODUCT_REQUEST = 'UPDATE_PRODUCT_REQUEST';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_FAILURE = 'UPDATE_PRODUCT_FAILURE';

export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';

export const PURCHASE_PRODUCT_REQUEST = 'PURCHASE_PRODUCT_REQUEST';
export const PURCHASE_PRODUCT_SUCCESS = 'PURCHASE_PRODUCT_SUCCESS';
export const PURCHASE_PRODUCT_FAILURE = 'PURCHASE_PRODUCT_FAILURE';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const SUBSCRIBE_PRODUCT_REQUEST = 'SUBSCRIBE_PRODUCT_REQUEST';
export const SUBSCRIBE_PRODUCT_SUCCESS = 'SUBSCRIBE_PRODUCT_SUCCESS';
export const SUBSCRIBE_PRODUCT_FAILURE = 'SUBSCRIBE_PRODUCT_FAILURE';

export const CANCEL_SUBSCRIPTION_REQUEST = 'CANCEL_SUBSCRIPTION_REQUEST';
export const CANCEL_SUBSCRIPTION_SUCCESS = 'CANCEL_SUBSCRIPTION_SUCCESS';
export const CANCEL_SUBSCRIPTION_FAILURE = 'CANCEL_SUBSCRIPTION_FAILURE';


// CHATS 
export const FETCH_CHATS_REQUEST = 'FETCH_CHATS_REQUEST';
export const FETCH_CHATS_SUCCESS = 'FETCH_CHATS_SUCCESS';
export const FETCH_CHATS_FAILURE = 'FETCH_CHATS_FAILURE';

export const SEND_CHAT_REQUEST = 'SEND_CHAT_REQUEST';
export const SEND_CHAT_SUCCESS = 'SEND_CHAT_SUCCESS';
export const SEND_CHAT_FAILURE = 'SEND_CHAT_FAILURE';

export const DELETE_CHAT_REQUEST = 'DELETE_CHAT_REQUEST';
export const DELETE_CHAT_SUCCESS = 'DELETE_CHAT_SUCCESS';
export const DELETE_CHAT_FAILURE = 'DELETE_CHAT_FAILURE';

export const UPDATE_CHAT_STATUS_REQUEST = 'UPDATE_CHAT_STATUS_REQUEST';
export const UPDATE_CHAT_STATUS_SUCCESS = 'UPDATE_CHAT_STATUS_SUCCESS';
export const UPDATE_CHAT_STATUS_FAILURE = 'UPDATE_CHAT_STATUS_FAILURE';

// PAYMENTS

// src/redux/actions/actionTypes.js
export const DEPOSIT_REQUEST = 'DEPOSIT_REQUEST';
export const DEPOSIT_SUCCESS = 'DEPOSIT_SUCCESS';
export const DEPOSIT_FAILURE = 'DEPOSIT_FAILURE';

export const WITHDRAW_REQUEST = 'WITHDRAW_REQUEST';
export const WITHDRAW_SUCCESS = 'WITHDRAW_SUCCESS';
export const WITHDRAW_FAILURE = 'WITHDRAW_FAILURE';

//  SHOPS

// src/redux/actions/actionTypes.js
export const CREATE_SHOP_REQUEST = 'CREATE_SHOP_REQUEST';
export const CREATE_SHOP_SUCCESS = 'CREATE_SHOP_SUCCESS';
export const CREATE_SHOP_FAILURE = 'CREATE_SHOP_FAILURE';

export const UPDATE_SHOP_REQUEST = 'UPDATE_SHOP_REQUEST';
export const UPDATE_SHOP_SUCCESS = 'UPDATE_SHOP_SUCCESS';
export const UPDATE_SHOP_FAILURE = 'UPDATE_SHOP_FAILURE';

export const DELETE_SHOP_REQUEST = 'DELETE_SHOP_REQUEST';
export const DELETE_SHOP_SUCCESS = 'DELETE_SHOP_SUCCESS';
export const DELETE_SHOP_FAILURE = 'DELETE_SHOP_FAILURE';

export const GET_NEARBY_SHOPS_REQUEST = 'GET_NEARBY_SHOPS_REQUEST';
export const GET_NEARBY_SHOPS_SUCCESS = 'GET_NEARBY_SHOPS_SUCCESS';
export const GET_NEARBY_SHOPS_FAILURE = 'GET_NEARBY_SHOPS_FAILURE';

export const GET_SHOP_BY_ID_REQUEST = 'GET_SHOP_BY_ID_REQUEST';
export const GET_SHOP_BY_ID_SUCCESS = 'GET_SHOP_BY_ID_SUCCESS';
export const GET_SHOP_BY_ID_FAILURE = 'GET_SHOP_BY_ID_FAILURE';

// REPORTS
export const CREATE_REPORT_REQUEST = 'CREATE_REPORT_REQUEST';
export const CREATE_REPORT_SUCCESS = 'CREATE_REPORT_SUCCESS';
export const CREATE_REPORT_FAILURE = 'CREATE_REPORT_FAILURE';

export const GET_ALL_REPORTS_REQUEST = 'GET_ALL_REPORTS_REQUEST';
export const GET_ALL_REPORTS_SUCCESS = 'GET_ALL_REPORTS_SUCCESS';
export const GET_ALL_REPORTS_FAILURE = 'GET_ALL_REPORTS_FAILURE';

export const DELETE_REPORT_REQUEST = 'DELETE_REPORT_REQUEST';
export const DELETE_REPORT_SUCCESS = 'DELETE_REPORT_SUCCESS';
export const DELETE_REPORT_FAILURE = 'DELETE_REPORT_FAILURE';

// DONATIONS
// src/redux/actions/actionTypes.js
export const CREATE_DONATION_REQUEST = 'CREATE_DONATION_REQUEST';
export const CREATE_DONATION_SUCCESS = 'CREATE_DONATION_SUCCESS';
export const CREATE_DONATION_FAILURE = 'CREATE_DONATION_FAILURE';

export const GET_ALL_DONATIONS_REQUEST = 'GET_ALL_DONATIONS_REQUEST';
export const GET_ALL_DONATIONS_SUCCESS = 'GET_ALL_DONATIONS_SUCCESS';
export const GET_ALL_DONATIONS_FAILURE = 'GET_ALL_DONATIONS_FAILURE';

export const UPDATE_DONATION_REQUEST = 'UPDATE_DONATION_REQUEST';
export const UPDATE_DONATION_SUCCESS = 'UPDATE_DONATION_SUCCESS';
export const UPDATE_DONATION_FAILURE = 'UPDATE_DONATION_FAILURE';

export const DELETE_DONATION_REQUEST = 'DELETE_DONATION_REQUEST';
export const DELETE_DONATION_SUCCESS = 'DELETE_DONATION_SUCCESS';
export const DELETE_DONATION_FAILURE = 'DELETE_DONATION_FAILURE';
