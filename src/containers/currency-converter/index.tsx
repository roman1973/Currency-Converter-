import React from 'react';

interface Props {
  symbols?: Record<string, string>;
}
const CurrencyConverter: React.FC<Props> = ({ symbols }) => <main>{symbols?.toString()}</main>;

export default CurrencyConverter;
