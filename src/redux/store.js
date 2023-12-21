import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import groupReducer from "./groupReducer";

const rootReducer = combineReducers({
  userReducer,
  groupReducer,
});

export const Store = createStore(rootReducer, applyMiddleware(thunk));
