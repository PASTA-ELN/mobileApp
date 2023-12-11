import { combineReducers } from '@reduxjs/toolkit'

import LogReducer from './Log'
import LoginReducer from './Login'

export const rootReducer = combineReducers({
  Log: LogReducer,
  Login: LoginReducer,
});
