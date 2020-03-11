import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import { rootReducer } from "./reducer";
import { rootEpics } from "./epics";

const epicMiddleware = createEpicMiddleware();
const logger = createLogger({ collapsed: true }); // log every action to see what's happening behind the scenes.
const history = createBrowserHistory();
const persistConfig = {
  key: "root",
  storage
};
const persistedReducer = persistReducer(persistConfig, rootReducer(history));

const middlewares = [logger, epicMiddleware, routerMiddleware(history)];
const initialState = {};

const store = createStore(
  persistedReducer,
  // rootReducer(history),
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);
let persistor = persistStore(store);

epicMiddleware.run(rootEpics);
export { store as default, history, persistor };
// return { store, persistor };
