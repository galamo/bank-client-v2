import axios from "axios";
const mainUrl = "http://localhost:2200/accounts";
export const getAccountsService = async action => {
  let accounts = await getAccounts(action);
  console.log(accounts);
  return accounts;
};
//er
const getAccounts = action => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${mainUrl}/${action.skip}/${action.take}/${action.sort}`, {
        withCredentials: true
      })
      .then(response => {
        resolve(response.data);
      });
  });
};

export const delAccountsService = async action => {
  let result = await deleteById(action.id);
  return result;
};
//comment
const deleteById = id => {
  return new Promise((resolve, reject) => {
    axios.delete(`${mainUrl}/${id}`).then(response => {
      resolve(response);
    });
  });
};

export const updateAccountsService = async action => {
  let result = await updateById(
    action.accountId,
    action.operation,
    action.amount
  );
  return result;
};

const updateById = (accountId, operation, amount) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${mainUrl}`, {
        accountId,
        operation,
        amount
      })
      .then(response => {
        resolve(response);
      });
  });
};
