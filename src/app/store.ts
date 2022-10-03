/* eslint-disable no-param-reassign */
import { configureStore, ThunkAction, Action, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { currencyApi } from 'app/api';

interface CurrencyState {
  base: string;
  from: string;
  to: string;
  count: number;
  logoAction: boolean;
}

const initialState: CurrencyState = {
  base: 'USD',
  from: 'USD',
  to: 'EUR',
  count: 1,
  logoAction: false,
};
const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    baseUpdate: (state, action: PayloadAction<string>) => {
      state.base = action.payload;
    },
    fromUpdate: (state, action: PayloadAction<string>) => {
      state.from = action.payload;
    },
    toUpdate: (state, action: PayloadAction<string>) => {
      state.to = action.payload;
    },
    countUpdate: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    logoActionUpdate: (state, action: PayloadAction<boolean>) => {
      state.logoAction = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
    currency: currencySlice.reducer,
    [currencyApi.reducerPath]: currencyApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(currencyApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export const { baseUpdate, fromUpdate, toUpdate, countUpdate, logoActionUpdate } = currencySlice.actions;
