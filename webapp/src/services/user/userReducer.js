import {FETCH_USER_REQUEST, USER_SUCCESS, USER_FAILURE, FETCH_USER_ROLE,USER_ROLE_SUCCESS,USER_ROLE_FAILURE} from './userTypes';

const initialState = {
    users: [],
    roles:[],
    error: ''
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USER_REQUEST:
            return {
                ...state
            };
        case FETCH_USER_ROLE:
            return {
                ...state
            };
        case USER_SUCCESS:
            return {
                users: action.payload,
                error: ''
            };
        case USER_FAILURE:
            return {
                users: [],
                error: action.payload
            };
        case USER_ROLE_SUCCESS:
                return {
                roles: action.payload,
                error: ''
                };
        case USER_ROLE_FAILURE:
            return {
                roles: '',
                error: action.payload
            };
        default:
            return state;
    }
};

export default reducer;

