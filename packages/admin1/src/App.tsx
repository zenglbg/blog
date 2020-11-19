import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { PersistGate } from "redux-persist/integration/react";
import { RouteView } from "./routes/index";
import store, { history, persistor } from "./lib/redux";
import { ConfigProvider } from "antd";
import enGB from "antd/es/locale/en_GB";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <ConfigProvider locale={enGB}>
            <RouteView />
          </ConfigProvider>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
