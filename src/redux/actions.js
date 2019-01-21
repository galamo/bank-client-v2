import { ACTIONS } from "./action.config";

export const accountAdded = newAccount => {
  return {
    type: ACTIONS.ACCOUNT_ADDED,
    newAccount
  };
};

export const getAccountsDone = accounts => {
  return {
    type: ACTIONS.GET_ACCOUNTS_DONE,
    accounts
  };
};

export const getAccounts = (skip, take, sort) => {
  return {
    type: ACTIONS.GET_ACCOUNTS,
    skip,
    take,
    sort
  };
};

export const init = () => {
  return {
    type: ACTIONS.INIT
  };
};

export const deleteAccount = id => {
  return {
    type: ACTIONS.DELETE_ACCOUNT,
    id
  };
};

export const deleteAccountDone = id => {
  return {
    type: ACTIONS.DELETE_ACCOUNT_DONE,
    id
  };
};

export const updateAccount = (accountId, operation, amount) => {
  return {
    type: ACTIONS.UPDATE_ACCOUNT,
    accountId,
    operation,
    amount
  };
};
