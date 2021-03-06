import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import Navigation from "../FrameWorkUnity/DynamicNavBar";
import Search from "../FrameWorkUnity/Search";
import Container from "../FrameWorkUnity/Container";
import InnerNavigationBar from "../FrameWorkUnity/StaticNavBar"
import {connect} from "react-redux";
import ImageUpLoader from "../FrameWorkUnity/ImageUpLoader/ImageUpLoader"
import {imageUpLoadAction_Clean} from "../../actions/ImageUpLoadAction/ImageUpLoadAction_Check";
import axios from "axios";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import * as ACTION from "../../static/action_type";
import {uploadImageOff} from "../../actions/MyUpLoadImageAction/MyUpLoadImageAction";
import cards from '../../images/Deposit.png';
const styles = theme => ({
    button: {
        margin: theme.spacing.unit * 3,
        width: 'auto',
    },
    root: {
        width: '100%',
    },
    bgDiv: {
        position: 'flex',
        outline: 'none',
        textAlign: 'center',
    },
    top:{
        position: 'flex',
        font: 'Helvetica',
        marginBottom: theme.spacing.unit * 5,
        width: '100%',
        height: theme.spacing.unit * 60,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        textAlign: 'center',
        WebkitBorderRadius:'10px 10px 10px 10px',
    },
    bottom:{
        position: 'flex',
        font: 'Helvetica',
        marginBottom: theme.spacing.unit * 5,
        width: '100%',
        height: theme.spacing.unit * 60,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        textAlign: 'center',
        WebkitBorderRadius:'10px 10px 10px 10px',
    }
});

class DepositPage extends React.Component{
    state = {
        payAmount: "",
        AccountNumber :"You need to select a checking/saving account",
        open : false,
    };

    componentDidMount() {
    }


    onSubmit =(e) => {
        e.preventDefault();

        if(this.state.payAmount <= 0 || this.state.payAmount == "Please Enter Your Amount") {
            alert("Amount Can't be 0 or Negative, Please Try Again");
            return
        }

        if(this.props.myImage.check === "") {
            alert("The Check Image at Deposit to Checking Can't be Empty")
            return
        }



        console.log('it just submit');
        console.log(e);
        console.log(this.state.payAmount);
        console.log(this.props);

        const req_headers = {Authorization: 'Bearer ' + this.props.myKey}


        let formData = new FormData();

        formData.append("image", this.props.myImage.check);
        formData.append("account", this.state.AccountNumber);
        formData.append("amount", parseFloat(this.state.payAmount));

        axios.post('api/deposit/check', formData, {headers: req_headers}
        ).then(response => {
           console.log(response);
            alert("Account Deposit Succeeded---");
        }).catch(error => {
            console.log(error.response);
            alert("Account Deposit Failed---");//+error.response.data.msg);
        });

        this.setState({payAmount: "Please Enter Your Amount"})
        this.props.imageUpLoadAction_Clean()
        this.props.uploadImageOff();
    }


    selectAccountOne = (event) =>{
        const labelFrom = document.getElementById('firstLabel');
        labelFrom.innerHTML = event.currentTarget.innerHTML;
        this.setState({open: false});
    };


    panOneHandler = () =>{
        if(this.state.open){
            this.setState({open: false});
        }
        else{
            this.setState({open: true});
        }
    };


    renderAccountOne() {
        const { classes } = this.props;
        if (this.props.myInfo !== " ") {
            return this.props.myInfo.accounts.map(account => {
                if (account.type !== ACTION.CREDIT ) {
                    return (
                        <ExpansionPanelDetails onClick={(e)=>{this.selectAccountOne(e);
                            this.setState({AccountNumber: account.account_number});}}>

                            <Button className={classes.button}>
                                {account.alias}: {account.account_number} --(Type: {account.type})</Button>
                        </ExpansionPanelDetails>

                    );
                }

            });
        }
        else { return (<div/>);}
    }

    render() {
        const {classes} = this.props;
        return (
            <div >
                <Navigation/>
                <Search/>
                <Container>
                    <InnerNavigationBar active={activeElement}/>
                    <div className={classes.bgDiv}>
                        <div className={classes.top}>
                        <img src={cards} alt="card" height="100px"/>    
                            <div style={{float: 'left', width:"60%"}}>
                              <Typography variant="h4" color="Navy"><strong>Deposit to Account</strong></Typography>
                                <Typography variant="subtitle2">Account: { this.state.AccountNumber}</Typography>
                            </div>
                            <div style={{float: 'right', width:"30%"}}>
                                <form onSubmit={this.onSubmit}>
                                <Typography variant="h6">Amount:</Typography>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="amount"
                                    step="0.01"
                                    placeholder= "$ Enter Your Amount"
                                    min="0"
                                    max="1000000"
                                    maxLength={"7"}
                                    value = {this.state.payAmount}
                                    onChange ={e=>this.setState({payAmount:e.target.value})}
                                />
                                    <hr/>
                                    <Typography variant="h6">Select Account:</Typography>

                                    <ExpansionPanel expanded={this.state.open}>
                                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} onClick={this.panOneHandler}>
                                            <Typography className={classes.heading} id="firstLabel">Select Account</Typography>
                                        </ExpansionPanelSummary>
                                        {this.renderAccountOne()}

                                    </ExpansionPanel>
                                <Button
                                    className={classes.button}
                                    type = "submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Submit
                                </Button>
                                </form>
                            </div>
                                <div style={{float: 'left', width:"50%"}}>
                                    <ImageUpLoader checkType = {ACTION.CHECKING}/>
                                </div>
                        </div>
                    </div>
                </Container>
            </div>

        );
    }
}

const activeElement = {
    act1: "nav-link ",
    act2: "nav-link ",
    act3: "nav-link ",
    act4: "nav-link active",
    act5: "nav-link",
    act6: "nav-link",
    act7: "nav-link",
}

DepositPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    console.log("I'm in map State to Props");
    console.log(state);
    return state;
}


export default connect(mapStateToProps,{uploadImageOff,imageUpLoadAction_Clean})(withStyles(styles)(DepositPage));