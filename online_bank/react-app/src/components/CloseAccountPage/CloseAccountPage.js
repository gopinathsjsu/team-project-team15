import React from 'react';
import Navigation from "../FrameWorkUnity/DynamicNavBar";
import Search from "../FrameWorkUnity/Search";
import Container from "../FrameWorkUnity/Container";
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import { Button } from '@material-ui/core';


const CloseAccountPage = () => {
    return (
        <div >
            <Navigation/>
            <Search/>
            <Container>
                <CloseAccountDetails />
                
            </Container>
        </div>

    );
}


class CloseAccountDetails extends React.Component {
    state={
        username: "",
        email: "",
        password: "",
        flag:false,
    };


    onSubmit =(e) => {

        e.preventDefault();
        console.log("i just submit")
        if (this.state.username == "") {
            alert("Username Can't be Empty")
            return;
        }

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {
            alert("Email Can't be Empty or Invalid Email Format");
            return;
        }

        if (this.state.password == "") {
            alert("Password Can't be Empty")
            return;
        }
        axios.delete("/api/accounts/delete",
            { data:{username: this.state.username,
                          password: this.state.password,
                          email:this.state.email}} )
            .then(response => {
                alert("Your Client has been successfully removed , Sending notification to client via SMS---");
                console.log(response);
                this.setState({flag:true})

            }).catch (error => {
                console.log(error.response.data.msg);
                alert("Failed to Remove the Client, Please check the details again---");// +error.response.data.msg);
            });

    }


    render(){
        console.log("I m in CloseAccountDetails Page")
        console.log(this.state.username);
        console.log(this.state.password);

        if (this.state.flag == true) {
            return (<Redirect to={'/'}/>)
        }

        return (
                <Paper className ="paper" style={paperStyle} >
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 mt-5 mx-auto">
                                <form noValidate onSubmit={this.onSubmit}>
                                    <h1 className="h3 mb-3 font-weight-bold font-weight-normal">Remove The Client</h1>

                                    <div className="form-group">
                                        <label htmlFor="name">Username:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            placeholder="Enter Client Username"
                                            minLength={"1"}
                                            maxLength={"50"}
                                            value={this.state.username}
                                            onChange ={e=>this.setState({username:e.target.value})}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email Address:</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            placeholder="Enter Client Email"
                                            minLength={"7"}
                                            maxLength={"50"}
                                            value={this.state.email}
                                            onChange ={e=>this.setState({email:e.target.value})}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password:</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            placeholder="Enter Password provided by the Client"
                                            minLength={"1"}
                                            maxLength={"50"}
                                            value={this.state.password}
                                            onChange ={e=>this.setState({password:e.target.value})}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-lg btn-primary btn-block"> Submit
                                    </button>
                                    {/* //<link>Back</link> */}
                                    {/* //<link to="/overview">Back</link> */}
                                    <Link to="/manager" >Back</Link>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                </Paper>
        )
    };
}



const paperStyle = {
    height: '100%',
    width:  '100%',
    textAlign:'center',
    margin: 'auto',
    WebkitBorderRadius:'10px 10px 10px 10px',
    fontWeight: 'bold',
    font: 'Helvetica',
};




export default CloseAccountPage;
