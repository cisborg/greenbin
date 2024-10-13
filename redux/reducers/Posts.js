// src/redux/reducers/postReducer.js
import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  SHARE_POST_REQUEST,
  SHARE_POST_SUCCESS,
  SHARE_POST_FAILURE,
  GET_ALL_POSTS_REQUEST,
  GET_ALL_POSTS_SUCCESS,
  GET_ALL_POSTS_FAILURE,
  GET_POST_BY_ID_REQUEST,
  GET_POST_BY_ID_SUCCESS,
  GET_POST_BY_ID_FAILURE,
  VIEW_SHARED_POST_REQUEST,
  VIEW_SHARED_POST_SUCCESS,
  VIEW_SHARED_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  GET_ALL_COMMENTS_REQUEST,
  GET_ALL_COMMENTS_SUCCESS,
  GET_ALL_COMMENTS_FAILURE,
  SAVE_POST_REQUEST,
  SAVE_POST_SUCCESS,
  SAVE_POST_FAILURE,
  UNSAVE_POST_REQUEST,
  UNSAVE_POST_SUCCESS,
  UNSAVE_POST_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
      case CREATE_POST_REQUEST:
      case DELETE_POST_REQUEST:
      case SHARE_POST_REQUEST:
      case GET_ALL_POSTS_REQUEST:
      case GET_POST_BY_ID_REQUEST:
      case VIEW_SHARED_POST_REQUEST:
      case UPDATE_POST_REQUEST:
      case LIKE_POST_REQUEST:
      case UNLIKE_POST_REQUEST:
      case POST_COMMENT_REQUEST:
      case DELETE_COMMENT_REQUEST:
      case GET_ALL_COMMENTS_REQUEST:
      case SAVE_POST_REQUEST:
      case UNSAVE_POST_REQUEST:
          return {
              ...state,
              loading: true,
              error: null,
          };

      case CREATE_POST_SUCCESS:
          return {
              ...state,
              loading: false,
              posts: [...state.posts, action.payload],
          };

      case DELETE_POST_SUCCESS:
          return {
              ...state,
              loading: false,
              posts: state.posts.filter(post => post.id !== action.payload),
          };

      case SHARE_POST_SUCCESS:
      case UPDATE_POST_SUCCESS:
      case LIKE_POST_SUCCESS:
      case UNLIKE_POST_SUCCESS:
      case POST_COMMENT_SUCCESS:
      case DELETE_COMMENT_SUCCESS:
      case SAVE_POST_SUCCESS:
      case UNSAVE_POST_SUCCESS:
          return {
              ...state,
              loading: false,
              posts: state.posts.map(post =>
                  post.id === action.payload.id ? action.payload : post
              ),
          };

      case GET_ALL_POSTS_SUCCESS:
          return {
              ...state,
              loading: false,
              posts: action.payload,
          };

      case GET_POST_BY_ID_SUCCESS:
      case VIEW_SHARED_POST_SUCCESS:
          return {
              ...state,
              loading: false,
              posts: [...state.posts, action.payload],
          };

      case GET_ALL_COMMENTS_SUCCESS:
          return {
              ...state,
              loading: false,
              comments: action.payload,
          };

      case CREATE_POST_FAILURE:
      case DELETE_POST_FAILURE:
      case SHARE_POST_FAILURE:
      case GET_ALL_POSTS_FAILURE:
      case GET_POST_BY_ID_FAILURE:
      case VIEW_SHARED_POST_FAILURE:
      case UPDATE_POST_FAILURE:
      case LIKE_POST_FAILURE:
      case UNLIKE_POST_FAILURE:
      case POST_COMMENT_FAILURE:
      case DELETE_COMMENT_FAILURE:
      case GET_ALL_COMMENTS_FAILURE:
      case SAVE_POST_FAILURE:
      case UNSAVE_POST_FAILURE:
          return {
              ...state,
              loading: false,
              error: action.payload,
          };

      default:
          return state;
  }
};

export default postReducer;
