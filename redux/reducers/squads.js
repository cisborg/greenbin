// src/redux/reducers/squadReducer.js
import {
    CREATE_SQUAD_REQUEST,
    CREATE_SQUAD_SUCCESS,
    CREATE_SQUAD_FAILURE,
    REQUEST_JOIN_SQUAD_REQUEST,
    REQUEST_JOIN_SQUAD_SUCCESS,
    REQUEST_JOIN_SQUAD_FAILURE,
    APPROVE_JOIN_REQUEST_REQUEST,
    APPROVE_JOIN_REQUEST_SUCCESS,
    APPROVE_JOIN_REQUEST_FAILURE,
    REMOVE_MEMBER_REQUEST,
    REMOVE_MEMBER_SUCCESS,
    REMOVE_MEMBER_FAILURE,
    ADD_MEMBER_REQUEST,
    ADD_MEMBER_SUCCESS,
    ADD_MEMBER_FAILURE,
    LEAVE_SQUAD_REQUEST,
    LEAVE_SQUAD_SUCCESS,
    LEAVE_SQUAD_FAILURE,
    DELETE_SQUAD_REQUEST,
    DELETE_SQUAD_SUCCESS,
    DELETE_SQUAD_FAILURE,
    GET_ALL_SQUADS_REQUEST,
    GET_ALL_SQUADS_SUCCESS,
    GET_ALL_SQUADS_FAILURE,
    UPDATE_SQUAD_REQUEST,
    UPDATE_SQUAD_SUCCESS,
    UPDATE_SQUAD_FAILURE,
} from '../actions/actionTypes';

const initialState = {
    squads: [],
    loading: false,
    error: null,
};

const squadReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_SQUAD_REQUEST:
        case REQUEST_JOIN_SQUAD_REQUEST:
        case APPROVE_JOIN_REQUEST_REQUEST:
        case REMOVE_MEMBER_REQUEST:
        case ADD_MEMBER_REQUEST:
        case LEAVE_SQUAD_REQUEST:
        case DELETE_SQUAD_REQUEST:
        case GET_ALL_SQUADS_REQUEST:
        case UPDATE_SQUAD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        
        case CREATE_SQUAD_SUCCESS:
            return {
                ...state,
                loading: false,
                squads: [...state.squads, action.payload],
            };

        case REQUEST_JOIN_SQUAD_SUCCESS:
        case APPROVE_JOIN_REQUEST_SUCCESS:
        case REMOVE_MEMBER_SUCCESS:
        case ADD_MEMBER_SUCCESS:
        case LEAVE_SQUAD_SUCCESS:
        case DELETE_SQUAD_SUCCESS:
        case UPDATE_SQUAD_SUCCESS:
            return {
                ...state,
                loading: false,
                squads: state.squads.map(squad => 
                    squad.id === action.payload.id ? action.payload : squad
                ),
            };

        case GET_ALL_SQUADS_SUCCESS:
            return {
                ...state,
                loading: false,
                squads: action.payload,
            };

        case CREATE_SQUAD_FAILURE:
        case REQUEST_JOIN_SQUAD_FAILURE:
        case APPROVE_JOIN_REQUEST_FAILURE:
        case REMOVE_MEMBER_FAILURE:
        case ADD_MEMBER_FAILURE:
        case LEAVE_SQUAD_FAILURE:
        case DELETE_SQUAD_FAILURE:
        case GET_ALL_SQUADS_FAILURE:
        case UPDATE_SQUAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default squadReducer;
