import { MESSAGE_ADDED, MESSAGE_FETCHED, LOGIN, CONNECTION_SET, LOGOUT, USER_JOINED, USER_LEFT, SET_CONNECTED_USERS } from '../actions/types';

const initialState = {
    messages: [],
    user: null,
    connection: null,
    connectedUsers: []
}

export default function (state = initialState, action) {
    switch(action.type) {
        case MESSAGE_FETCHED: {
            return {
                ...state,
                messages: action.payload
            }
        }

        case  MESSAGE_ADDED: {
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        }

        case LOGIN: {
            return {
                ...state,
                user: action.payload
            }
        }

        case LOGOUT: {
            return {
                ...state,
                user: null
            }
        }

        case CONNECTION_SET: {
            return {
                ...state,
                connection: action.payload
            }
        }

        case USER_JOINED : {
            return {
                ...state,
                connectedUsers: [...state.connectedUsers, action.payload]
            }
        }

        case USER_LEFT : {
            return {
                ...state,
                connectedUsers: state.connectedUsers.filter(username => username !== action.payload)
            }
        }

        case SET_CONNECTED_USERS : {
            return {
                ...state,
                connectedUsers: state.connectedUsers.concat(action.payload)
            }
        }

        default:
            return state;
    }
}