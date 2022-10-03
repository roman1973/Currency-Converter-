import { routes } from 'constants/routes';

export interface NavList {
  linkText: string;
  link: routes;
}

export interface ConvertParams {
  from: string;
  to: string;
  amount: string;
}

export interface SymbolResponse {
  success: boolean;
  symbols: Record<string, string>;
}

export interface CurrencysRateResponse {
  base: string;
  date: string;
  rates: Record<string, number>;
  success: boolean;
  timestamp: number;
}

export interface ConvertResponse {
  date: string;
  historical: string;
  info: { rate: number; timestamp: number };
  query: { amount: number; from: string; to: string };
  result: number;
  success: boolean;
}

export interface Option {
  label: string;
  value: string;
}

export type Symbols = Pick<SymbolResponse, 'symbols'>;

export type CurrencysRate = Pick<CurrencysRateResponse, 'rates'>;

export type Convert = Pick<ConvertResponse, 'result'>;
