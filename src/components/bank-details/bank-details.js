import React, { Component } from "react";
import Contact from "./../contact/contact";
import Employees from "./../employess/employees";
import { BrowserRouter, Link, Switch, Route, Redirect } from "react-router-dom";
import History from "../history/history";

export default class BankDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1> BankDetails Page </h1>
        <div>
          <Link to="/bank-details/history"> my history </Link>
          <Link to="/bank-details/employees"> Go to employees Page </Link>
        </div>
        <div>
          <Route
            key="contact"
            path="/bank-details/history"
            component={History}
          />
          <Route
            key="employees"
            path="/bank-details/employees"
            component={Employees}
          />
        </div>
      </div>
    );
  }
}
