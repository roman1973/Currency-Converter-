import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  ConvertParams,
  SymbolResponse,
  CurrencysRateResponse,
  ConvertResponse,
  Symbols,
  CurrencysRate,
  Convert,
} from 'types';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.apilayer.com/exchangerates_data/',
  prepareHeaders: (headers) => {
    headers.set('apikey', 'ETilhfYbBfONvEdH64eI5EnKa35Y6pGD');

    return headers;
  },
});

export const currencyApi = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: (builder) => ({
    getSymbols: builder.query<Symbols, null>({
      query: () => `symbols`,
      transformResponse: (response: SymbolResponse) => ({ symbols: response.symbols }),
    }),
    getCurrencysRate: builder.query<CurrencysRate, string>({
      query: (base: string) => `latest?base=${base}`,
      transformResponse: (response: CurrencysRateResponse) => ({ rates: response.rates }),
    }),
    getConvert: builder.query<Convert, ConvertParams>({
      query: ({ from, to, amount }: ConvertParams) => `convert?to=${to}&from=${from}&amount=${amount}`,
      transformResponse: (response: ConvertResponse) => ({
        result: response.result,
      }),
    }),
  }),
});

export const { useGetSymbolsQuery, useGetCurrencysRateQuery, useGetConvertQuery } = currencyApi;
