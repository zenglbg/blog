import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { PersistGate } from "redux-persist/integration/react";
import { Router } from "react-router-dom";
import { RouteView } from "./routes/index";
import store, { history } from "./lib/redux";
// import store, { history, persistor } from "./lib/redux";
import { ConfigProvider } from "antd";
import enGB from "antd/es/locale/en_GB";

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <ConfigProvider locale={enGB}>
          <RouteView />
        </ConfigProvider>
      </Router>
    </Provider>
  );
}

export default App;
