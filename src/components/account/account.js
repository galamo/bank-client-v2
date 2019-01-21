import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { bankActions } from "../../redux/index";
import axios from "axios";
const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

class Account extends Component {
  constructor(props) {
    super(props);
    const fileName = "debug.log";
    this.state = {
      id: this.props.match.params.id,
      account: null,
      amount: 0,
      download: `http://localhost:2200/operations/export_operations/${fileName}`
    };

    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    axios
      .get(`http://localhost:2200/accounts/${this.state.id}`, {
        withCredentials: true
      })
      .then(response => {
        console.log(response.data);
        this.setState({
          account: response.data
        });
      });
  }

  goBack() {
    console.log(this.props.history);
    this.props.history.push("/accounts");
  }

  render() {
    const { classes } = this.props;
    console.log(this.state.account);
    return (
      <div className="container">
        <div className="row">
          <button onClick={this.goBack} className="btn btn-primary">
            {" "}
            &lt;{" "}
          </button>

          <h2 style={{ background: "lightblue", height: "46" }}>
            Account Id: {this.state.id}
            {this.state.account && (
              <div>
                <div>balance:{this.state.account.balance}</div>
                <div>
                  last updated:
                  {new Date(this.state.account.createdDate).toLocaleString()}
                </div>
              </div>
            )}
            {!this.state.account && <div>loading...</div>}
          </h2>
        </div>
        <br />
        <div className="container">
          <div className="row">
            {" "}
            <TextField
              id="balance"
              name="balance"
              label="balance"
              value={this.state.amount}
              onChange={e => {
                this.setState({
                  amount: e.currentTarget.value
                });
              }}
              margin="normal"
            />
            <button
              onClick={() => {
                this.props.actions.updateAccount(
                  this.state.account._id,
                  "withdrawl",
                  this.state.amount
                );
              }}
              className="btn btn-danger"
            >
              withdrawl
            </button>
            <button
              onClick={() => {
                this.props.actions.updateAccount(
                  this.state.account._id,
                  "deposit",
                  this.state.amount
                );
              }}
              className="btn btn-primary"
            >
              deposit
            </button>
          </div>
        </div>
        <a href={this.state.download}>download log file </a>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts || []
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        updateAccount: bankActions.updateAccount
      },
      dispatch
    )
  };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Account)
);
