import React, {Component} from 'react';

import {connect} from 'react-redux';
import {saveExam, fetchExam, updateExam} from '../../services/index';

import {Card, Form, Button, Col, InputGroup, Image} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';
import axios from 'axios';
import Moment from 'moment';


class ExamTeacher extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            subjects: [],
            show : false
        };
        this.examChange = this.examChange.bind(this);
        this.submitExam = this.submitExam.bind(this);
    }

    initialState = {
        id:'', testName:'', testDate:'', subject:''
    };

    componentDidMount() {
        debugger;
        const examId = +this.props.match.params.id;
        if(examId) {
            this.findExamById(examId);
        }
        this.findAllSubjects();
    }

    findAllSubjects = () => {
        var id = localStorage.getItem('user_id');
        axios.get("http://localhost:8081/rest/subjects/subjectByTeacher/"+id)
            .then(response => response.data)
            .then((data) => {
                console.log(data)
                this.setState({
                    subjects: [{value:'', display:'Select Subject'}]
                    .concat(data.map(d => {
                            return {value:d.id, display:d.subjectName}
                       
                    }))
                });
                var subData = this.state.subjects;
                var datas = subData.filter(function( element ) {
                    return element !== undefined;
                 });
                 this.setState({subjects: datas})

                console.log(this.state.subjects)
            })
            .catch(error => {
                console.log(error);
                this.props.history.push('/');
            });
    };

   
    findExamById = (examId) => {
        debugger;
        this.props.fetchExam(examId);
        setTimeout(() => {
            let exam = this.props.examObject.exam;
            if(exam != null) {
                this.setState({
                    id: exam.id,
                    testName: exam.testName,
                    testDate: exam.testDate,
                    subject: exam.subject == null ? null : exam.subject['id']
                });
            }
        }, 1000);

    };

    resetExam = () => {
        this.setState(() => this.initialState);
    };

    submitExam = event => {
        event.preventDefault();

        const exam = {
            testName: this.state.testName,
            testDate: this.state.testDate,
            subject: this.state.subject
        };

        this.props.saveExam(exam);
        setTimeout(() => {
            if(this.props.examObject.exam != null) {
                this.setState({"show":true, "method":"post"});
                setTimeout(() => this.setState({"show":false}), 1000);
               
            } else {
                this.setState({"show":false});
            }
            return this.props.history.push("/exambyteacher");
        }, 1000);
        this.setState(this.initialState);
    };

    updateExam = event => {
        event.preventDefault();

        const exam = {
            id: this.state.id,
            testName: this.state.testName,
            testDate: this.state.testDate,
            subject: this.state.subject
        };
        this.props.updateExam(exam);
        setTimeout(() => {
            if(this.props.examObject.exam != null) {
                this.setState({"show":true, "method":"put"});
                setTimeout(() => this.setState({"show":false}), 1000);
                
            } else {
                this.setState({"show":false});
            }
           
            return this.props.history.push("/exambyteacher");
        }, 1000);
        this.setState(this.initialState);
    };

    examChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    examList = () => {
        return this.props.history.push("/exam");
    };

    render() {
        const {testName, testDate, subject} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Exam Updated Successfully." : "Exam Saved Successfully."} type = {"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Update Exam" : "Add New Exam"}
                    </Card.Header>
                    <Form onReset={this.resetExam} onSubmit={this.state.id ? this.updateExam : this.submitExam} id="examFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPrice">
                                    <Form.Label>Test Name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="testName"
                                        value={testName} onChange={this.examChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Exam Title" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridLanguage">
                                    <Form.Label>Test Date</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="date" name="testDate"
                                        value={Moment(testDate).format('yyyy-MM-DD')} onChange={this.examChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Test Date" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridGenre">
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control required as="select"
                                        custom onChange={this.examChange}
                                        name="subject" value={subject}
                                        className={"bg-dark text-white"}>
                                            {this.state.subjects.map(s =>
                                                <option key={s.value} value={s.value}>
                                                    {s.display}
                                                </option>
                                            )}
                                    </Form.Control>
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
                            <Button size="sm" variant="info" type="button" onClick={this.examList.bind()}>
                                <FontAwesomeIcon icon={faList} /> Exam List
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
        examObject: state.exam
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveExam: (exam) => dispatch(saveExam(exam)),
        fetchExam: (examId) => dispatch(fetchExam(examId)),
        updateExam: (exam) => dispatch(updateExam(exam))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExamTeacher);