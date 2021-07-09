import {combineReducers} from 'redux';
import userReducer from './user/userReducer';
import authReducer from './user/auth/authReducer';
import gradeReducer from './grade/gradeReducer';
import subjectReducer from './subject/subjectReducer';
import examReducer from './exam/examReducer';
import scoreReducer from './score/scoreReducer';

const rootReducer = combineReducers({
    user: userReducer,
    grade: gradeReducer,
    auth: authReducer,
    subject: subjectReducer,
    exam: examReducer,
    score: scoreReducer
    
});

export default rootReducer;