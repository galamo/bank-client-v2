import React, { Component } from "react";
import Header from "../header/header";
import accountsPage from "../account/accounts-page";
import { BrowserRouter, Link, Switch, Route, Redirect } from "react-router-dom";
import History from "./../history/history";
import axios from "axios";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { isLoggedIn: true };
  }

  componentDidMount() {
    this.mount = true;
    return axios.get(`http://localhost:2200/auth/verify`).then(
      response => {
        this.setState({ isLoggedIn: true });
      },
      err => {
        this.setState({ isLoggedIn: false });
      }
    );
  }

  componentWillUnmount() {}

  render() {
    return (
      <div>
        {!this.state.isLoggedIn && (
          <div>
            <Redirect to="/login" />
          </div>
        )}
        {this.state.isLoggedIn && (
          <div>
            <h1>All application </h1>
            <Header />

            <div>
              <Route
                key="accounts"
                path="/home/accounts"
                component={accountsPage}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}
