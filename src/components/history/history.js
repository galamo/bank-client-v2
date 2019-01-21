import React, { Component } from "react";
import Contact from "./../contact/contact";
import Employees from "./../employess/employees";
import { BrowserRouter, Link, Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";

const mainUrl = "http://localhost:2200/config";

export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = { history: [] };
  }

  componentDidMount() {
    axios
      .get(`${mainUrl}/history`, {
        withCredentials: true
      })
      .then(response => {
        this.setState({
          history: response.data
        });
      });
  }
  render() {
    return (
      <div>
        <h1>My History </h1>
        <div>
          <ul>
            {/* {JSON.stringify(this.state.history)} */}
            {this.state.history.map(historyid => {
              return <li> {historyid}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}
