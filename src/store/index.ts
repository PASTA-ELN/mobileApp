import { configureStore } from '@reduxjs/toolkit'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { rootReducer } from './reducer'

//
// Create store
//
export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
  }),
  // enhancers: [],
  // preloadedState: {},
});

//
// Infer the `RootState` and `AppDispatch` types from the store itself
//
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//
// Use throughout the app instead of plain `useDispatch` and `useSelector`
//
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
