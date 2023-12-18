import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { Credentials, type CredentialsConfig } from 'types/Credentials'
import { checkCredentials, initDB } from 'utils/DBInteractions'
import { saveCredentials } from 'utils/localInteractions'
import { Toast } from 'utils/toast'

type LoginState = {
  loggedIn: boolean,
  usedConfig: string|null,
  allCredentials: CredentialsConfig[],
}
const initialState: LoginState = {
  loggedIn: false,
  usedConfig: null,
  allCredentials: [],
}

export const login = createAsyncThunk<void, CredentialsConfig>(
  'login/login',
  async (arg) => {
    try {
      await checkCredentials(arg.credentials)
        .catch((err: string) => {
          Toast.error(err);
          return Promise.reject(err);
        });
        
      await initDB(arg.credentials);
      saveCredentials(arg);
      return Promise.resolve();
    }
    catch (err: any) {
      Toast.error(err as string);
      return Promise.reject(err);
    }
  }
);
export const relogin = createAsyncThunk<void, Credentials>(
  'login/relogin',
  async (arg) => {
    try {
      await checkCredentials(arg)
        .catch((err: string) => {
          Toast.error(err);
          return Promise.reject(err);
        });
        
      await initDB(arg);
      return Promise.resolve();
    }
    catch (err: any) {
      Toast.error(err as string);
      return Promise.reject(err);
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
      state.loggedIn = false;
      state.usedConfig = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.loggedIn = true;
      state.usedConfig = action.meta.arg.configName;
    }); 
    builder.addCase(relogin.fulfilled, (state, action) => {
      state.loggedIn = true;
      state.usedConfig = 'default';
    });
  }
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
