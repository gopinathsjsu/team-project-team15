import React from 'react';
import PropTypes from "prop-types";
import Navigation from "../FrameWorkUnity/DynamicNavBar";
import Search from "../FrameWorkUnity/Search";
import Container from "../FrameWorkUnity/Container";
import InnerNavigationBar from "../FrameWorkUnity/StaticNavBar"
import { connect } from "react-redux";
import { fade } from '@material-ui/core/styles/colorManipulator';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import * as ACTION from "../../static/action_type";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import axios from "axios";

class AccountDetails extends React.Component {

    state = {
        myCurrentAccount: "",
        search_value: ""
    };

    componentDidMount() {
        this.setState({ myCurrentAccount: this.props.myDetail })
    }


    renderList() {
        var compareDate = new Date();
        compareDate.setMonth(compareDate.getMonth() - 18);
        console.log("FROM ACCOUNT DETAILS ZEEL");
        return this.state.myCurrentAccount.transactions.map(post => {
            //add 18 month logic here
            console.log(post.time);
            var date = new Date(post.time);
            console.log(compareDate);
            console.log(date);
            console.log(compareDate < date);
            console.log(this.state.search_value);
            var searchable_string = post.description + " " + post.time + " " + post.amount;
            console.log(searchable_string);
            if (compareDate < date &&
                (this.state.search_value == "" ||
                    searchable_string.toLowerCase().indexOf(this.state.search_value.toLowerCase()) != -1)) {
                return (
                    <div className="item" key={post.time}>
                        <i className="large left aligned icon user" />
                        <div className="content">
                            <div className="description">
                                <body style={{ textAlign: 'center' }}><strong>Amount: </strong> {post.amount} | <span />
                                    <strong>Type: </strong>{post.description} | <span />
                                    <strong>Time: </strong>{post.time}</body>
                            </div>
                        </div>
                    </div>
                );
            }
        });
    }

    searchTransaction() {
        console.log(this.state.myCurrentAccount.transactions);
        this.state.myCurrentAccount.transactions = [];
        this.renderList();
    }

    render() {
        console.log("I am in AccountDetails");
        console.log(this.props.myDetail);
        console.log(this.state.myCurrentAccount);


        if ((this.state.myCurrentAccount !== "" && this.props.userType == ACTION.CLIENT)) {

            return (
                <div>
                    <Navigation />
                    <Search />
                    <Container>
                        <InnerNavigationBar active={activeElement} />
                        <Paper className="paper" style={detailStyle}>
                            <h3>{this.state.myCurrentAccount.alias} Details </h3>
                            <AppBar position="static">
                                <Toolbar>
                                    {/* <div className={this.grow} /> */}
                                    <div className={this.search} style={{ width: '150%' }}>
                                        <InputBase
                                            placeholder="Search…"
                                            classes={{
                                                root: this.inputRoot,
                                                input: this.inputInput
                                            }} style={{ float: 'left' }}
                                            value={this.state.search_value}
                                            onChange={e => this.setState({ search_value: e.target.value })}
                                        />
                                        <div className={this.searchIcon} style={{ float: 'right' }}>
                                            <SearchIcon onClick={() => {
                                                console.log("Search button clicked");
                                                this.searchTransaction();
                                            }} />
                                        </div>
                                    </div>
                                </Toolbar>
                            </AppBar>
                            <div>
                                {this.renderList()}
                            </div>
                        </Paper>
                    </Container>

                </div>
            );
        } else if ((this.state.myCurrentAccount !== "" && this.props.userType === ACTION.MANAGER)) {
            return (
                <div>
                    <Navigation />
                    <Search />
                    <Container>
                        <InnerNavigationBar active={activeElement} />
                        <Paper className="paper" style={detailStyle}>
                            <h1>{this.state.myCurrentAccount.alias} Details </h1>
                            <AppBar position="static">
                                <Toolbar>
                                    {/* <div className={this.grow} /> */}
                                    <div className={this.search} style={{ width: '150%' }}>
                                        <InputBase
                                            placeholder="Search…"
                                            classes={{
                                                root: this.inputRoot,
                                                input: this.inputInput
                                            }} style={{ float: 'left' }}
                                            value={this.state.search_value}
                                            onChange={e => this.setState({ search_value: e.target.value })}
                                        />
                                        <div className={this.searchIcon} style={{ float: 'right' }}>
                                            <SearchIcon onClick={() => {
                                                console.log("Search button clicked");
                                                this.searchTransaction();
                                            }} />
                                        </div>
                                    </div>
                                </Toolbar>
                            </AppBar>
                            <div>
                                {this.renderList()}
                            </div>
                        </Paper>
                    </Container>

                </div>
            );
        } else {
            return (<div />);
        }


    }


}

const activeElement = {
    act1: "nav-link ",
    act2: "nav-link ",
    act3: "nav-link ",
    act4: "nav-link ",
    act5: "nav-link ",
    act6: "nav-link ",
    act7: "nav-link ",
}


const detailStyle = {
    height: 'auto',
    width: '100%',
    fontWeight: 'bold',
    WebkitBorderRadius: '10px 10px 10px 10px',
    textAlign: 'center',
    font: 'Helvetica',
    margin: 'auto',

};

const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        padding: 10,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
});

AccountDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
    console.log("I'm in map State to Props");
    console.log(state);
    return state;
}


export default connect(mapStateToProps)(AccountDetails);
