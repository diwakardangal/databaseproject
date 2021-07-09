import * as BT from "./examTypes";
import axios from 'axios';

export const saveExam = exam => {
    debugger;
    return dispatch => {
        dispatch({
            type: BT.SAVE_EXAM_REQUEST
        });
        axios.post("http://localhost:8081/rest/exams/save_exam", exam)
            .then(response => {
                dispatch(examSuccess(response.data));
            })
            .catch(error => {
                dispatch(examFailure(error));
            });
    };
};

export const fetchExam = examId => {
    return dispatch => {
        dispatch({
            type: BT.FETCH_EXAM_REQUEST
        });
        axios.get("http://localhost:8081/rest/exams/"+examId)
            .then(response => {
                dispatch(examSuccess(response.data));
            })
            .catch(error => {
                dispatch(examFailure(error));
            });
    };
};

export const updateExam = exam => {
    debugger;
    return dispatch => {
        dispatch({
            type: BT.UPDATE_EXAM_REQUEST
        });
        axios.put("http://localhost:8081/rest/exams/update_exam", exam)
            .then(response => {
                dispatch(examSuccess(response.data));
            })
            .catch(error => {
                dispatch(examFailure(error));
            });
    };
};

export const deleteExam = examId => {
    return dispatch => {
        dispatch({
            type: BT.DELETE_EXAM_REQUEST
        });
        axios.delete("http://localhost:8081/rest/exams/"+examId)
            .then(response => {
                dispatch(examSuccess(response.data));
            })
            .catch(error => {
                dispatch(examFailure(error));
            });
    };
};

const examSuccess = exam => {
    return {
        type: BT.EXAM_SUCCESS,
        payload: exam
    };
};

const examFailure = error => {
    return {
        type: BT.EXAM_FAILURE,
        payload: error
    };
};
