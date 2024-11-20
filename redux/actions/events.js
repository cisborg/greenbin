import {
    CREATE_SQUAD_ACTIVITY,
    DELETE_SQUAD_ACTIVITY,
    UPDATE_SQUAD_ACTIVITY,
    FETCH_SQUAD_ACTIVITIES,
    SQUAD_ACTIVITY_LOADING,
    SQUAD_ACTIVITY_ERROR,
} from './actionTypes';
import api from "../../utils/axiosConfig";

// Add Squad Activity
export const createSquadActivity = (activityDetails) => async (dispatch) => {
    dispatch({ type: SQUAD_ACTIVITY_LOADING });
    try {
        const formData = new FormData();
        formData.append("name", activityDetails.name);
        formData.append("date", activityDetails.date);
        formData.append("location", activityDetails.location);

        // Handle image upload
        if (activityDetails.image) {
            formData.append("image", {
                uri: Platform.OS === "android" ? activityDetails.image : activityDetails.image.replace("file://", ""),
                type: "image/jpeg", // Adjust type based on your backend
                name: "activity_image.jpg",
            });
        }

        const response = await api.post('/squad/activity/create', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        dispatch({
            type: CREATE_SQUAD_ACTIVITY,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: SQUAD_ACTIVITY_ERROR,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Remove Squad Activity
export const removeSquadActivity = (id) => async (dispatch) => {
    try {
        dispatch({ type: SQUAD_ACTIVITY_LOADING });
        
        await api.delete(`/api/squad-activities/${id}`);
        dispatch({ type: DELETE_SQUAD_ACTIVITY, payload: id });
    } catch (error) {
        dispatch({ type: SQUAD_ACTIVITY_ERROR, payload: error.message });
    }
};

// Update Squad Activity
export const updateSquadActivity = (activity) => async (dispatch) => {
    try {
        dispatch({ type: SQUAD_ACTIVITY_LOADING });

        const formData = new FormData();
        formData.append("name", activity.name);
        formData.append("date", activity.date);
        formData.append("location", activity.location);

        // Append image if it exists and is updated
        if (activity.image) {
            formData.append("image", {
                uri: activity.image,
                type: "image/jpeg",
                name: "updated_squad_activity_image.jpg"
            });
        }

        const response = await api.put(`/api/squad-activities/${activity.id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        dispatch({ type: UPDATE_SQUAD_ACTIVITY, payload: response.data });
    } catch (error) {
        dispatch({ type: SQUAD_ACTIVITY_ERROR, payload: error.message });
    }
};

// Fetch Squad Activities
export const fetchSquadActivities = () => async (dispatch) => {
    try {
        dispatch({ type: SQUAD_ACTIVITY_LOADING });
        
        const response = await api.get('/api/squad-activities');
        dispatch({ type: FETCH_SQUAD_ACTIVITIES, payload: response.data });
    } catch (error) {
        dispatch({ type: SQUAD_ACTIVITY_ERROR, payload: error.message });
    }
};
