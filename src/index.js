import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";

import { createStore, applyMiddleware } from "redux";
import reducers from "./redux/reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./redux/saga";
import axios from "axios";

axios.interceptors.request.use(req => {
  console.log("middlewareclient", req);
  req.headers.Authorization = localStorage.getItem("session");
  return req;
});

let sagaMiddleware = createSagaMiddleware();
let _store = createStore(
  reducers,
  { accounts: [] },
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={_store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
