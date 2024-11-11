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
    REMOVE_SQUAD_NOTIFICATION
} from '../actions/actionTypes';

const initialState = {
    squads: [],
    loading: false,
    error: null,
    squadChallenges: [],
    squadInvitations: [],
    squadMembers: [],
    squadLeaders: [],
    squadNotifications: [],
};

const squadReducer = (state = initialState, action) => {
    switch (action.type) {
        // Squad Management
        case CREATE_SQUAD_REQUEST:
            return { ...state, loading: true, error: null };

        case CREATE_SQUAD_SUCCESS:
            return {
                ...state,
                loading: false,
                squads: [...state.squads, action.payload],
                error: null,
            };
        case CREATE_SQUAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

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

        // Squad Challenges
        case FETCH_SQUAD_CHALLENGES:
            return { ...state, squadChallenges: action.payload };
        case ADD_SQUAD_CHALLENGE:
            return { ...state, squadChallenges: [...state.squadChallenges, action.payload] };
        case REMOVE_SQUAD_CHALLENGE:
            return { ...state, squadChallenges: state.squadChallenges.filter(challenge => challenge.id !== action.payload) };
        case UPDATE_SQUAD_CHALLENGE:
            return {
                ...state,
                squadChallenges: state.squadChallenges.map(challenge =>
                    challenge.id === action.payload.id ? action.payload : challenge
                ),
            };

        // Squad Invitations
        case FETCH_SQUAD_INVITATIONS:
            return { ...state, squadInvitations: action.payload };
        case SEND_SQUAD_INVITATION:
            return { ...state, squadInvitations: [...state.squadInvitations, action.payload] };
        case ACCEPT_SQUAD_INVITATION:
            return {
                ...state,
                squadInvitations: state.squadInvitations.map(invitation =>
                    invitation.id === action.payload.id ? action.payload : invitation
                ),
            };
        case DECLINE_SQUAD_INVITATION:
            return { ...state, squadInvitations: state.squadInvitations.filter(invitation => invitation.id !== action.payload) };

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
            return { ...state, squadLeaders: state.squadLeaders.filter(leader => leader.id !== action.payload) };
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
            return { ...state, squadNotifications: state.squadNotifications.filter(notification => notification.id !== action.payload) };

        default:
            return state;
    }
};

export default squadReducer;
