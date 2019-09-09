import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { InputLabel, FormControl, Typography } from '@material-ui/core'
import SwitchBase from 'react-ios-switch'
const useStyles = makeStyles(theme => ({
  formControl: {
    width: '100%',
    flexDirection: 'row',
  },
  inputLabel: {
    fontSize: 12,
    color: theme.palette.background.primary,
    fontWeight: 600,
    margin: 0,
  },
}))

const InputLabelComponent = withStyles(theme => ({
  shrink: {
    transform: 'translate(0, -16px) scale(1)',
  },
}))(InputLabel)

export const Switch = ({
  label = '',
  status = '',
  checked = true,
  onChange = () => {},
}) => {
  const classes = useStyles()

  return (
    <FormControl className={classes.formControl}>
      <InputLabelComponent shrink className={classes.inputLabel}>
        {label}
      </InputLabelComponent>
      <SwitchBase
        checked={checked}
        onChange={onChange}
        onColor="#4ed69f"
        offColor="#f9fafc"
      />
      <Typography
        style={{
          fontSize: 14,
          marginLeft: 8,
          fontWeight: 600,
          lineHeight: 2,
          marginBottom: 0,
        }}
      >
        {status}
      </Typography>
    </FormControl>
  )
}
