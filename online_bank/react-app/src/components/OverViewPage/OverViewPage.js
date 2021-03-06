import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import {Link}from "react-router-dom";
import Navigation from "../FrameWorkUnity/DynamicNavBar";
import Search from "../FrameWorkUnity/Search";
import Container from "../FrameWorkUnity/Container";
import InnerNavigationBar from "../FrameWorkUnity/StaticNavBar"
import {connect} from "react-redux";
import axios from "axios";
import { getProfile } from "../../actions/GetProfileAction/getProfileAction";
import {accountDetailAction} from "../../actions/AccountDetailsAction/accountDetailsAction";
import AddAccountBar from "../FrameWorkUnity/AddAccountBar/AddAccountBar";


const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    margin: {
        margin: theme.spacing.unit,
    },
});

class OverViewPage extends React.Component{
    state={ };


    componentDidMount() {
        console.log("OverVIew Component Did Mount")
        const req_headers = {Authorization: 'Bearer ' + this.props.myKey}

        axios.get("/api/client/all",{headers: req_headers})
             .then(response => {
                console.log(response);
                this.props.getProfile(response.data);
            }).catch (error => console.log(error.response.data.msg));

    }

    renderAccount() {
        const { classes } = this.props;
        if (this.props.myInfo !== " ") {
            return this.props.myInfo.accounts.map(account => {
                return (
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography
                                className={classes.heading}><strong> {account.alias} : {account.account_number} --(Account Type: {account.type})</strong>
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div style={{width: '90%'}}>

                                <Typography style={{float: 'left'}}>

                                    <strong> Balance: </strong> ${ account.type =="credit" ? account.balance *-1 : account.balance}
                                </Typography>
                                <Link to="/overview/account_detail"
                                      onClick={() => this.props.accountDetailAction(account)}>
                                    <Button style={{float: 'right'}} variant="outlined" size="medium" color="primary"
                                            className={classes.margin}>Transactions</Button>
                                </Link>
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                );
            });
        }else { return (<div/>);}

    }


    render() {
        const { classes } = this.props;
        console.log("I am in overview page");
        console.log(this.props.myInfo);

        return (
            <div >
                <Navigation/>
                <Search/>
                <Container>
                    <div class="row">
                    <InnerNavigationBar active ={activeElement}/>
                    {/* <AddAccountBar/> */}
                    </div>
                    <div className={classes.root}>
                        {this.renderAccount()}
                    </div>
                </Container>
            </div>

        );
    }
}


const activeElement = {
    act1: "nav-link active",
    act2: "nav-link ",
    act3: "nav-link ",
    act4: "nav-link ",
    act5: "nav-link ",
    act6: "nav-link ",
    act7: "nav-link ",
}

OverViewPage.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
    return state;
}




export default connect(mapStateToProps,{getProfile,accountDetailAction}) (withStyles(styles)(OverViewPage));

