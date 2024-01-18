import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type Log = {
  type: 'error'|'info'|'warn'|'log',
  message: string,
  timestamp: number,
}
type LogState = {
  logs: Log[],
  count: number,
};

const initialState: LogState = {
  logs: [],
  count: 0,
};

const logSlice = createSlice({
  name: 'log',
  initialState,
  reducers: {
    log: (state, action: PayloadAction<Log>) => {
      state.logs.push(action.payload);
      state.count++;
    }
  },
});

export const { log } = logSlice.actions;
export default logSlice.reducer;
