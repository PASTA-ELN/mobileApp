import { combineReducers } from "redux";

import loginReducer from './Login';
import configurationReducer from "./Configuration";

export default combineReducers({
  login: loginReducer,
  configuration: configurationReducer 
})
