import { MESSAGE_ADDED, MESSAGE_FETCHED, LOGIN, CONNECTION_SET, LOGOUT, USER_JOINED, USER_LEFT, SET_CONNECTED_USERS } from './types';

export const getAllMessages = (messages) => dispatch => {
    dispatch({
        type: MESSAGE_FETCHED,
        payload: messages
    })
}

export const getNewMessage = (message) => dispatch => {
    dispatch({
        type: MESSAGE_ADDED,
        payload: message,
    })
}

export const setConnection = (connection) => dispatch => {
    dispatch({
        type: CONNECTION_SET,
        payload: connection
    })
}

export const login = (username) => dispatch => {
    dispatch({
        type: LOGIN,
        payload: username
    })    
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })    
}

export const userJoined = (username) => dispatch => {
    dispatch({
        type: USER_JOINED,
        payload: username
    });
}

export const userLeft = (username) => dispatch => {
    dispatch({
        type: USER_LEFT,
        payload: username
    })
}

export const setConnectedUsers = (usernames) => dispatch => {
    dispatch({
        type: SET_CONNECTED_USERS,
        payload: usernames
    })
}

