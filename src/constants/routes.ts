export const enum routes {
  home = '/',
  currencyConverter = '/currency-converter',
  exchangeRates = '/exchange-rates',
}

export const navList = [
  { linkText: 'Currency Converter', link: routes.currencyConverter },
  { linkText: 'Exchange Rates', link: routes.exchangeRates },
];
