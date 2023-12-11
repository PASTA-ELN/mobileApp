import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { Credentials, type CredentialsConfig } from 'types/Credentials'
import { checkCredentials, initDB } from 'utils/DBInteractions'

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
      if(!checkCredentials(arg.credentials)){
        return Promise.reject('Invalid credentials');
      }
      await initDB(arg.credentials);
      return Promise.resolve();
    }
    catch (err) {
      return Promise.reject(err);
    }
  }
);
export const relogin = createAsyncThunk<void, Credentials>(
  'login/relogin',
  async (arg) => {
    //TODO: Try login with saved config on startup
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
    
  }
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
