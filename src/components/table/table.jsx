import React, { Component } from 'react'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
} from '@material-ui/core'
import { TableFooter } from './tableFooter'

export const TableComponent = ({
  header = Array,
  rows = [[String | Component]],
  page = Number,
  pages = [Number],
  onPaginate = Function,
}) => {
  const classes = useStyles()

  return (
    <>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {header.map((text, index) => (
              <TableCell key={index} className={classes.cellHeader}>
                {text}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((columns, indexRows) => (
            <TableRow key={indexRows} className={classes.td}>
              {columns.map((column, indexColumn) => (
                <TableCell key={indexColumn} className={classes.cell}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TableFooter pages={pages} page={page} onPaginate={onPaginate} />
    </>
  )
}

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 988,
    borderSpacing: '0px 8px',
    borderCollapse: 'separate',
  },
  td: {
    '& :first-child': {
      borderRadius: '8px 0px 0px 8px',
    },
    '& :last-child': {
      borderRadius: '0px 8px 8px 0px',
    },
  },
  cell: {
    background: theme.palette.text.hint,
    borderBottom: 'none',
    fontWeight: 500,
    fontSize: '0.8em',
  },
  cellHeader: {
    color: theme.palette.background.primary,
    borderBottom: 'none',
    padding: '16px 0px 0px 16px',
    fontWeight: 600,
    fontSize: '0.7em',
  },
}))
