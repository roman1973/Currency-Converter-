import React from 'react';
import ReactSelect, { OnChangeValue, OptionsOrGroups } from 'react-select';

import { Option } from 'types';

import styles from './ratesTable.module.scss';

interface Props {
  base: string;
  rates: Record<string, number>;
  options?: Option[];
  onUpdate: (base: string) => void;
}

const RatesTable: React.FC<Props> = ({ options, rates, base, onUpdate }) => {
  const handleChange = (option: OnChangeValue<Option, boolean>) => {
    onUpdate((option as Option)?.value || '');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.selectWrapper}>
        <ReactSelect
          defaultValue={options?.find((item) => item.value === base)}
          options={options as OptionsOrGroups<Option, any>}
          onChange={handleChange}
          isSearchable
          isClearable
        />
      </div>
      <div className={styles.tableWrapper}>
        {Object.entries(rates).map(([key, value]) => (
          <React.Fragment key={key}>
            <span>{options?.find((item) => item.value === key)?.label}</span>
            <span>{key}</span>
            <span>{value}</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default RatesTable;
