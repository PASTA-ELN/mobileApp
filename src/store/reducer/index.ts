import { combineReducers } from "redux";

import loginReducer from './Login';
import logReducer from './Log'

export default combineReducers({
  login: loginReducer,
  log: logReducer
})
