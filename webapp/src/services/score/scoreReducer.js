import * as BT from "./scoreTypes";

const initialState = {
    score: '', error: ''
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case BT.SAVE_SCORE_REQUEST:
        case BT.FETCH_SCORE_REQUEST:
        case BT.UPDATE_SCORE_REQUEST:
        case BT.DELETE_SCORE_REQUEST:     
            return {
                ...state
            };
        case BT.SCORE_SUCCESS:
            return {
                score: action.payload,
                error: ''
            };
        case BT.SCORE_FAILURE:
            return {
                score: '',
                error: action.payload
            };
        default: return state;
    }
};

export default reducer;