import React, { Component } from "react";
import { BrowserRouter, Link, Switch, Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router-dom";
import { Account } from "../../models/account";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { accountAdded } from "../../redux/actions";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  }
});
class AddAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentAccount: {
        accountId: "",
        accountNumber: "",
        accountOwner: "",
        accountBalance: 0
      },
      resultMessage: "",
      isModalOpened: false
    };
    //resultMessage
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleInputChange = e => {
    let currentAccount = {
      ...this.state.currentAccount,
      [e.currentTarget.name]: e.target.value
    };
    this.setState(prevState => ({
      currentAccount
    }));
  };

  handleClose = () => {
    this.setState(prevState => ({
      isModalOpened: false
    }));
    this.props.history.push("/account");
  };

  createAccount = () => {
    let account = new Account(
      this.state.currentAccount.accountId,
      this.state.currentAccount.accountNumber,
      this.state.currentAccount.accountOwner,
      this.state.currentAccount.accountBalance,
      "personal"
    );

    this.props.actions.addingAccount(account);
    fetch("http://localhost:2200/accounts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(account)
    })
      .then(result => {
        return result.json();
      })
      .then(result => {
        this.setState({
          isModalOpened: true,
          resultMessage: result.message
        });
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <h2> Add New Account </h2>

        <TextField
          id="accountId"
          name="accountId"
          label="accountId"
          className={classes.textField}
          value={this.state.accountId}
          onChange={this.handleInputChange}
          margin="normal"
        />
        <br />
        <TextField
          id="accountNumber"
          label="accountNumber"
          name="accountNumber"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleInputChange}
          margin="normal"
        />
        <br />
        <TextField
          id="accountOwner"
          label="accountOwner"
          name="accountOwner"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleInputChange}
          margin="normal"
        />
        <br />
        <TextField
          id="accountBalance"
          label="accountBalance"
          name="accountBalance"
          type="number"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleInputChange}
          margin="normal"
        />
        <br />

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.createAccount}
        >
          create Account
        </Button>

        <Dialog
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          open={this.state.isModalOpened}
        >
          <DialogTitle id="simple-dialog-title">
            {this.state.resultMessage}
          </DialogTitle>
          <div />
        </Dialog>
      </div>
    );
  }
}

AddAccount.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    snackBarStatus: state.snackBarStatus
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        addingAccount: accountAdded
      },
      dispatch
    )
  };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddAccount)
);

//connect(mapstatetoprops,mapdispatchtoprops)(ComponentClassName)
