import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

import Navigation from "../FrameWorkUnity/DynamicNavBar";
import Search from "../FrameWorkUnity/Search";
import Container from "../FrameWorkUnity/Container";
import InnerNavigationBar from "../FrameWorkUnity/StaticNavBar"
import { connect } from "react-redux";
import axios from "axios";
import { getProfile } from "../../actions/GetProfileAction/getProfileAction";
import { accountDetailAction } from "../../actions/AccountDetailsAction/accountDetailsAction";
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

class QueryResultPage extends React.Component {
    state = {};


    componentDidMount() {

    }

    renderUser() {
        const { classes } = this.props;

        return this.props.queryResult.map(client => {
            return (
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography
                            className={classes.heading}><strong> Name: {client.first_name} {client.last_name} </strong>
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div style={{ width: '90%' }}>
                            <Typography style={{ float: 'left' }}>
                                <strong>Username: </strong>{client.username}
                                <br />
                                <strong>Email: </strong>{client.email}
                                <br />
                                {this.renderAccount(client.accounts)}
                            </Typography>
                            <Link to="/addAccount"
                                onClick={() => this.props.accountDetailAction(client)}>
                                <Button variant="outlined" size="medium" color="primary"
                                    className={classes.margin}>Add Account</Button>
                            </Link>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            );
        });
    }

    renderAccount(props) {
        const { classes } = this.props;

        return props.map(account => {
            return (
                <ExpansionPanel style={{ width: '150%' }}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography
                            className={classes.heading}><strong>  {account.alias}: {account.account_number}  </strong>
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div style={{ width: '100%' }}>
                            <Typography style={{ float: 'left' }}>
                                <br />
                                <strong>Balance: </strong>${account.balance}
                                <br />
                                <strong>Type: </strong>{account.type}
                                <br />
                                <strong>Active</strong>{account.active}
                            </Typography>

                            <Link to="/overview/account_detail"
                                onClick={() => this.props.accountDetailAction(account)}>
                                <Button style={{ float: 'right' }} variant="outlined" size="medium" color="primary"
                                    className={classes.margin}>Transactions</Button>
                            </Link>
                            <Link to={`/transfer/outerTransfer`}
                                onClick={() => this.props.accountDetailAction(account)}>
                                <Button style={{ float: 'right' }} variant="outlined" size="medium" color="primary"
                                    className={classes.margin}>Refund</Button>
                            </Link>
                            <Link to={`/removeSingleAccount`}
                                onClick={() => this.props.accountDetailAction(account)}>
                                <Button style={{ float: 'right' }} variant="outlined" size="medium" color="primary"
                                    className={classes.margin}>Close Account</Button>
                            </Link>
                        </div>
                    </ExpansionPanelDetails>
                    {/* <li className="nav-item">
                        <Link className={this.props.active.act6} to="/closeAcc">Close Account</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={this.props.active.act6} to="/closeAcc">Add Account</Link>
                    </li> */}
                </ExpansionPanel>
            );
        });
    }


    render() {
        const { classes } = this.props;
        console.log("I am in Overview Page");
        console.log(this.props);

        return (
            <div>
                <Navigation />
                <Search />
                <Container>
                    <InnerNavigationBar active={activeElement} />
                    <div className={classes.root}>
                        {this.renderUser()}
                    </div>
                </Container>
            </div>

        );
    }
}



const activeElement = {
    act1: "nav-link",
    act2: "nav-link active",
    act5: "nav-link ",
    act6: "nav-link ",
    act7: "nav-link ",
}

QueryResultPage.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
    return state;
}


export default connect(mapStateToProps, { getProfile, accountDetailAction })(withStyles(styles)(QueryResultPage));

