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
  POST_COMMENT_REQUEST,
  POST_COMMENT_SUCCESS,
  POST_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  GET_ALL_COMMENTS_REQUEST,
  GET_ALL_COMMENTS_SUCCESS,
  GET_ALL_COMMENTS_FAILURE,
  BOOKMARK_POST_REQUEST,
  BOOKMARK_POST_SUCCESS,
  BOOKMARK_POST_FAILURE,
  FETCH_TAGS_REQUEST,
  FETCH_TAGS_SUCCESS,
  FETCH_TAGS_FAILURE,
  FETCH_TRENDING_TAGS_REQUEST,
  FETCH_TRENDING_TAGS_SUCCESS,
  FETCH_TRENDING_TAGS_FAILURE,
  FETCH_POPULAR_TAGS_REQUEST,
  FETCH_POPULAR_TAGS_SUCCESS,
  FETCH_POPULAR_TAGS_FAILURE,

} from '../actions/actionTypes';

const initialState = {
  posts: [
    {
        id: null,
        title: '',
        content: '',
        squad: '',
        author: '',
        createdAt: Date.now(),
        images: [],
        likes: 0,
        comments: [],
        isSaved: false,
        tags: [],
        connections: 0,
      },
  ],

  loading: false,
  trendingTags: [],
  popularTags: [],
  error: null,
  notifications: [],
  page: 1
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
      case FETCH_TAGS_REQUEST:
      case POST_COMMENT_REQUEST:
      case DELETE_COMMENT_REQUEST:
      case GET_ALL_COMMENTS_REQUEST:
      case BOOKMARK_POST_REQUEST:
      case FETCH_TRENDING_TAGS_REQUEST:
      case FETCH_POPULAR_TAGS_REQUEST:
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
      case FETCH_TRENDING_TAGS_SUCCESS:
          return { ...state, 
            trendingTags: action.payload.trendingTags,
            loading: false, 
            error: null };
      case FETCH_POPULAR_TAGS_SUCCESS:
        return { ...state, popularTags: action.payload.popularTags, loading: false, error: null };
      case DELETE_POST_SUCCESS:
          return {
              ...state,
              loading: false,
              posts: state.posts.filter(post => post.id !== action.payload),
          };
      case FETCH_TAGS_SUCCESS:
        return { ...state, tags: action.payload.tags, loading: false, error: null };
      case SHARE_POST_SUCCESS:
      case UPDATE_POST_SUCCESS:
      case POST_COMMENT_SUCCESS:
        const { postId, updatedPost } = action.payload;

            return {
                ...state,
                loading: false,
                posts: state.posts.map((post) =>
                    post.id === postId ? { ...post, ...updatedPost } : post
                ),
            };

      case DELETE_COMMENT_SUCCESS:
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
              posts: [...state.posts, ...action.payload],
              page: state.page +1
          };
      case LIKE_POST_SUCCESS:
        return {
            ...state,
            posts: state.posts.map(post =>
                post.id === action.payload
                    ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
                    : post
            ),
        };
      case BOOKMARK_POST_SUCCESS:
        return {
            ...state,
            posts: state.posts.map(post =>
                post.id === action.payload
                    ? { ...post, isBookmarked: !post.isBookmarked }
                    : post
            ),
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
      case POST_COMMENT_FAILURE:
      case DELETE_COMMENT_FAILURE:
      case FETCH_TAGS_FAILURE:
      case GET_ALL_COMMENTS_FAILURE:
      case FETCH_POPULAR_TAGS_FAILURE:
      case FETCH_TRENDING_TAGS_FAILURE:
      case BOOKMARK_POST_FAILURE:
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
