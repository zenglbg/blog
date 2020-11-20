import { createStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { rootReducer } from "@reducer";
import { rootEpics } from "../redux/epics";

const epicMiddleware = createEpicMiddleware();
const history = createBrowserHistory();
const middlewares = [
  // epicMiddleware,
  routerMiddleware(history),
  epicMiddleware,
  createLogger({
    // log every action to see what's happening behind the scenes.
    predicate: () => process.env.REACT_APP_ENV === "development",
    collapsed: true,
  }),
];

const persistConfig: PersistConfig<any> = {
  key: "root",
  storage,
  // blacklist: ['router'],
  // whitelist: ["user", "article", "page"],
};
// const persistedReducer = persistReducer(persistConfig, rootReducer(history));
const initialState = {};
const store = createStore(
  // persistedReducer,
  rootReducer(history),
  initialState,
  // compose(applyMiddleware(...middlewares))
  composeWithDevTools(applyMiddleware(...middlewares))
);
// let persistor = persistStore(store);
epicMiddleware.run(rootEpics);
// export { store as default, history, persistor };
export { store as default, history };
