import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nuke } from "../../DBInteractions";
import { saveCredentials } from "../../LocalInteractions";

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
      saveCredentials(action.payload);
      state.loggedIn = true;
      state.usedConfigName = action.payload.configname
      state.usedConfig = action.payload.credentials;
    },
    logOut: (state) => {
      state.loggedIn = false;
      state.usedConfigName = undefined;
      state.usedConfig = undefined;
      nuke();
    },
    reLogIn: (state, action: PayloadAction<CredentialWithConfigName>) => {
      //TODO kind  of dispatch logIn again
    }
  }
});

export const { logIn, logOut, reLogIn } = loginSlice.actions;
export default loginSlice.reducer;
