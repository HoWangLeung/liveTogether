import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import groupReducer from "./groupReducer";
import profileScreenReducer from './profileScreenReducer';
import taskReducer from './taskReducer';

const rootReducer = combineReducers({
  userReducer,
  groupReducer,
  profileScreenReducer,
  taskReducer
});

export const Store = createStore(rootReducer, applyMiddleware(thunk));
