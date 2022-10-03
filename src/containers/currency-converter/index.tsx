import React from 'react';
import ReactSelect, { OptionsOrGroups } from 'react-select';

import Spinner from 'common/spinner';
import { useGetConvertQuery } from 'app/api';
import { useAppSelector, useAppDispatch, useLogoActionEffect } from 'app/hooks';
import { fromUpdate, toUpdate, amountUpdate } from 'app/store';
import { Option } from 'types';

import styles from './currencyConverter.module.scss';

interface Props {
  options?: Option[];
}
const CurrencyConverter: React.FC<Props> = ({ options }) => {
  const currency = useAppSelector((state) => state.currency);

  const { data, isLoading, isSuccess, isError, error } = useGetConvertQuery({
    from: currency.from,
    to: currency.to,
    amount: currency.amount,
  });

  const dispatch = useAppDispatch();

  useLogoActionEffect([data?.result]);

  let content;

  if (isLoading) {
    content = <Spinner />;
  }

  if (isSuccess) {
    content = (
      <div className={styles.wrapper}>
        <div className={styles.formWrapper}>
          <div className={styles.fieldWrapper}>
            <span>{'Amount'}</span>
            <input
              type="number"
              min={1}
              onChange={(e) => dispatch(amountUpdate(+e.target.value || 1))}
              value={currency.amount}
            />
          </div>
          <div className={styles.fieldWrapper}>
            <span>{'From'}</span>

            <ReactSelect
              defaultValue={options?.find((item) => item.value === currency.from)}
              options={options as OptionsOrGroups<Option, any>}
              onChange={(option) => dispatch(fromUpdate((option as Option)?.value))}
              isSearchable
              isClearable
            />
          </div>
          <span className={styles.word}>{'in'}</span>
          <div className={styles.fieldWrapper}>
            <span>{'To'}</span>

            <ReactSelect
              defaultValue={options?.find((item) => item.value === currency.to)}
              options={options as OptionsOrGroups<Option, any>}
              onChange={(option) => dispatch(toUpdate((option as Option)?.value))}
              isSearchable
              isClearable
            />
          </div>
        </div>
        <div className={styles.resultWrapper}>
          <span className={styles.result}>{data.result}</span>
          <span className={styles.currency}>{currency.to}</span>
        </div>
      </div>
    );
  }

  if (isError) {
    content = <div>{error.toString()}</div>;
  }
  return <main>{content}</main>;
};

export default CurrencyConverter;
