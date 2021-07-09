import * as BT from "./gradeTypes";

const initialState = {
    grade: '', error: ''
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case BT.SAVE_GRADE_REQUEST:
        case BT.FETCH_GRADE_REQUEST:
        case BT.UPDATE_GRADE_REQUEST:
        case BT.DELETE_GRADE_REQUEST:      
            return {
                ...state
            };
        case BT.GRADE_SUCCESS:
            return {
                grade: action.payload,
                error: ''
            };
        case BT.GRADE_FAILURE:
            return {
                grade: '',
                error: action.payload
            };
        
        default: return state;
    }
};

export default reducer;