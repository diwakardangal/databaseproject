import React, {Component} from 'react';

import {connect} from 'react-redux';
import {saveScore, fetchScore, updateScore} from '../../services/index';

import {Card, Form, Button, Col, InputGroup, Image} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';
import axios from 'axios';



class ScoreByTeacher extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            students: [],
            exams:[],
            subjects:[],
            grade:'',
            subjectSel: '',
            show : false
        };
        this.scoreChange = this.scoreChange.bind(this);
        this.submitScore = this.submitScore.bind(this);
    }

    initialState = {
        id:'', score:'', pupil:'', exam:''
    };

    componentDidMount() {
        
        const scoreId = +this.props.match.params.id;
        if(scoreId) {
            this.findScoreById(scoreId);
        }
        this.findAllStudents();
        this.loadSubjectByTeacher()
        this.findTest()
        
    }

    findAllStudents = () => {
        axios.get("http://localhost:8081/rest/user/getbyrole/3")
            .then(response => response.data)
            .then((data) => {
                console.log(data)
                this.setState({
                    students: [{value:'', display:'Select Student'}]
                    .concat(data.map(d => {
                        return {value:d.id, display:d.firstName + ' '+d.lastName}
                    }))
                });
            })
            .catch(error => {
                console.log(error);
                this.props.history.push('/');
            });
    };

    findAllExams = () => {
        axios.get("http://localhost:8081/rest/exams/allexams")
            .then(response => response.data)
            .then((data) => {
                console.log(data)
                this.setState({
                    exams: [{value:'', display:'Select Test'}]
                    .concat(data.map(d => {
                        return {value:d.id, display:d.testName}
                    }))
                });
            })
            .catch(error => {
                console.log(error);
                this.props.history.push('/');
            });
    };

    

   
    findScoreById = (scoreId) => {
        this.props.fetchScore(scoreId);
        setTimeout(() => {
            let score = this.props.scoreObject.score;
            if(score != null) {
                this.setState({
                    id: score.id,
                    score: score.score,
                    pupil: score.pupil == null ? null : score.pupil['id'],
                    exam: score.exam == null ? null : score.exam['id']
                });
                if(score.pupil != null){
                    this.loadClassUpdate(score.pupil['id'])
                    this.setState({
                        subjectSel: score.exam['subject']['id']
                    })
                    
                }

                if(score.exam != null){
                    this.findTestBySubject(score.exam['subject']['id'])
                }
                
            }
        }, 1000);

    };

    resetScore = () => {
        this.setState(() => this.initialState);
    };

    submitScore = event => {
        event.preventDefault();
        const score = {
            score: this.state.score,
            pupil: this.state.pupil,
            exam: this.state.exam
        };

        this.props.saveScore(score);
        setTimeout(() => {
            if(this.props.scoreObject.score != null) {
                this.setState({"show":true, "method":"post"});
                setTimeout(() => this.setState({"show":false}), 1000);
               
            } else {
                this.setState({"show":false});
            }
            return this.props.history.push("/exambyteacher");
        }, 1000);
        this.setState(this.initialState);
    };

    updateScore = event => {
        event.preventDefault();

        const score = {
            id: this.state.id,
            score: this.state.score,
            pupil: this.state.pupil,
            exam: this.state.exam
        };
        this.props.updateScore(score);
        setTimeout(() => {
            if(this.props.scoreObject.score != null) {
                this.setState({"show":true, "method":"put"});
                setTimeout(() => this.setState({"show":false}), 1000);
                
            } else {
                this.setState({"show":false});
            }
           
            return this.props.history.push("/exambyteacher");
        }, 1000);
        this.setState(this.initialState);
    };

    scoreChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    
    loadSubject(class_id){
        debugger
        console.log(class_id)
        axios.get("http://localhost:8081/rest/subjects/subjectbyclass/"+class_id)
        .then(response => response.data)
        .then((data) => {
            this.setState({
                subjects: [{value:'', display:'Select Subject'}]
                .concat(data.map(d => {
                    return {value:d.id, display:d.subjectName}
                }))
            });
           
        })
        .catch(error => {
            console.log(error);
            this.props.history.push('/');
        });
    };

    

    loadClass = event => {
        debugger;
        this.setState({
            [event.target.name]:event.target.value
        });

        var id = event.target.value;
        console.log(id)
        axios.get("http://localhost:8081/rest/classpupil/classBysubject/"+id)
        .then(response => response.data)
        .then((data) => {
            console.log(data.classes.className)
            this.setState({
                grade: data.classes.className
            });

            this.loadSubject(data.classes.id)
        })
        .catch(error => {
            console.log(error);
            this.props.history.push('/');
        });
    };

    loadSubjectByTeacher() {
        
        var id = localStorage.getItem("user_id");
        console.log(id)
        axios.get("http://localhost:8081/rest/subjects/subjectByTeacher/"+id)
        .then(response => response.data)
        .then((data) => {
            this.setState({
            subjects: [{value:'', display:'Select Subject'}]
            .concat(data.map(d => {
                return {value:d.id, display:d.subjectName}
            }))
        });
        })
        .catch(error => {
            console.log(error);
            this.props.history.push('/');
        });
    };

    loadClassUpdate(id) {
        console.log(id)
        axios.get("http://localhost:8081/rest/classpupil/classbyuser/"+id)
        .then(response => response.data)
        .then((data) => {
            console.log(data.classes.className)
            this.setState({
                grade: data.classes.className
            });

            this.loadSubject(data.classes.id)
        })
        .catch(error => {
            console.log(error);
            this.props.history.push('/');
        });
    };



    findTestBySubject(subject_id){
        
        axios.get("http://localhost:8081/rest/exams/examsbysubject/"+subject_id)
            .then(response => response.data)
            .then((data) => {
                console.log(data)
                this.setState({
                    exams: [{value:'', display:'Select Test'}]
                    .concat(data.map(d => {
                        return {value:d.id, display:d.testName}
                    }))
                });
            })
            .catch(error => {
                console.log(error);
                this.props.history.push('/');
            });
    };

    findTest(){
        
        axios.get("http://localhost:8081/rest/exams/allexams/")
            .then(response => response.data)
            .then((data) => {
                console.log(data)
                this.setState({
                    exams: [{value:'', display:'Select Test'}]
                    .concat(data.map(d => {
                        return {value:d.id, display:d.testName}
                    }))
                });
            })
            .catch(error => {
                console.log(error);
                this.props.history.push('/');
            });
    };

    subjectChange = event => {
        var id = event.target.value;
        this.findTestBySubject(id)
        this.setState({
            [event.target.name]:event.target.value
        });
    };
    
    handleChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };


    scoreList = () => {
        return this.props.history.push("/score");
    };

    render() {
        const {score, pupil, exam} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Score Updated Successfully." : "Score Saved Successfully."} type = {"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <div style={{"float":"left"}}>
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Update Score" : "Add New Score"}
                        </div>
                        
                      

                        <div style={{"float":"right"}}>
                            <Form.Control required autoComplete="off"
                                            type="file" name="file"
                                             onChange={this.uploadFile}
                                            className={"bg-dark text-white"}
                                            />
                        </div>
                        <div style={{"float":"right"}}>
                            <Form.Label>Bulk Upload&nbsp; &nbsp;</Form.Label>
                        </div>
                    </Card.Header>
                    <Form onReset={this.resetScore} onSubmit={this.state.id ? this.updateScore : this.submitScore} id="scoreFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} >
                                    <Form.Label>Student</Form.Label>
                                        <Form.Control required as="select"
                                            onChange={this.handleChange}
                                            name="pupil" value={pupil}
                                            className={"bg-dark text-white"}>
                                            {this.state.students.map(s =>
                                                <option key={s.value} value={s.value}>
                                                    {s.display}
                                                </option>
                                            )}
                                        </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} >
                                    <Form.Label>Exam</Form.Label>
                                    <Form.Control required as="select"
                                        custom onChange={this.handleChange}
                                        name="exam" value={exam}
                                        className={"bg-dark text-white"}>
                                        {this.state.exams.map(s =>
                                            <option key={s.value} value={s.value}>
                                                {s.display}
                                            </option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                

                                <Form.Group as={Col} controlId="formGridGenre">
                                    <Form.Label>Score</Form.Label>
                                        <Form.Control required autoComplete="off"
                                            type="test" name="score"
                                            value={score} onChange={this.handleChange}
                                            className={"bg-dark text-white"}
                                            placeholder="Enter Score" />
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} /> {this.state.id ? "Update" : "Save"}
                            </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>{' '}
                            <Button size="sm" variant="info" type="button" onClick={this.scoreList.bind()}>
                                <FontAwesomeIcon icon={faList} /> Score List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        scoreObject: state.score
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveScore: (score) => dispatch(saveScore(score)),
        fetchScore: (scoreId) => dispatch(fetchScore(scoreId)),
        updateScore: (score) => dispatch(updateScore(score))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScoreByTeacher);