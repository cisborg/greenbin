// actions/wasteActions.js
import { 
    FETCH_WASTE_REQUEST, 
    FETCH_WASTE_SUCCESS, 
    FETCH_WASTE_FAILURE 
} from './actionTypes';
import api from "../../utils/axiosConfig";

export const submitWasteCollection = (data) => async (dispatch) => {
    dispatch({ type: FETCH_WASTE_REQUEST });
    try {
        const response = await api.post("/survey/create", data);

        if (response.data.status === "success") {
            dispatch({ 
                type: FETCH_WASTE_SUCCESS, 
                payload: { 
                    wasteCollected: response.data.data.wasteCollected,
                    squad: response.data.data.squad,
                    uploadedForm: response.data.data.uploadedForm // Assuming the response contains the uploaded form data
                } 
            });
        }

        return response.data;
    } catch (error) {
        dispatch({
            type: FETCH_WASTE_FAILURE,
            payload: error.response?.data?.message || error.message,
        });

        throw new Error(error.response?.data?.message || "Failed to submit waste collection");
    }
};
