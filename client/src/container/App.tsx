import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import RouteView from "../routes";
import store from "../redux";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <Provider store={store()}>
        <Router>
          <RouteView />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
