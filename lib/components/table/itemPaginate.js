import React from 'react'
import { makeStyles } from '@material-ui/core'

export const ItemPage = ({
  onPaginate = Function,
  isPageActive = Boolean,
  page = Number,
}) => {
  const classes = useStyles()

  const handlePaginate = () => onPaginate(page)

  return (
    <label
      onClick={handlePaginate}
      className={isPageActive ? classes.footerLabelActive : classes.footerLabel}
    >
      {page}
    </label>
  )
}

const useStyles = makeStyles(theme => ({
  footerLabel: {
    backgroundColor: '#f9fafc',
    marginRight: 8,
    color: '#707070',
    fontWeight: 600,
    padding: '0px 8px',
    borderRadius: '100%',
  },
  footerLabelActive: {
    backgroundColor: '#007bff',
    marginRight: 8,
    color: '#ffffff',
    fontWeight: 600,
    padding: '0px 8px',
    borderRadius: '100%',
  },
}))
