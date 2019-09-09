import currency from 'currency.js'

export const getMoney = string => parseFloat(string)

export const formatReal = value =>
  currency(value, {
    separator: '.',
    decimal: ',',
    symbol: 'R$ ',
    formatWithSymbol: true,
  }).format()
