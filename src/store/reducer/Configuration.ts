import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { loadCredentials, saveCredentials } from '../../LocalInteractions';
import { CredentialWithConfigName } from "../../types/Interactions";
import type { ConfigurationState } from "../../types/store";

const initialState: ConfigurationState = {
  allCredentials:[]
}

//slice is using some async logic with the asyncstorage
//TODO test if waiting for storage hurts performance or causes errors
export const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    addCredentials: (state, action: PayloadAction<CredentialWithConfigName>) => {
      state.allCredentials.push(action.payload);
      saveCredentials(state.allCredentials);
    },
    removeCredentials: (state, action: PayloadAction<string>) => {
      if(!state.allCredentials[0])
        return
      state.allCredentials.filter((value) => {
        return value.configName !== action.payload;
      })
      saveCredentials(state.allCredentials);
    },
    loadFromStorage: (state) => {
      loadCredentials()
      .then((res) => {
        state.allCredentials = res;
      })
    }
  }
});

export const { addCredentials, removeCredentials } = configurationSlice.actions;

export default configurationSlice.reducer;
