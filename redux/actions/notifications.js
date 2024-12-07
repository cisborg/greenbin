import {
    FETCH_NOTIFICATIONS_REQUEST,
    FETCH_NOTIFICATIONS_SUCCESS,
    FETCH_NOTIFICATIONS_FAILURE,
    MARK_AS_READ,
    DELETE_NOTIFICATION,
 } from './actionTypes';

 import api from '../../utils/axiosConfig';

export const fetchNotifications = () => async (dispatch) => {
    dispatch({ type: FETCH_NOTIFICATIONS_REQUEST });
  
    try {
      const response = await api.get('/user/notifications'); // Fetch from your API
      const notifications = response.data.map(notification => ({
        id: notification.id,
        type: notification.type,
        content: notification.content,
        time: notification.time,
        images: notification.images || null,
        user: notification.user || null,
        squad: notification.squad || null,
        isRead: notification.isRead || false,
      }));
  
      dispatch({ type: FETCH_NOTIFICATIONS_SUCCESS, payload: notifications });
    } catch (error) {
      dispatch({ type: FETCH_NOTIFICATIONS_FAILURE, payload: error.message });
    }
  };

  export const deleteNotification = (notificationId) => async (dispatch) => {
    try {
      await api.delete(`/user/notifications/delete/${notificationId}`); // Replace with your API endpoint
      dispatch({ type: DELETE_NOTIFICATION, payload: notificationId });
    } catch (error) {
    }
  };

  export const markAsRead = (notificationId) => (dispatch) => {
    dispatch({
      type: MARK_AS_READ, // Dispatching the action
      payload: notificationId, // Pass notification ID to identify the one to mark as read
    });
  };
  
  