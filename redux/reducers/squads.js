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
    FETCH_SQUAD_DATA_REQUEST,
    FETCH_SQUAD_DATA_SUCCESS,
    FETCH_SQUAD_DATA_FAILURE,
    UPDATE_SQUAD_REQUEST,
    UPDATE_SQUAD_SUCCESS,
    UPDATE_SQUAD_FAILURE,
    ADD_SQUAD_CHALLENGE,
    REMOVE_SQUAD_CHALLENGE,
    UPDATE_SQUAD_CHALLENGE,
    FETCH_SQUAD_CHALLENGES,
    SEND_SQUAD_INVITATION,
    ACCEPT_SQUAD_INVITATION,
    DECLINE_SQUAD_INVITATION,
    FETCH_SQUAD_INVITATIONS,
    ADD_SQUAD_MEMBER,
    REMOVE_SQUAD_MEMBER,
    FETCH_SQUAD_MEMBERS,
    ADD_SQUAD_LEADER,
    REMOVE_SQUAD_LEADER,
    UPDATE_SQUAD_LEADER,
    FETCH_SQUAD_NOTIFICATIONS,
    REMOVE_SQUAD_NOTIFICATION,
    SUBMIT_ACTIVE_REQUEST,
    SUBMIT_ACTIVE_SUCCESS,
    SUBMIT_ACTIVE_FAILURE,
} from '../actions/actionTypes';

const initialState = {
    squads: [],
    loading: false,
    activeSquad: null,
    selectedSquad: null,
    squadChallenges: [],
    squadInvitations: [],
    squadMembers: [],
    squadLeaders: [],
    squadNotifications: [],
    error: null,
};

const squadReducer = (state = initialState, action) => {
    switch (action.type) {
        // Common request actions
        case CREATE_SQUAD_REQUEST:
        case SUBMIT_ACTIVE_REQUEST:
        case REQUEST_JOIN_SQUAD_REQUEST:
        case APPROVE_JOIN_REQUEST_REQUEST:
        case REMOVE_MEMBER_REQUEST:
        case ADD_MEMBER_REQUEST:
        case LEAVE_SQUAD_REQUEST:
        case DELETE_SQUAD_REQUEST:
        case GET_ALL_SQUADS_REQUEST:
        case FETCH_SQUAD_DATA_REQUEST:
        case UPDATE_SQUAD_REQUEST:
            return { ...state, loading: true, error: null };

        // Success actions
        case CREATE_SQUAD_SUCCESS:
            return {
                ...state,
                loading: false,
                squads: [...state.squads, action.payload],
            };

        case SUBMIT_ACTIVE_SUCCESS:
            return {
                ...state,
                loading: false,
                activeSquad: action.payload,
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
            return { ...state, loading: false, squads: action.payload || [] };

        // Failure actions
        case CREATE_SQUAD_FAILURE:
        case SUBMIT_ACTIVE_FAILURE:
        case REQUEST_JOIN_SQUAD_FAILURE:
        case APPROVE_JOIN_REQUEST_FAILURE:
        case REMOVE_MEMBER_FAILURE:
        case ADD_MEMBER_FAILURE:
        case LEAVE_SQUAD_FAILURE:
        case DELETE_SQUAD_FAILURE:
        case GET_ALL_SQUADS_FAILURE:
        case UPDATE_SQUAD_FAILURE:
            return { ...state, loading: false, error: action.payload };

        // Squad Challenges
        case FETCH_SQUAD_CHALLENGES:
            return { ...state, squadChallenges: action.payload };

        case ADD_SQUAD_CHALLENGE:
            return { ...state, squadChallenges: [...state.squadChallenges, action.payload] };

        case REMOVE_SQUAD_CHALLENGE:
            return {
                ...state,
                squadChallenges: state.squadChallenges.filter(challenge => challenge.id !== action.payload),
            };

        case UPDATE_SQUAD_CHALLENGE:
            return {
                ...state,
                squadChallenges: state.squadChallenges.map(challenge =>
                    challenge.id === action.payload.id ? action.payload : challenge
                ),
            };

        case FETCH_SQUAD_DATA_SUCCESS:
            return { ...state, loading: false, selectedSquad: action.payload };

        // Squad Invitations
        case FETCH_SQUAD_INVITATIONS:
            return { ...state, squadInvitations: action.payload };

        case SEND_SQUAD_INVITATION:
            return { ...state, squadInvitations: [...state.squadInvitations, action.payload] };

        case ACCEPT_SQUAD_INVITATION:
        case DECLINE_SQUAD_INVITATION:
            return {
                ...state,
                squadInvitations: state.squadInvitations.filter(invitation => invitation.id !== action.payload),
            };

        // Squad Members
        case FETCH_SQUAD_MEMBERS:
            return { ...state, squadMembers: action.payload };

        case ADD_SQUAD_MEMBER:
            return { ...state, squadMembers: [...state.squadMembers, action.payload] };

        case REMOVE_SQUAD_MEMBER:
            return { ...state, squadMembers: state.squadMembers.filter(member => member.id !== action.payload) };

        // Squad Leaders
        case ADD_SQUAD_LEADER:
            return { ...state, squadLeaders: [...state.squadLeaders, action.payload] };

        case REMOVE_SQUAD_LEADER:
            return {
                ...state,
                squadLeaders: state.squadLeaders.filter(leader => leader.id !== action.payload),
            };

        case UPDATE_SQUAD_LEADER:
            return {
                ...state,
                squadLeaders: state.squadLeaders.map(leader =>
                    leader.id === action.payload.id ? action.payload : leader
                ),
            };

        // Squad Notifications
        case FETCH_SQUAD_NOTIFICATIONS:
            return { ...state, squadNotifications: action.payload };

        case REMOVE_SQUAD_NOTIFICATION:
            return {
                ...state,
                squadNotifications: state.squadNotifications.filter(notification => notification.id !== action.payload),
            };
        
        case FETCH_SQUAD_DATA_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default squadReducer;
