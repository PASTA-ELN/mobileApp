import { AnyAction, configureStore, EnhancedStore, ThunkMiddleware } from '@reduxjs/toolkit';

import reducer from './reducer';
import type { InitialState } from '../types/store';


export const store: EnhancedStore<InitialState, AnyAction, [ThunkMiddleware<InitialState, AnyAction, undefined>]> = configureStore({
    reducer: reducer
  });


//function to make dispatch calls easier
export type AppDispatch = typeof store.dispatch;

export const dispatch: AppDispatch = (action: any) => store.dispatch(action);
