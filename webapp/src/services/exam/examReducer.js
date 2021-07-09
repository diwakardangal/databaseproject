import * as BT from "./examTypes";

const initialState = {
    exam: '', error: ''
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case BT.SAVE_EXAM_REQUEST:
        case BT.FETCH_EXAM_REQUEST:
        case BT.UPDATE_EXAM_REQUEST:
        case BT.DELETE_EXAM_REQUEST:      
            return {
                ...state
            };
        case BT.EXAM_SUCCESS:
            return {
                exam: action.payload,
                error: ''
            };
        case BT.EXAM_FAILURE:
            return {
                exam: '',
                error: action.payload
            };
        
        default: return state;
    }
};

export default reducer;