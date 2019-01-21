import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import InfiniteScroll from "react-infinite-scroller";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { bankActions } from "../../redux/index";

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

class AccountsPage extends Component {
  constructor(props) {
    super(props);

    this.state = { accounts: [], skip: 0, take: 20, loadMore: true };
    this.getAccountsFilter = this.getAccountsFilter.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let loadMore = true;
    if (nextProps.accounts.length == 0) {
      loadMore = false;
    }
    this.setState({
      ...this.state,
      loadMore,
      skip: nextProps.accounts.length
    });
  }

  componentDidMount() {
    this.props.actions.init();
    this.props.actions.getAccounts(this.state.skip, this.state.take);
  }

  getAccountsFilter(e) {
    this.props.actions.init();
    this.props.actions.getAccounts(
      0,
      this.state.take,
      e.currentTarget.innerText
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div>
            <button
              onClick={this.getAccountsFilter}
              className="btn btn-priamry"
            >
              balance
            </button>
            <button
              onClick={this.getAccountsFilter}
              className="btn btn-priamry"
            >
              createdDate
            </button>
          </div>
          <InfiniteScroll
            loadMore={() => {
              this.props.actions.getAccounts(this.state.skip, this.state.take);
            }}
            initialLoad={false}
            hasMore={this.state.loadMore}
            loader={
              <div className="loader" key={0}>
                Loading ...
              </div>
            }
          >
            <div className="row">
              {this.props.accounts.map((curAccount, index) => {
                return (
                  <div
                    key={index}
                    style={{ display: "inline", margin: "10px" }}
                    className="col-3"
                  >
                    <div
                      style={{
                        border: "1px solid black",
                        borderRadius: "10px",
                        height: "150px",
                        boxShadow: "5px 10px",
                        position: "relative"
                      }}
                    >
                      <button
                        onClick={() => {
                          this.props.actions.deleteAccount(curAccount._id);
                        }}
                        className="btn btn-danger"
                        style={{
                          position: "absolute",
                          top: "0px",
                          right: "0px"
                        }}
                      >
                        X
                      </button>
                      <Link to={`/account/${curAccount._id}`}>
                        <h1> {curAccount._id} </h1>
                      </Link>
                      <div>your balance: {curAccount.balance} </div>
                      <div>
                        your balance:{" "}
                        {new Date(curAccount.createdDate).toLocaleString()}{" "}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </InfiniteScroll>
        </div>
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
        getAccounts: bankActions.getAccounts,
        deleteAccount: bankActions.deleteAccount,
        init: bankActions.init
      },
      dispatch
    )
  };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AccountsPage)
);
