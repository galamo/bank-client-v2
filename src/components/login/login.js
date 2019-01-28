import React, { Component } from "react";
import axios from "axios";
// import urls from "client-urls" = { accounts:"/home/accounts" }
const url = "http://localhost:2200/auth/login";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { userName: "", password: "" };
  }

  loginAction = () => {
    axios
      .post(
        url,
        {
          userName: this.state.userName,
          password: this.state.password
        },
        {
          withCredentials: true
        }
      )
      .then(res => {
        localStorage.setItem("session", res.data.key);
        this.props.history.push("/home/accounts");
      });
  };

  setInputs = () => {
    this.setState({});
  };
  render() {
    return (
      <div>
        <h1> Login </h1>

        <span>user name</span>
        <input
          value={this.state.userName}
          onChange={e => {
            this.setState({
              userName: e.currentTarget.value
            });
          }}
        />
        <span>password</span>
        <input
          value={this.state.password}
          onChange={e => {
            this.setState({
              password: e.currentTarget.value
            });
          }}
        />
        <button className="btn btn-primary" onClick={this.loginAction}>
          {" "}
          Login{" "}
        </button>
      </div>
    );
  }
}
