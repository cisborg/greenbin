// squadReducer.js
import {
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
    squadChallenges: [],
    squadInvitations: [],
    squadMembers: [],
    squadLeaders: [],
    squadNotifications: [],
};

const squadReducer = (state = initialState, action) => {
    switch (action.type) {
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
