import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { createLogger } from "redux-logger";

import { rootReducer } from "./reducer";
import { rootEpics } from "./epics";

const epicMiddleware = createEpicMiddleware();
const logger = createLogger({ collapsed: true }); // log every action to see what's happening behind the scenes.

const middlewares = [epicMiddleware, logger];

export default function initStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );

  epicMiddleware.run(rootEpics);
  return store;
}
