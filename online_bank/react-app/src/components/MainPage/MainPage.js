import React from 'react';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Navigation from "../FrameWorkUnity/DynamicNavBar";
import Search from "../FrameWorkUnity/Search";
import Container from "../FrameWorkUnity/Container";
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import ChangePassword from "../ChangePassword/ChangePassword";
import { connect } from "react-redux";
import { loginAction, logInRequest } from "../../actions/LoginAction/loginAction";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import cards from '../../images/website_ui.jpeg';
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import PopUpWindow from "../FrameWorkUnity/DynamicPopUpWindow/PopUpWindow";
import { changeUserType } from '../../actions/ChangeUserTypeAction/changeUserTypeAction';
import * as ACTION from "../../static/action_type";



class mainPage extends React.Component {

    render() {
        console.log('I am in main page props ');
        console.log(this.props);
        if (this.props.auth == false) {
            return (
                <div>
                    <Navigation />
                    <Search />
                    <Container>
                        <Login props={this.props} />
                    </Container>
                </div>
            );
        }
        else if (this.props.userType == ACTION.MANAGER && this.props.auth == true) {
            return (<Redirect to={'/manager'} />)
        }
        else if (this.props.userType == ACTION.CLIENT && this.props.auth == true) {
            return (<Redirect to={'/overview'} />)
        }
    }
}


class Login extends React.Component {
    state = {
        username: "",
        password: "",
        open: false,
        message: "",
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    onSubmit = (e) => {
        e.preventDefault();

        console.log('it just submit');
        // if (this.state.username == "admin" && this.state.password == "admin") {
        //     alert(" Logged In as Admin")
        //     return
        // }

        if (this.state.username == "") {
            alert("Username Can't be Empty :)")
            return;
        }
        if (this.state.password == "") {
            alert("Password Can't be Empty ")
            return;
        }

        axios.post('api/login', { username: this.state.username, password: this.state.password }
        ).then(response => {
            if (response.status === 201) {
                console.log(jwt_decode(response.data.access_token).identity.user_type);
                this.props.props.changeUserType(jwt_decode(response.data.access_token).identity.user_type)
                this.props.props.logInRequest(response)
                this.props.props.logInAction()
            }
        }).catch(error => {
            alert("Log In Failed, Please Try Again---");//+error.response);
            this.props.props.logInRequest(error.response)
        });


    }

    render() {
        console.log('I am in login page props ');
        console.log(this.props);
        return (
            <div>
                <div> <img src={cards} 
                    alt="card" style={center} /></div>
                <div> {<p style={para}> </p>}

                </div>

                <Paper style={paperStyle}>
                    <div className="wrapper fadeInDown" style={wrapper}>
                        <div id="formContent">
                            <form onSubmit={this.onSubmit}>
                                <slider></slider>
                                <Typography variant="h4" >Welcome !</Typography>
                                <div style={{ margin: '100px' }}>
                                    <input
                                        style={{ margin: '20px' }}
                                        type="text"
                                        placeholder="Username"
                                        maxLength={"50"}
                                        value={this.state.username}
                                        onChange={e => this.setState({ username: e.target.value })}
                                    />
                                    <input

                                        type="password"
                                        placeholder="Password"
                                        maxLength={"50"}
                                        value={this.state.password}
                                        onChange={e => this.setState({ password: e.target.value })}
                                    />
                                </div>

                                <Button variant="contained" type="submit" style={{ margin: '10px' }}>
                                    Sign In
                        </Button>

                                <div id="formFooter" style={formFooter}>
                                    <a className="underlineHover" href="#" onClick={this.handleOpen}>Forgot Password?</a>
                                </div>
                            </form>
                            <Modal
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                                open={this.state.open}
                                onClose={this.handleClose}>

                                <ChangePassword />
                            </Modal>
                        </div>
                    </div>
                </Paper>
            </div>
        )
    };
}




const wrapper = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '150%',
    width: '100%',
    padding: '20px',
    border: '3px solid blue',
    opacity: '.9',
    paddingTop: '20px',
    WebkitBorderRadius: '10px 10px 10px 10px',
}

const formContent = {
    WebkitBorderRadius: '10px 10px 10px 10px',
    padding: '30px',
    width: '90%',
    maxWidth: '450px',
    position: 'relative',
    textAlign: 'center',
    margin: 'auto',
}

const formFooter = {
    position: 'flex',
    padding: '25px',
    textAlign: 'center',
    WebkitBorderRadius: '10px 10px 10px 10px',
    borderRadius: '10px 10px 10px 10px',
}
const paperStyle = {
    height: '80%',
    width: '40%',
    boxShadow: '5px 1px 10px, 5px 1px 10px',
    WebkitBorderRadius: '10px 10px 10px 10px',
    textAlign: 'center',
    margin: 'auto',
    font: 'Helvetica',
};

const center = {
    margin: '0',
    position: 'absolute',
    paddingTop: '20px',
    whiteSpace: 'nowrap',
    paddingLeft: '400px',
    paddingRight: '450px',
    paddingBottom: '30px',
    // backgroundColor: 'cornflowerblue',
    height: '30%',
    width: '100%',
    opacity: '0.98'
}

const para = {
    paddingTop: '300px',
    position: 'flex',
}


const mapStateToProps = (state) => {
    console.log("I'm in map State to Props");
    console.log(state);
    return state;
}

export default connect(mapStateToProps, { logInAction: loginAction, logInRequest, changeUserType })(mainPage);
