import * as BT from "./subjectTypes";

const initialState = {
    subject: '', error: ''
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case BT.SAVE_SUBJECT_REQUEST:
        case BT.FETCH_SUBJECT_REQUEST:
        case BT.UPDATE_SUBJECT_REQUEST:
        case BT.DELETE_SUBJECT_REQUEST:     
            return {
                ...state
            };
        case BT.SUBJECT_SUCCESS:
            return {
                subject: action.payload,
                error: ''
            };
        case BT.SUBJECT_FAILURE:
            return {
                subject: '',
                error: action.payload
            };
        default: return state;
    }
};

export default reducer;