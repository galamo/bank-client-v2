import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { BrowserRouter, Link, Switch, Route, Redirect } from "react-router-dom";
import AccountsPage from "./components/account/accounts-page";
import BankDetails from "./components/bank-details/bank-details";
import addAccount from "./components/account/add-account";
import Header from "./components/header/header";
import Account from "./components/account/account";
import Snackbar from "@material-ui/core/Snackbar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAccounts } from "./redux/actions";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { sb_status: false };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      sb_status: nextProps.snackBarStatus || false
    });
  }
  componentDidMount() {
   
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <div />
          <div>
            <Switch>
              <Route key="accounts" path="/accounts" component={AccountsPage} />
              <Route
                key="bank-details"
                path="/bank-details"
                component={BankDetails}
              />
              <Route
                key="add-account"
                path="/add-account"
                component={addAccount}
              />
              <Route
                key="account"
                exact={true}
                path="/account/:id"
                component={Account}
              />
              <Redirect from="/" to="/account" />
            </Switch>
          </div>
          <Snackbar 
            onClose={() => {
              this.setState({
                sb_status: false
              });
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={this.state.sb_status}
            autoHideDuration={2000}
            message={<span id="message-id">{this.props.message}</span>}
          />
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    snackBarStatus: state.snackBarStatus,
    message: state.message
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        getAccounts: getAccounts
      },
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
