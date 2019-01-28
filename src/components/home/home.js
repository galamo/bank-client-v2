import React, { Component } from "react";
import Header from "../header/header";
import accountsPage from "../account/accounts-page";
import { BrowserRouter, Link, Switch, Route, Redirect } from "react-router-dom";

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
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
    );
  }
}
