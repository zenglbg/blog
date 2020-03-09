import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { PersistGate } from "redux-persist/integration/react";

import RouteView from "./routes";
import store, { history } from "./redux";
import "./index.less";

ReactDOM.render(
  <Provider store={store().store}>
    <PersistGate loading={null} persistor={store().persistor}>
      <ConnectedRouter history={history}>
        <RouteView />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
