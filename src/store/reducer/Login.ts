import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { nuke, testCredentials, initDB } from "../../DBInteractions";
import { newLogin } from '../../LocalInteractions'

import type { CredentialWithConfigName } from "../../types/Interactions";
import type { LoginState } from "../../types/store";

const initialState: LoginState = {
  loggedIn: false,
  usedConfigName: undefined,
  allCredentials: []
}

export const login = createAsyncThunk<string, CredentialWithConfigName>(
  'login/login',
  async (credential: CredentialWithConfigName): Promise<string> => {
    const valid = await testCredentials(credential.credentials);

    if(valid !== 'success'){
      return Promise.resolve(valid);
    }

    await initDB(credential.credentials);
    return Promise.resolve('success');
  }
)

export const relogin = createAsyncThunk(
  'login/relogin',
  async () => {

  }
)

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logOut: (state) => {
      state.loggedIn = false;
      state.usedConfigName = undefined;
      nuke();
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if(action.payload === 'success'){
        state.loggedIn = true;
        state.usedConfigName = action.meta.arg.configname;
        state.allCredentials.push(action.meta.arg);

        newLogin(action.meta.arg);
      }
    })

    builder.addCase(relogin.fulfilled, (state, action) => {

    })
  }
});

export const { logOut } = loginSlice.actions;
export default loginSlice.reducer;
