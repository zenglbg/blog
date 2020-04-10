import "./index.less";
import "./assets/root.less";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router } from "react-router-dom";
import RouteView from "./routes/index";
import store, { history, persistor } from "./redux";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import enGB from "antd/es/locale/en_GB";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* <Router>
        <RouteView />
      </Router> */}
      <ConnectedRouter history={history}>
        <ConfigProvider locale={enGB}>
          <RouteView />
        </ConfigProvider>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
