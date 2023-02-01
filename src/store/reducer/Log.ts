import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import type { LogState, Log } from "../../types/store"

const initialState: LogState = {
  logs: [],
  count: 0
}

const logSlice = createSlice({
  name: 'log',
  initialState,
  reducers: {
    log: (state, action: PayloadAction<Log>) => {
      state.count ++;
      state.logs.push(action.payload);

      return state;
    }
  }
})

export const { log } = logSlice.actions;
export default logSlice.reducer;
