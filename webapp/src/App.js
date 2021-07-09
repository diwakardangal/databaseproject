import React from 'react';
import './App.css';

import {Container, Row, Col} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import Welcome from './components/Welcome';
import UserList from './components/User/UserList';

import Profile from './components/User/Profile';

import User from './components/User/User';
import Login from './components/User/Login';
import Footer from './components/Footer';
import Grade from './components/Grade/Grade';
import GradeList from './components/Grade/GradeList';
import GradePupil from './components/Grade/GradePupil';
import AssignPupil from './components/Grade/AssignPupilToClass';

import Subject from './components/Subject/Subject';
import SubjectList from './components/Subject/SubjectList';
import SubjectByClass from './components/Subject/SubjectByClass';

import SubjectByTeacher from './components/Subject/SubjectByTeacher';

import Exam from './components/Exam/Exam';
import ExamList from './components/Exam/ExamList';
import ExamBySubject from './components/Exam/ExamBySubject';
import ExamByTeacher from './components/Exam/ExamByTeacher';
import AddExamByTeacher from './components/Exam/ExamTeacher';
import ExamByTeacherSubject from './components/Exam/ExamByTeacherSubject';

import Score from './components/Score/Score';
import ScoreList from './components/Score/ScoreList';
import ScoreByTest from './components/Score/ScoreByTest';
import ScoreByTeacher from './components/Score/ScoreByTeacher';
import SubjectByStudent from './components/Subject/SubjectByStudent';

export default function App() {

    window.onbeforeunload = (event) => {
        const e = event || window.event;
        e.preventDefault();
        if (e) {
            e.returnValue = '';
        }
        return '';
    };

  const heading = "Welcome to Digital Grading System";
  const quote = "Datenbanken und Web-Techniken Project Task Summer Semester 2021";
  const footer = "Swagat Gyawali";

  return (
    <Router>
        <NavigationBar/>
        <Container>
            <Row>
                <Col lg={12} className={"margin-top"}>
                    <Switch>
                        <Route path="/" exact component={() => <Welcome heading={heading} quote={quote} footer={footer}/>}/>

                        <Route path="/users"  component={UserList}/>
                        <Route path="/addusers" exact component={User}/>
                        <Route path="/edituser/:id" component={User}/>

                        <Route path="/profile"  component={Profile}/>

                        <Route path="/class" exact component={GradeList}/>
                        <Route path="/addclass" exact component={Grade}/>
                        <Route path="/editclass/:id" exact component={Grade}/>
                        <Route path="/classpupil/:id" exact component={GradePupil}/>
                        <Route path="/assignpupil/:id" exact component={AssignPupil}/>

                        <Route path="/subject" exact component={SubjectList}/>
                        <Route path="/addsubject" exact component={Subject}/>
                        <Route path="/editsubject/:id" exact component={Subject}/>
                        <Route path="/subject/:id" exact component={SubjectByClass}/>
                        <Route path="/subjectbyteacher" exact component={SubjectByTeacher}/>
                        <Route path="/subjectbystudent" exact component={SubjectByStudent}/>

                        <Route path="/exam" exact component={ExamList}/>
                        <Route path="/addexam" exact component={Exam}/>
                        <Route path="/editexam/:id" exact component={Exam}/>
                        <Route path="/exam/:id" exact component={ExamBySubject}/>
                        <Route path="/exambyteacher" exact component={ExamByTeacher}/>
                        <Route path="/exambyteachersubject/:id" exact component={ExamByTeacherSubject}/>
                        <Route path="/addExamByTeacher" exact component={AddExamByTeacher}/>

                       
                        
                        <Route path="/editExamByTeacher/:id" exact component={AddExamByTeacher}/>

                        <Route path="/score" exact component={ScoreList}/>
                        <Route path="/addscore" exact component={Score}/>
                        <Route path="/editscore/:id" exact component={Score}/>
                        <Route path="/score/:id" exact component={ScoreByTest}/>

                        <Route path="/scorebyteacher" exact component={ScoreByTeacher}/>
                        <Route path="/editscorebyteacher/:id" exact component={ScoreByTeacher}/>

                        <Route path="/login" exact component={Login}/>
                        <Route path="/logout" exact component={Login}/>
                    </Switch>
                </Col>
            </Row>
        </Container >
        <Footer/>
    </Router>
  );
}
