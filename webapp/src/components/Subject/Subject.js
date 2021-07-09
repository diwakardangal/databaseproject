import React, {Component} from 'react';

import {connect} from 'react-redux';
import {saveSubject, fetchSubject, updateSubject, fetchLanguages, fetchGenres} from '../../services/index';

import {Card, Form, Button, Col, InputGroup, Image} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';
import axios from 'axios';

class Subject extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            teachers: [],
            grades : [],
            show : false
        };
        this.subjectChange = this.subjectChange.bind(this);
        this.submitSubject = this.submitSubject.bind(this);
    }

    initialState = {
        id:'', title:'', author:'', coverPhotoURL:'', isbnNumber:'', price:'', language:'', genre:''
    };

    componentDidMount() {
        debugger;
        const subjectId = +this.props.match.params.id;
        if(subjectId) {
            this.findSubjectById(subjectId);
        }
        this.findAllGrades();
        this.findAllTeacher();
    }

    findAllGrades = () => {
        axios.get("http://localhost:8081/rest/class/allclasses")
            .then(response => response.data)
            .then((data) => {
                console.log(data)
                this.setState({
                    grades: [{value:'', display:'Select Class'}]
                    .concat(data.map(d => {
                        return {value:d.id, display:d.className}
                    }))
                });
            })
            .catch(error => {
                console.log(error);
                this.props.history.push('/');
            });
    };

    findAllTeacher = () => {
        var role_id = 2
        axios.get("http://localhost:8081/rest/user/getbyrole/"+role_id)
            .then(response => response.data)
            .then((data) => {
                console.log(data)
                this.setState({
                    teachers: [{value:'', display:'Select Teacher'}]
                    .concat(data.map(d => {
                        return {value:d.id, display:(d.firstName + ' '+d.lastName)}
                    }))
                });
            })
            .catch(error => {
                console.log(error);
                this.props.history.push('/');
            });
    };

    findSubjectById = (subjectId) => {
        debugger;
        this.props.fetchSubject(subjectId);
        setTimeout(() => {
            let subject = this.props.subjectObject.subject;
            if(subject != null) {
                this.setState({
                    id: subject.id,
                    subjectName: subject.subjectName,
                    classes: subject.classes == null ? null : subject.classes['id'],
                    teacher: subject.teacher == null ? null : subject.teacher['id']
                });
            }
        }, 1000);

    };

    resetSubject = () => {
        this.setState(() => this.initialState);
    };

    submitSubject = event => {
        event.preventDefault();

        const subject = {
            subjectName: this.state.subjectName,
            class_id: this.state.classes,
            teacher_id: this.state.teacher
        };

        this.props.saveSubject(subject);
        setTimeout(() => {
            if(this.props.subjectObject.subject != null) {
                this.setState({"show":true, "method":"post"});
                setTimeout(() => this.setState({"show":false}), 1000);
               
            } else {
                this.setState({"show":false});
            }
            return this.props.history.push("/subject");
        }, 1000);
        this.setState(this.initialState);
        
    };

    updateSubject = event => {
        event.preventDefault();

        const subject = {
            subject_id: this.state.id,
            subjectName: this.state.subjectName,
            class_id: this.state.classes,
            teacher_id: this.state.teacher
        };
        this.props.updateSubject(subject);
        setTimeout(() => {
            if(this.props.subjectObject.subject != null) {
                this.setState({"show":true, "method":"put"});
                setTimeout(() => this.setState({"show":false}), 1000);
                
            } else {
                this.setState({"show":false});
            }
           
            return this.props.history.push("/subject");
        }, 1000);
        this.setState(this.initialState);
    };

    subjectChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    subjectList = () => {
        return this.props.history.push("/list");
    };

    render() {
        const {subjectName, classes, teacher} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Subject Updated Successfully." : "Subject Saved Successfully."} type = {"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Update Subject" : "Add New Subject"}
                    </Card.Header>
                    <Form onReset={this.resetSubject} onSubmit={this.state.id ? this.updateSubject : this.submitSubject} id="subjectFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPrice">
                                    <Form.Label>Subject Name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="subjectName"
                                        value={subjectName} onChange={this.subjectChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Subject Title" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridLanguage">
                                    <Form.Label>Class</Form.Label>
                                    <Form.Control required as="select"
                                        custom onChange={this.subjectChange}
                                        name="classes" value={classes}
                                        className={"bg-dark text-white"}>
                                        {this.state.grades.map(grade =>
                                            <option key={grade.value} value={grade.value}>
                                                {grade.display}
                                            </option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridGenre">
                                    <Form.Label>Teacher</Form.Label>
                                    <Form.Control required as="select"
                                        custom onChange={this.subjectChange}
                                        name="teacher" value={teacher}
                                        className={"bg-dark text-white"}>
                                        {this.state.teachers.map(teacher =>
                                            <option key={teacher.value} value={teacher.value}>
                                                {teacher.display}
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
                            <Button size="sm" variant="info" type="button" onClick={this.subjectList.bind()}>
                                <FontAwesomeIcon icon={faList} /> Subject List
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
        subjectObject: state.subject
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveSubject: (subject) => dispatch(saveSubject(subject)),
        fetchSubject: (subjectId) => dispatch(fetchSubject(subjectId)),
        updateSubject: (subject) => dispatch(updateSubject(subject))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Subject);