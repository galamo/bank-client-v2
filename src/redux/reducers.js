import { ACTIONS } from "./action.config";

export default function reducers(state = {}, action) {
  switch (action.type) {
    case ACTIONS.INIT: {
      return {
        accounts: [],
        snackBarStatus: false,
        message: ""
      };
    }
    case ACTIONS.ACCOUNT_ADDED: {
      return {
        ...state,
        snackBarStatus: true,
        message: `account ${action.newAccount.id} added`
      };
    }
    case ACTIONS.DELETE_ACCOUNT_DONE: {
      const deletedId = action.id;
      let currentAccountsArray = [...state.accounts];
      let found = currentAccountsArray.findIndex((account, index) => {
        return account._id == deletedId;
      });
      if (found) {
        currentAccountsArray.splice(found, 1);
      }

      return {
        ...state,
        accounts: currentAccountsArray
      };
    }

    case ACTIONS.GET_ACCOUNTS_DONE: {
      let accounts = [];

      accounts = state.accounts.concat(action.accounts);

      return {
        ...state,
        accounts: accounts
      };
    }

    default:
      return state;
  }
}
