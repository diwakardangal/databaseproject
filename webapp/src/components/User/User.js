import React, {Component} from 'react';

import {connect} from 'react-redux';
import {saveUser, fetchUser, updateUser,fetchRoles,fetchRolesById} from '../../services/index';

import {Card, Form, Button, Col, InputGroup, Image} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';
import axios from 'axios';

class User extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            show : false,
            issue:'',
            emailissue:''
        };
        this.userChange = this.userChange.bind(this);
        this.submitUser = this.submitUser.bind(this);
    }

    initialState = {
        id:'', firstName:'', lastName:'', email:'', username:'', password:'',role:''
    };

    componentDidMount() {
        
        const userId = +this.props.match.params.id;
        if(userId) {
            this.findUserById(userId);
        }
    }

  

    findUserById = (userId) => {
        
        this.props.fetchUser(userId);
        setTimeout(() => {
            let user = this.props.userObject.users;
            if(user != null) {
                this.setState({
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    username: user.username,
                    password: user.password,
                    role: user.role.name
                });
            }
        }, 100);
    };

    resetUser = () => {
        this.setState(() => this.initialState);
    };

    submitUser = event => {
        event.preventDefault();

        if(this.state.issue == '' && this.state.emailissue == ''){
            const user = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                username: this.state.username,
                password: this.state.password,
                role: this.state.role
            };
            
            this.props.saveUser(user);
            setTimeout(() => {
                if(this.props.userObject.user != null) {
                    this.setState({"show":true, "method":"post"});
                    setTimeout(() => this.setState({"show":false}), 1000);
                } else {
                    this.setState({"show":false});
                }
    
             return this.props.history.push("/users");
            }, 1000);
            
            this.setState(this.initialState);
        }

      
    };

    updateUser = event => {
        event.preventDefault();
        const user = {
            id: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            role: this.state.role
        };
        this.props.updateUser(user);
        setTimeout(() => {
            if(this.props.userObject.user != null) {
                this.setState({"show":true, "method":"put"});
                setTimeout(() => this.setState({"show":false}), 1000);
            } else {
                this.setState({"show":false});
            }
            return this.props.history.push("/users");
        }, 1000);
        this.setState(this.initialState);
    };

    userChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    checkusername = event => {
        
        var username = event.target.value

        if(username != ""){
            axios.get("http://localhost:8081/rest/user/checkusername/"+username)
            .then(response => response.data)
            .then((data) => {
                debugger
                if(data == null || data == ""){
                    this.setState({
                        issue: ''
                    });
                }else{
                    this.setState({
                        issue: 'Username already exists'
                    });
                }
               
            })
            .catch(error => {
                console.log(error);
                this.props.history.push('/');
            });
        }else{
            this.setState({
                issue: 'Username already exists'
            });
        }
      

        this.setState({
            [event.target.name]:event.target.value
        });
    };

    checkemail = event => {
        var email = event.target.value

        if(email != ""){
            axios.get("http://localhost:8081/rest/user/checkemail/"+email)
            .then(response => response.data)
            .then((data) => {
                if(data == null || data == ""){
                    this.setState({
                        emailissue: ''
                    });
                }else{
                    this.setState({
                        emailissue: 'Email already exists'
                    });
                }
               
            })
            .catch(error => {
                console.log(error);
                this.props.history.push('/');
            });
        }else{
            this.setState({
                emailissue: ''
            });
        }
      

        this.setState({
            [event.target.name]:event.target.value
        });
    };
    

    userList = () => {
        return this.props.history.push("/users");
    };

    render() {
        const {firstName, lastName, email, username, password,role} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ? "User Updated Successfully." : "User Saved Successfully."} type = {"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Update User" : "Add New User"}
                    </Card.Header>
                    <Form onReset={this.resetUser} onSubmit={this.state.id ? this.updateUser : this.submitUser} id="userFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text" name="firstName"
                                        value={firstName} onChange={this.userChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter First Name" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridAuthor">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text" name="lastName"
                                        value={lastName} onChange={this.userChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Last Name" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCoverPhotoURL">
                                    <Form.Label>Email</Form.Label>
                                    <InputGroup>
                                        <Form.Control required autoComplete="off"
                                            type="email" name="email"
                                            value={email} onChange={this.checkemail}
                                            className={"bg-dark text-white"}
                                            placeholder="Enter Email" />
                                            
                                    </InputGroup>
                                    <label style={{"color":"#fea002"}}>{this.state.emailissue}</label>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridISBNNumber">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text" name="username"
                                        value={username} onChange={this.checkusername}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Username" />
                                        <label style={{"color":"#fea002"}}>{this.state.issue}</label>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPrice">
                                    <Form.Label>password</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="password" name="password"
                                        value={password} onChange={this.userChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Password" />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridGenre">
                                    <Form.Label>User Role</Form.Label>
                                    <Form.Control required as="select"
                                        custom onChange={this.userChange}
                                        name="role" 
                                        className={"bg-dark text-white"}>
                                        <option>Select Role</option>
                                        {role == "admin" ? <option selected key='admin' value='admin'>admin</option> : <option key='admin' value='admin'>admin</option>}
                                        {role == "teacher" ? <option selected key='teacher' value='teacher'>teacher</option> : <option key='teacher' value='teacher'>teacher</option>}
                                        {role == "pupil" ? <option selected key='pupil' value='pupil'>pupil</option> : <option key='pupil' value='pupil'>pupil</option>}
                                       
                                        
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
                            <Button size="sm" variant="info" type="button" onClick={this.userList.bind()}>
                                <FontAwesomeIcon icon={faList} /> User List
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
        userObject: state.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        saveUser: (user) => dispatch(saveUser(user)),
        fetchUser: (userId) => dispatch(fetchUser(userId)),
        updateUser: (user) => dispatch(updateUser(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);