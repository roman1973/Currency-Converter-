import React from 'react';

import RatesTable from 'components/rates-table';
import Spinner from 'common/spinner';
import { useGetCurrencysRateQuery } from 'app/api';
import { useAppSelector, useAppDispatch, useLogoActionEffect } from 'app/hooks';
import { baseUpdate } from 'app/store';
import { Option } from 'types';

interface Props {
  options?: Option[];
}
const ExchangeRates: React.FC<Props> = ({ options }) => {
  const base = useAppSelector((state) => state.currency.base);

  const { data, isLoading, isSuccess, isError, error } = useGetCurrencysRateQuery(base);
  const dispatch = useAppDispatch();

  useLogoActionEffect([data?.rates]);

  let content;

  if (isLoading) {
    content = <Spinner />;
  }

  if (isSuccess) {
    content = (
      <RatesTable
        rates={data.rates}
        options={options}
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
