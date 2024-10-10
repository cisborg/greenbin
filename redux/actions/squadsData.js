// actions.js
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
    REMOVE_SQUAD_NOTIFICATION,
} from './actionTypes';
import axios from 'axios';

// Squad Challenges
export const addSquadChallenge = (challenge) => async (dispatch) => {
    const response = await axios.post('/api/squad-challenges', challenge);
    dispatch({ type: ADD_SQUAD_CHALLENGE, payload: response.data });
};

export const removeSquadChallenge = (id) => async (dispatch) => {
    await axios.delete(`/api/squad-challenges/${id}`);
    dispatch({ type: REMOVE_SQUAD_CHALLENGE, payload: id });
};

export const updateSquadChallenge = (challenge) => async (dispatch) => {
    const response = await axios.put(`/api/squad-challenges/${challenge.id}`, challenge);
    dispatch({ type: UPDATE_SQUAD_CHALLENGE, payload: response.data });
};

export const fetchSquadChallenges = () => async (dispatch) => {
    const response = await axios.get('/api/squad-challenges');
    dispatch({ type: FETCH_SQUAD_CHALLENGES, payload: response.data });
};

// Squad Invitations
export const sendSquadInvitation = (invitation) => async (dispatch) => {
    const response = await axios.post('/api/squad-invitations', invitation);
    dispatch({ type: SEND_SQUAD_INVITATION, payload: response.data });
};

export const acceptSquadInvitation = (id) => async (dispatch) => {
    const response = await axios.put(`/api/squad-invitations/${id}/accept`);
    dispatch({ type: ACCEPT_SQUAD_INVITATION, payload: response.data });
};

export const declineSquadInvitation = (id) => async (dispatch) => {
    await axios.delete(`/api/squad-invitations/${id}/decline`);
    dispatch({ type: DECLINE_SQUAD_INVITATION, payload: id });
};

export const fetchSquadInvitations = () => async (dispatch) => {
    const response = await axios.get('/api/squad-invitations');
    dispatch({ type: FETCH_SQUAD_INVITATIONS, payload: response.data });
};

// Squad Members
export const addSquadMember = (member) => async (dispatch) => {
    const response = await axios.post('/api/squad-members', member);
    dispatch({ type: ADD_SQUAD_MEMBER, payload: response.data });
};

export const removeSquadMember = (id) => async (dispatch) => {
    await axios.delete(`/api/squad-members/${id}`);
    dispatch({ type: REMOVE_SQUAD_MEMBER, payload: id });
};

export const fetchSquadMembers = () => async (dispatch) => {
    const response = await axios.get('/api/squad-members');
    dispatch({ type: FETCH_SQUAD_MEMBERS, payload: response.data });
};
export const addSquadLeader = (leader) => async (dispatch) => {
    const response = await axios.post('/api/squad-leaders', leader);
    dispatch({ type: ADD_SQUAD_LEADER, payload: response.data });
};

export const removeSquadLeader = (id) => async (dispatch) => {
    await axios.delete(`/api/squad-leaders/${id}`);
    dispatch({ type: REMOVE_SQUAD_LEADER, payload: id });
};

export const updateSquadLeader = (leader) => async (dispatch) => {
    const response = await axios.put(`/api/squad-leaders/${leader.id}`, leader);
    dispatch({ type: UPDATE_SQUAD_LEADER, payload: response.data });
};

// Squad Notifications
export const fetchSquadNotifications = () => async (dispatch) => {
    const response = await axios.get('/api/squad-notifications');
    dispatch({ type: FETCH_SQUAD_NOTIFICATIONS, payload: response.data });
};

export const removeSquadNotification = (id) => async (dispatch) => {
    await axios.delete(`/api/squad-notifications/${id}`);
    dispatch({ type: REMOVE_SQUAD_NOTIFICATION, payload: id });
};
