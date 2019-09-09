import React from 'react'
import { Select as SelectComponent, MenuItem } from '@material-ui/core'
import { Input } from '../'

export const Select = ({
  value = Number,
  options = Array,
  onChange = Function,
  ...props
}) => {
  return (
    <SelectComponent
      value={value}
      onChange={onChange}
      input={<Input {...props} />}
    >
      {options.map(({ value, label }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </SelectComponent>
  )
}
