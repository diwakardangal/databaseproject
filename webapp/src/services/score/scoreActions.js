import * as BT from "./scoreTypes";
import axios from 'axios';

export const saveScore = score => {
    return dispatch => {
        dispatch({
            type: BT.SAVE_SCORE_REQUEST
        });
        axios.post("http://localhost:8081/rest/scores/save_score", score)
            .then(response => {
                debugger;
                dispatch(scoreSuccess(response.data));
            })
            .catch(error => {
                dispatch(scoreFailure(error));
            });
    };
};

export const fetchScore = scoreId => {
    return dispatch => {
        dispatch({
            type: BT.FETCH_SCORE_REQUEST
        });
        axios.get("http://localhost:8081/rest/scores/"+scoreId)
            .then(response => {
                dispatch(scoreSuccess(response.data));
            })
            .catch(error => {
                dispatch(scoreFailure(error));
            });
    };
};

export const updateScore = score => {
    return dispatch => {
        dispatch({
            type: BT.UPDATE_SCORE_REQUEST
        });
        axios.put("http://localhost:8081/rest/scores/update_score", score)
            .then(response => {
                dispatch(scoreSuccess(response.data));
            })
            .catch(error => {
                dispatch(scoreFailure(error));
            });
    };
};

export const deleteScore = scoreId => {
    return dispatch => {
        dispatch({
            type: BT.DELETE_SCORE_REQUEST
        });
        axios.delete("http://localhost:8081/rest/scores/"+scoreId)
            .then(response => {
                dispatch(scoreSuccess(response.data));
            })
            .catch(error => {
                dispatch(scoreFailure(error));
            });
    };
};

const scoreSuccess = score => {
    return {
        type: BT.SCORE_SUCCESS,
        payload: score
    };
};

const scoreFailure = error => {
    return {
        type: BT.SCORE_FAILURE,
        payload: error
    };
};
