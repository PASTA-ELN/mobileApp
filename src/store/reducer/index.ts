import { combineReducers } from "redux";

import loginReducer from './Login';

export default combineReducers({
  login: loginReducer,
})
