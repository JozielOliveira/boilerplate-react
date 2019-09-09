import React from 'react'
import NumberFormat from 'react-number-format'

import { Input } from '.'

const NumberFormatCustom = ({ inputRef, onChange, ...other }) => {
  return (
    <NumberFormat
      {...other}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        })
      }}
      isNumericString
      decimalScale={2}
      fixedDecimalScale
      decimalSeparator=","
      thousandSeparator="."
      prefix="R$ "
    />
  )
}

export const InputMoney = props => (
  <Input inputComponent={NumberFormatCustom} {...props} />
)
