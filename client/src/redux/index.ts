import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

import { rootReducer } from "./reducer";
import { rootEpics } from "./epics";

const epicMiddleware = createEpicMiddleware();
const logger = createLogger({ collapsed: true }); // log every action to see what's happening behind the scenes.
export const history = createBrowserHistory();

const middlewares = [logger, epicMiddleware, routerMiddleware(history)];

export default function initStore(initialState = {}) {
  const store = createStore(
    rootReducer(history),
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  epicMiddleware.run(rootEpics);
  return store;
}
