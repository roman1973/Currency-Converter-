import React, { useEffect } from 'react';

import RatesTable from 'components/rates-table';
import Spinner from 'common/spinner';
import { useGetCurrencysRateQuery } from 'app/api';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { baseUpdate, logoActionUpdate } from 'app/store';

interface Props {
  symbols?: Record<string, string>;
}
const ExchangeRates: React.FC<Props> = ({ symbols }) => {
  const base = useAppSelector((state) => state.currency.base);

  const { data, isLoading, isSuccess, isError, error } = useGetCurrencysRateQuery(base);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(logoActionUpdate(true));
    setTimeout(() => dispatch(logoActionUpdate(false)), 700);
  }, [data?.rates]);

  let content;

  if (isLoading) {
    content = <Spinner />;
  }

  if (isSuccess) {
    content = (
      <RatesTable
        rates={data.rates}
        symbols={symbols}
        base={base}
        onUpdate={(base: string) => dispatch(baseUpdate(base))}
      />
    );
  }

  if (isError) {
    content = <div>{error.toString()}</div>;
  }
  return <main>{content}</main>;
};

export default ExchangeRates;
