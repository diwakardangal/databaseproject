import React, {Component} from 'react';

import {connect} from 'react-redux';
import {deleteGrade} from '../../services/index';

import './../../assets/css/Style.css';
import {Card, Table, Image, ButtonGroup, Button, InputGroup, FormControl} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faPlusSquare,faTrash, faStepBackward, faFastBackward, faStepForward, faFastForward, faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import MyToast from '../MyToast';
import axios from 'axios';

class GradeList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            grades : [],
            search : '',
            currentPage : 1,
            gradesPerPage : 50,
            sortDir: "asc"
        };
    }

    sortData = () => {
        setTimeout(() => {
            this.state.sortDir === "asc" ? this.setState({sortDir: "desc"}) : this.setState({sortDir: "asc"});
            this.findAllGrades(this.state.currentPage);
        }, 500);
    };

    componentDidMount() {
        this.findAllGrades(this.state.currentPage);
    }

    findAllGrades(currentPage) {
        currentPage -= 1;
        axios.get("http://localhost:8081/rest/class?pageNumber="+currentPage+"&pageSize="+this.state.gradesPerPage+"&sortBy=className&sortDir="+this.state.sortDir)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    grades: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                });
            })
            .catch(error => {
                console.log(error);
                // localStorage.removeItem('jwtToken');
                this.props.history.push('/');
            });
    };

    deleteGrade = (gradeId) => {
        this.props.deleteGrade(gradeId);
        setTimeout(() => {
            if(this.props.gradeObject != null) {
                this.setState({"show":true});
                setTimeout(() => this.setState({"show":false}), 3000);
                this.findAllGrades(this.state.currentPage);
            } else {
                this.setState({"show":false});
            }
        }, 1000);
    };

    changePage = event => {
        let targetPage = parseInt(event.target.value);
        if(this.state.search) {
            this.searchData(targetPage);
        } else {
            this.findAllGrades(targetPage);
        }
        this.setState({
            [event.target.name]: targetPage
        });
    };

    firstPage = () => {
        let firstPage = 1;
        if(this.state.currentPage > firstPage) {
            if(this.state.search) {
                this.searchData(firstPage);
            } else {
                this.findAllGrades(firstPage);
            }
        }
    };

    prevPage = () => {
        let prevPage = 1;
        if(this.state.currentPage > prevPage) {
            if(this.state.search) {
                this.searchData(this.state.currentPage - prevPage);
            } else {
                this.findAllGrades(this.state.currentPage - prevPage);
            }
        }
    };

    lastPage = () => {
        let condition = Math.ceil(this.state.totalElements / this.state.gradesPerPage);
        if(this.state.currentPage < condition) {
            if(this.state.search) {
                this.searchData(condition);
            } else {
                this.findAllGrades(condition);
            }
        }
    };

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.totalElements / this.state.gradesPerPage)) {
            if(this.state.search) {
                this.searchData(this.state.currentPage + 1);
            } else {
                this.findAllGrades(this.state.currentPage + 1);
            }
        }
    };

    searchChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    };

    cancelSearch = () => {
        this.setState({"search" : ''});
        this.findAllGrades(this.state.currentPage);
    };

    searchData = (currentPage) => {
        currentPage -= 1;
        axios.get("http://localhost:8081/rest/class/search/"+this.state.search+"?page="+currentPage+"&size="+this.state.gradesPerPage)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    grades: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                });
            });
    };

    render() {
        const {grades, currentPage, totalPages, search} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"Class Deleted Successfully."} type = {"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <div style={{"float":"left"}}>
                            <FontAwesomeIcon icon={faList} /> Class List
                            &nbsp; &nbsp;
                            <Link to={"/addclass/"} className="btn btn-sm btn-outline-success"><FontAwesomeIcon icon={faPlusSquare} /> Add New Class</Link>{' '}
                       
                        </div>
                        <div style={{"float":"right"}}>
                             <InputGroup size="sm">
                                <FormControl placeholder="Search" name="search" value={search}
                                    className={"info-border bg-dark text-white"}
                                    onChange={this.searchChange}/>
                                <InputGroup.Append>
                                    <Button size="sm" variant="outline-info" type="button" onClick={this.searchData}>
                                        <FontAwesomeIcon icon={faSearch}/>
                                    </Button>
                                    <Button size="sm" variant="outline-danger" type="button" onClick={this.cancelSearch}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </Button>
                                </InputGroup.Append>
                             </InputGroup>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                  <th>Id</th>
                                  <th>Class</th>
                                  <th>Assign / Deassign Pupil</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                    grades.length === 0 ?
                                    <tr align="center">
                                      <td colSpan="7">No Class Available.</td>
                                    </tr> :
                                    grades.map((grade) => (
                                    <tr key={grade.id}>
                                        <td>{grade.id}</td>
                                        <td>{grade.className}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"/assignpupil/"+grade.id} className="btn btn-sm btn-outline-info">Assign New Student</Link>{' '}
                                            </ButtonGroup>&nbsp;&nbsp;
                                            <ButtonGroup>
                                                <Link to={"/classpupil/"+grade.id} className="btn btn-sm btn-outline-primary">View Students</Link>{' '}
                                            </ButtonGroup>&nbsp;&nbsp;
                                            <ButtonGroup>
                                                <Link to={"/subject/"+grade.id} className="btn btn-sm btn-outline-warning">Manage Subjects</Link>{' '}
                                            </ButtonGroup>
                                        </td>
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"editclass/"+grade.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                                                <Button size="sm" variant="outline-danger" onClick={this.deleteGrade.bind(this, grade.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                    ))
                                }
                              </tbody>
                        </Table>
                    </Card.Body>
                    {grades.length > 0 ?
                        <Card.Footer>
                            <div style={{"float":"left"}}>
                                Showing Page {currentPage} of {totalPages}
                            </div>
                            <div style={{"float":"right"}}>
                                <InputGroup size="sm">
                                    <InputGroup.Prepend>
                                        <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                            onClick={this.firstPage}>
                                            <FontAwesomeIcon icon={faFastBackward} /> First
                                        </Button>
                                        <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                            onClick={this.prevPage}>
                                            <FontAwesomeIcon icon={faStepBackward} /> Prev
                                        </Button>
                                    </InputGroup.Prepend>
                                    <FormControl className={"page-num bg-dark"} name="currentPage" value={currentPage}
                                        onChange={this.changePage}/>
                                    <InputGroup.Append>
                                        <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                            onClick={this.nextPage}>
                                            <FontAwesomeIcon icon={faStepForward} /> Next
                                        </Button>
                                        <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                            onClick={this.lastPage}>
                                            <FontAwesomeIcon icon={faFastForward} /> Last
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </div>
                        </Card.Footer> : null
                     }
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        
        gradeObject: state.grade
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteGrade: (gradeId) => dispatch(deleteGrade(gradeId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GradeList);