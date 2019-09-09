import { withStyles, Tab } from '@material-ui/core'

export const TabComponent = withStyles(theme => ({
  root: {
    textTransform: 'none',
    margin: '4px 12px',
    padding: 0,
    [theme.breakpoints.up('md')]: {
      fontSize: 14,
      minWidth: 48,
    },
  },
  selected: {
    fontWeight: 600,
  },
}))(Tab)
