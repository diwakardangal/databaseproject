import * as BT from "./gradeTypes";
import axios from 'axios';

export const saveGrade = grade => {
    debugger;
    return dispatch => {
        dispatch({
            type: BT.SAVE_GRADE_REQUEST
        });
        axios.post("http://localhost:8081/rest/class", grade)
            .then(response => {
                dispatch(gradeSuccess(response.data));
            })
            .catch(error => {
                dispatch(gradeFailure(error));
            });
    };
};

export const fetchGrade = gradeId => {
    return dispatch => {
        dispatch({
            type: BT.FETCH_GRADE_REQUEST
        });
        axios.get("http://localhost:8081/rest/class/"+gradeId)
            .then(response => {
                dispatch(gradeSuccess(response.data));
            })
            .catch(error => {
                dispatch(gradeFailure(error));
            });
    };
};

export const updateGrade = grade => {
    return dispatch => {
        dispatch({
            type: BT.UPDATE_GRADE_REQUEST
        });
        axios.put("http://localhost:8081/rest/class", grade)
            .then(response => {
                dispatch(gradeSuccess(response.data));
            })
            .catch(error => {
                dispatch(gradeFailure(error));
            });
    };
};

export const deleteGrade = gradeId => {
    return dispatch => {
        dispatch({
            type: BT.DELETE_GRADE_REQUEST
        });
        axios.delete("http://localhost:8081/rest/class/"+gradeId)
            .then(response => {
                dispatch(gradeSuccess(response.data));
            })
            .catch(error => {
                dispatch(gradeFailure(error));
            });
    };
};

const gradeSuccess = grade => {
    return {
        type: BT.GRADE_SUCCESS,
        payload: grade
    };
};

const gradeFailure = error => {
    return {
        type: BT.GRADE_FAILURE,
        payload: error
    };
};
