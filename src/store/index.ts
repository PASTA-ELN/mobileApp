import { AnyAction, configureStore, Store } from '@reduxjs/toolkit';

import reducer from './reducer';
import type { InitialState } from '../types/store';

let store: Store<InitialState>|null = null;

export function makestore(): Store<InitialState>{
  store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: { warnAfter: 128 }
      })
      .concat()
  });

  return store;
}

//function to make dispatch calls easier
export const dispatch = (action: AnyAction) => store?.dispatch(action)
