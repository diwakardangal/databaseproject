import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserPlus, faSignInAlt, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {logoutUser} from '../services/index';

class NavigationBar extends Component {
    logout = () => {
        this.props.logoutUser();
    };

    render() {
        const guestLinks = (
            <>
                <div className="mr-auto"></div>
                <Nav className="navbar-right">
                    <Link to={"login"} className="nav-link"><FontAwesomeIcon icon={faSignInAlt} /> Login</Link>
                </Nav>
            </>
        );
        const userLinks = (
            <>
                {localStorage.getItem('role') == "admin" ? 
                <Nav className="mr-auto">
                        <Link to={"/users"} className="nav-link">User</Link>
                        <Link to={"/class"} className="nav-link">Class</Link>
                        <Link to={"/subject"} className="nav-link">Subject</Link>
                        <Link to={"/exam"} className="nav-link">Test</Link>
                       
                </Nav>
                :
                null
                }

                {localStorage.getItem('role') == "teacher" ? 
                      <Nav className="mr-auto">
                          <Link to={"/subjectbyteacher"} className="nav-link">Subject</Link>
                          <Link to={"/exambyteacher"} className="nav-link">Tests</Link>
                          {/* <Link to={"/score"} className="nav-link">Grade</Link> */}
                      </Nav>
                :
                null
                }

                {localStorage.getItem('role') == "pupil" ? 
                    <Nav className="mr-auto">
                         <Link to={"/subjectbystudent"} className="nav-link">Subject</Link>
                    </Nav>
                :
                null
                }   

                <Nav className="navbar-right">
                    <Link to={"/profile"} className="nav-link">Profile</Link>
                    <Link to={"logout"} className="nav-link" onClick={this.logout}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</Link>
                </Nav>
            </>
        );

        return (
            <Navbar bg="dark" variant="dark">
                <Link to={""} className="navbar-brand">
                    Digital Grading System
                </Link>
                {this.props.auth.isLoggedIn ? userLinks : guestLinks}
            </Navbar>
        );
    };
};

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => dispatch(logoutUser())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);