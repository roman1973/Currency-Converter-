import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useGetSymbolsQuery } from 'app/api';
import CurrencyConverter from 'containers/currency-converter';
import ExchangeRates from 'containers/exchange-rates';

import { routes } from 'constants/routes';
import Layout from 'components/layout';

import './App.css';

const App: React.FC = () => {
  const { data } = useGetSymbolsQuery(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<Layout />}>
          <Route index element={<ExchangeRates symbols={data?.symbols} />} />
          <Route path={routes.currencyConverter} element={<CurrencyConverter symbols={data?.symbols} />} />
          <Route path={routes.exchangeRates} element={<ExchangeRates symbols={data?.symbols} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
