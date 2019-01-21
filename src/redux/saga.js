import { takeEvery, fork, call, put } from "redux-saga/effects";
//actions/
import {
  getAccountsDone,
  getAccounts as getAccountFromApi,
  init,
  deleteAccountDone
} from "./actions";
//services/
import {
  getAccountsService,
  delAccountsService,
  updateAccountsService
} from "./services";
import { ACTIONS } from "./action.config";

function* getAccounts(action) {
  try {
    const accounts = yield call(getAccountsService, action);

    yield put(getAccountsDone(accounts));
  } catch (ex) {
    //   todo  yield put error action \ no accounts account
  }
}

function* deleteAccount(action) {
  try {
    const del = yield call(delAccountsService, action);
    yield put(deleteAccountDone(action.id));
    // yield put(init());
    // yield put(getAccountFromApi(0, 20));
  } catch (ex) {
    //   todo  yield put error action \ no accounts account
  }
}

function* updateAccount(action) {
  try {
    const update = yield call(updateAccountsService, action);
    console.log(update);
    //some action!
  } catch (ex) {
    //   todo  yield put error action \ no accounts account
  }
}

function* GetAccounts() {
  console.log("GetAccounts");
  yield takeEvery(ACTIONS.GET_ACCOUNTS, getAccounts);
}

function* GetTransactions() {
  yield takeEvery(ACTIONS.GET_TRANSACTIONS, getAccounts);
}

function* DeleteAccount() {
  yield takeEvery(ACTIONS.DELETE_ACCOUNT, deleteAccount);
}

function* UpdateAccount() {
  yield takeEvery(ACTIONS.UPDATE_ACCOUNT, updateAccount);
}

function* rootSaga() {
  yield [
    fork(GetAccounts),
    fork(GetTransactions),
    fork(DeleteAccount),
    fork(UpdateAccount)
  ];
}

export default rootSaga;
