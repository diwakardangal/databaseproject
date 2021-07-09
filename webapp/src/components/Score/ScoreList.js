import React, {Component} from 'react';

import {connect} from 'react-redux';
import {deleteScore} from '../../services/index';

import './../../assets/css/Style.css';
import {Card, Table,Form, Image, ButtonGroup, Button, InputGroup, FormControl} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList,faPlusSquare, faEdit, faTrash, faStepBackward, faFastBackward, faStepForward, faFastForward, faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import MyToast from '../MyToast';
import axios from 'axios';
import Moment from 'moment';


class ScoreList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            scores : [],
            search : '',
            currentPage : 1,
            scoresPerPage : 50,
            sortDir: "asc"
        };
    }


    sortData = () => {
        setTimeout(() => {
            this.state.sortDir === "asc" ? this.setState({sortDir: "desc"}) : this.setState({sortDir: "asc"});
            this.findAllScores(this.state.currentPage);
        }, 500);
    };

    componentDidMount() {
        this.findAllScores(this.state.currentPage);
    }

    findAllScores(currentPage) {
        currentPage -= 1;
        axios.get("http://localhost:8081/rest/scores?pageNumber="+currentPage+"&pageSize="+this.state.scoresPerPage+"&sortBy=score&sortDir="+this.state.sortDir)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    scores: data.content,
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

    deleteScore = (scoreId) => {
        this.props.deleteScore(scoreId);
        setTimeout(() => {
            if(this.props.scoreObject != null) {
                this.setState({"show":true});
                setTimeout(() => this.setState({"show":false}), 3000);
                this.findAllScores(this.state.currentPage);
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
            this.findAllScores(targetPage);
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
                this.findAllScores(firstPage);
            }
        }
    };

    prevPage = () => {
        let prevPage = 1;
        if(this.state.currentPage > prevPage) {
            if(this.state.search) {
                this.searchData(this.state.currentPage - prevPage);
            } else {
                this.findAllScores(this.state.currentPage - prevPage);
            }
        }
    };

    lastPage = () => {
        let condition = Math.ceil(this.state.totalElements / this.state.scoresPerPage);
        if(this.state.currentPage < condition) {
            if(this.state.search) {
                this.searchData(condition);
            } else {
                this.findAllScores(condition);
            }
        }
    };

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.totalElements / this.state.scoresPerPage)) {
            if(this.state.search) {
                this.searchData(this.state.currentPage + 1);
            } else {
                this.findAllScores(this.state.currentPage + 1);
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
        this.findAllScores(this.state.currentPage);
    };

    uploadFile = ({target : {files}}) => {
        console.log(files[0]);
        let data = new FormData();
        data.append('file', files[0]);
    
    
        axios.post("/api/employees/save-from-csv", data)
            .then(res => {console.log(res)})
    };
    

    searchData = (currentPage) => {
        currentPage -= 1;
        axios.get("http://localhost:8081/rest/scores/search/"+this.state.search+"?page="+currentPage+"&size="+this.state.scoresPerPage)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    scores: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                });
            });
    };

    render() {
        const {scores, currentPage, totalPages, search} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"Score Deleted Successfully."} type = {"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <div style={{"float":"left"}}>
                            <FontAwesomeIcon icon={faList} /> Grades List
                            &nbsp; &nbsp;
                            <Link to={"/scorebyteacher/"} className="btn btn-sm btn-outline-success"><FontAwesomeIcon icon={faPlusSquare} /> Add New Grade</Link>{' '}
                            &nbsp; &nbsp;
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
                                  <th>Student</th>
                                  <th>Test</th>
                                  <th>Grade</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                    scores.length === 0 ?
                                    <tr align="center">
                                      <td colSpan="7">No Tests Available.</td>
                                    </tr> :
                                    scores.map((score) => (
                                    <tr key={score.id}>
                                        <td>{score.id}</td>
                                        <td>{score.pupil.firstName} {score.pupil.lastName}</td>
                                        <td>{score.exam.testName}</td>
                                        <td>{score.score}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"/editscore/"+score.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                                                <Button size="sm" variant="outline-danger" onClick={this.deleteScore.bind(this, score.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                    ))
                                }
                              </tbody>
                        </Table>
                    </Card.Body>
                    {scores.length > 0 ?
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
        scoreObject: state.score
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteScore: (scoreId) => dispatch(deleteScore(scoreId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScoreList);