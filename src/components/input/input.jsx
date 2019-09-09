import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { InputLabel, FormControl, InputBase } from '@material-ui/core'

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(4),
    },
    padding: '4px 14px',
    backgroundColor: theme.palette.text.hint,
    border: `1px solid ${theme.palette.background.secondary}`,
    borderRadius: 7,
  },
  input: {
    width: '100%',
    fontSize: 16,
    position: 'relative',
    '-webkit-text-fill-color': theme.palette.text.secondary,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
  },
}))(InputBase)

const useStyles = makeStyles(theme => ({
  formControl: {
    width: '100%',
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
    transform: 'translate(0, 4px) scale(1)',
  },
}))(InputLabel)

export const Input = props => {
  const classes = useStyles()

  return (
    <FormControl className={classes.formControl}>
      <InputLabelComponent shrink className={classes.inputLabel}>
        {props.label}
      </InputLabelComponent>
      <BootstrapInput id={`${props.label}-input`} {...props} />
    </FormControl>
  )
}
