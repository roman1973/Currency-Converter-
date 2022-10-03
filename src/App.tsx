import React, { useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useGetSymbolsQuery } from 'app/api';
import CurrencyConverter from 'containers/currency-converter';
import ExchangeRates from 'containers/exchange-rates';
import Home from 'containers/home';

import { routes } from 'constants/routes';
import Layout from 'components/layout';

import './App.css';

const App: React.FC = () => {
  const { data } = useGetSymbolsQuery(null);

  const options = useMemo(() => {
    if (!data?.symbols) {
      return undefined;
    }

    return Object.entries(data.symbols).map(([key, value]) => ({ value: key, label: value }));
  }, [data?.symbols]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={routes.currencyConverter} element={<CurrencyConverter options={options} />} />
          <Route path={routes.exchangeRates} element={<ExchangeRates options={options} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
