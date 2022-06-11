import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CredentialWithConfigName } from "../../types/Interactions";
import type { LoginState } from "../../types/store";

const initialState: LoginState = {
  loggedIn: false,
  usedConfigName: undefined,
  usedConfig: undefined
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<CredentialWithConfigName>) => {
      state.loggedIn = true;
      state.usedConfigName = action.payload.configName
      state.usedConfig = action.payload.credential;
    },
    logOut: (state) => {
      state = initialState;
      //TODO cleanup on logOut
    },
    reLogIn: (state, action: PayloadAction<CredentialWithConfigName>) => {
      //TODO kind  of dispatch logIn again
    }
  }
});

export const { logIn, logOut, reLogIn } = loginSlice.actions;
export default loginSlice.reducer;
