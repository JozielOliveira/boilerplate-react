import React from 'react'
import { makeStyles } from '@material-ui/core'
import { ItemPage } from './itemPaginate'

export const TableFooter = ({ pages, page, onPaginate }) => {
  const classes = useStyles()
  const isPageActive = parseInt(page)

  return (
    <div className={classes.footerTable}>
      {pages.map(pageItem => (
        <ItemPage
          key={pageItem}
          page={pageItem}
          onPaginate={() => onPaginate(pageItem)}
          isPageActive={isPageActive === pageItem}
        />
      ))}
    </div>
  )
}

const useStyles = makeStyles(() => ({
  footerTable: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'right',
    marginTop: 16,
  },
}))
