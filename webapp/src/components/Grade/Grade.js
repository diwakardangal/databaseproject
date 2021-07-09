import React, {Component} from 'react';

import {connect} from 'react-redux';
import {saveGrade, fetchGrade, updateGrade} from '../../services/index';

import {Card, Form, Button, Col, InputGroup, Image} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';

class Grade extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            show : false
        };
        this.gradeChange = this.gradeChange.bind(this);
        this.submitGrade = this.submitGrade.bind(this);
    }

    initialState = {
        id:'', className:''
    };

    componentDidMount() {
        debugger;
        const gradeId = +this.props.match.params.id;
        if(gradeId) {
            this.findGradeById(gradeId);
        }
    }

   

    findGradeById = (gradeId) => {
        debugger
        this.props.fetchGrade(gradeId);
        setTimeout(() => {
            let grade = this.props.gradeObject.grade;
            if(grade != null) {
                this.setState({
                    id: grade.id,
                    className: grade.className
                });
            }
        }, 1000);
    };

    resetGrade = () => {
        this.setState(() => this.initialState);
    };

    submitGrade = event => {
        event.preventDefault();

        const grade = {
            className: this.state.className
        };

        this.props.saveGrade(grade);
        setTimeout(() => {
            if(this.props.gradeObject.grade != null) {
                this.setState({"show":true, "method":"post"});
                setTimeout(() => this.setState({"show":false}), 1000);
            } else {
                this.setState({"show":false});
            }
            return this.props.history.push("/class");
        }, 1000);
        this.setState(this.initialState);
    };

    updateGrade = event => {
        event.preventDefault();

        const grade = {
            id: this.state.id,
            className: this.state.className
        };
        this.props.updateGrade(grade);
        setTimeout(() => {
            if(this.props.gradeObject.grade != null) {
                this.setState({"show":true, "method":"put"});
                setTimeout(() => this.setState({"show":false}), 1000);
            } else {
                this.setState({"show":false});
            }
            return this.props.history.push("/class");
        }, 1000);
        this.setState(this.initialState);
    };

    gradeChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    gradeList = () => {
        return this.props.history.push("/class");
    };

    render() {
        const {className} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Book Updated Successfully." : "Book Saved Successfully."} type = {"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Update Class" : "Add New Class"}
                    </Card.Header>
                    <Form onReset={this.resetBook} onSubmit={this.state.id ? this.updateGrade : this.submitGrade} id="bookFormId">
                        <Card.Body>
                            <Form.Row>
                                    <Form.Group as={Col} controlId="formGridClass">
                                        <Form.Label>Class Name</Form.Label>
                                        <Form.Control required autoComplete="off"
                                            type="text" name="className"
                                            value={className} onChange={this.gradeChange}
                                            className={"bg-dark text-white"}
                                            placeholder="Enter Class Name" />
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
                            <Button size="sm" variant="info" type="button" onClick={this.gradeList.bind()}>
                                <FontAwesomeIcon icon={faList} /> Class List
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
        gradeObject: state.grade
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveGrade: (grade) => dispatch(saveGrade(grade)),
        fetchGrade: (gradeId) => dispatch(fetchGrade(gradeId)),
        updateGrade: (grade) => dispatch(updateGrade(grade))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Grade);