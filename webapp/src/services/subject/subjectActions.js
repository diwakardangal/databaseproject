import * as BT from "./subjectTypes";
import axios from 'axios';

export const saveSubject = subject => {
    return dispatch => {
        dispatch({
            type: BT.SAVE_SUBJECT_REQUEST
        });
        axios.post("http://localhost:8081/rest/subjects/save_subject", subject)
            .then(response => {
                debugger;
                dispatch(subjectSuccess(response.data));
            })
            .catch(error => {
                dispatch(subjectFailure(error));
            });
    };
};

export const fetchSubject = subjectId => {
    return dispatch => {
        dispatch({
            type: BT.FETCH_SUBJECT_REQUEST
        });
        axios.get("http://localhost:8081/rest/subjects/"+subjectId)
            .then(response => {
                dispatch(subjectSuccess(response.data));
            })
            .catch(error => {
                dispatch(subjectFailure(error));
            });
    };
};

export const updateSubject = subject => {
    return dispatch => {
        dispatch({
            type: BT.UPDATE_SUBJECT_REQUEST
        });
        axios.put("http://localhost:8081/rest/subjects/update_subject", subject)
            .then(response => {
                dispatch(subjectSuccess(response.data));
            })
            .catch(error => {
                dispatch(subjectFailure(error));
            });
    };
};

export const deleteSubject = subjectId => {
    return dispatch => {
        dispatch({
            type: BT.DELETE_SUBJECT_REQUEST
        });
        axios.delete("http://localhost:8081/rest/subjects/"+subjectId)
            .then(response => {
                dispatch(subjectSuccess(response.data));
            })
            .catch(error => {
                dispatch(subjectFailure(error));
            });
    };
};

const subjectSuccess = subject => {
    return {
        type: BT.SUBJECT_SUCCESS,
        payload: subject
    };
};

const subjectFailure = error => {
    return {
        type: BT.SUBJECT_FAILURE,
        payload: error
    };
};
