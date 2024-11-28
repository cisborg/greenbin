import {
 FETCH_NOTIFICATIONS_REQUEST, 
 FETCH_NOTIFICATIONS_SUCCESS ,
 FETCH_NOTIFICATIONS_FAILURE ,
 MARK_AS_READ,
 DELETE_NOTIFICATION, 
} from '../actions/notifications';


// Initial state
const initialState = {
  notifications: [
    {
      id: '1',
      type: '',
      content: '',
      time: '5 min ago',
      images: [],
      isRead: false,
      additionalDetails: {
        squadId: '',
        userId: '',
      },
    },
  ],
  loading: false,
  error: null,
};

// Reducer
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        notifications: action.payload,
      };

    case FETCH_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case MARK_AS_READ:
        return {
            ...state,
            notifications: state.notifications.map((notif) =>
            notif.id === action.payload.id
                ? { ...notif, isRead: true }
                : notif
            ),
        };

    case DELETE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter((notif) => notif.id !== action.payload.id),
      };

    default:
      return state;
  }
};

export default notificationReducer;
