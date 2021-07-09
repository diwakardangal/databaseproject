import * as BT from "./userTypes";
import axios from 'axios';

export const saveUser = user => {
    let role = user.role;
    user.role = null;

    return dispatch => {
        dispatch({
            type: BT.SAVE_USER_REQUEST
        });
        axios.post("http://localhost:8081/rest/user/save_user/"+role, user)
            .then(response => {
                dispatch(userSuccess(response.data));
            })
            .catch(error => {
                dispatch(userFailure(error));
            });
    };
};

export const fetchUser = userId => {
    debugger;
    return dispatch => {
        dispatch({
            type: BT.FETCH_USER_REQUEST
        });
        axios.get("http://localhost:8081/rest/user/"+userId)
            .then(response => {
                dispatch(userSuccess(response.data));
            })
            .catch(error => {
                dispatch(userFailure(error));
            });
    };
};

export const updateUser = user => {
    let role = user.role;
    user.role = null;
    debugger;
    return dispatch => {
        dispatch({
            type: BT.UPDATE_USER_REQUEST
        });
        axios.put("http://localhost:8081/rest/user/update_user/"+role, user)
            .then(response => {
                dispatch(userSuccess(response.data));
            })
            .catch(error => {
                dispatch(userFailure(error));
            });
    };
};

export const deleteUser = userId => {
    return dispatch => {
        dispatch({
            type: BT.DELETE_USER_REQUEST
        });
        axios.delete("http://localhost:8081/rest/user/"+userId)
            .then(response => {
                dispatch(userSuccess(response.data));
            })
            .catch(error => {
                dispatch(userFailure(error));
            });
    };
};

const userSuccess = user => {
    return {
        type: BT.USER_SUCCESS,
        payload: user
    };
};

const userFailure = error => {
    return {
        type: BT.USER_FAILURE,
        payload: error
    };
};

export const fetchRoles = () => {
    return dispatch => {
        dispatch({
            type: BT.FETCH_USER_ROLE
        });
        axios.get("http://localhost:8081/rest/user/roles")
            .then(response => {
                dispatch({
                    type: BT.USER_ROLE_SUCCESS,
                    payload: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: BT.USER_ROLE_FAILURE,
                    payload: error
                });
            });
    };
};

export const fetchRolesById = roleId => {
    return dispatch => {
        dispatch({
            type: BT.FETCH_USER_ROLE
        });
        axios.get("http://localhost:8081/rest/user/roles/"+roleId)
            .then(response => {
                dispatch({
                    type: BT.USER_ROLE_SUCCESS,
                    payload: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: BT.USER_ROLE_FAILURE,
                    payload: error
                });
            });
    };
};

export const deassignPupil = userId => {
    return dispatch => {
        dispatch({
            type: BT.DELETE_USER_REQUEST
        });
        axios.delete("http://localhost:8081/rest/classpupil/"+userId)
            .then(response => {
                dispatch(userSuccess(response.data));
            })
            .catch(error => {
                dispatch(userFailure(error));
            });
    };
};