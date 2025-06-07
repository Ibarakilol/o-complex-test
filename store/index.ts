import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import cartReducer from './cart-slice';
import modalReducer from './modal-slice';

import { oComplexApi } from '@/services';

export const makeStore = () =>
  configureStore({
    reducer: {
      [oComplexApi.reducerPath]: oComplexApi.reducer,
      cart: cartReducer,
      modal: modalReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(oComplexApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

setupListeners(makeStore().dispatch);
