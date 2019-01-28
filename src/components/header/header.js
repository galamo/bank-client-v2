import React, { Component } from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { BrowserRouter, Link, Switch, Route, Redirect } from "react-router-dom";
import { MenuItem, Navbar, Nav, NavItem } from "react-bootstrap";

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <h1>BankApp</h1>
            </Navbar.Brand>
            <Navbar.Brand>
              <Link to="/home/accounts"> Accounts </Link>
            </Navbar.Brand>
            <Navbar.Brand>
              <Link to="/home/bank-details"> Bank </Link>
            </Navbar.Brand>
            <Navbar.Brand>
              <Link to="/home/add-account"> Add New Account </Link>
            </Navbar.Brand>

            <Navbar.Brand>
              <Link
                to="/login"
                onClick={() => {
                  localStorage.clear();
                }}
              >
                {" "}
                Logout{" "}
              </Link>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
      </div>
    );
  }
}
