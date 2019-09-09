import React from 'react'
import { Input } from '.'
import { SearchIcon } from '../../assets'
import { InputAdornment, IconButton } from '@material-ui/core'

export const InputSearch = props => {
  return (
    <Input
      {...props}
      endAdornment={
        <InputAdornment position="end">
          <IconButton edge="end" {...props.icon}>
            <SearchIcon htmlColor="#aeb3bd" />
          </IconButton>
        </InputAdornment>
      }
    />
  )
}
