import { withStyles } from '@material-ui/core/styles'
import { Button as ButtonComponent } from '@material-ui/core'

export const Button = withStyles(theme => ({
  root: {
    textTransform: 'none',
    padding: '6px 40px',
    borderRadius: 20,
    boxShadow: 'none',
    fontWeight: 600,
  },
}))(ButtonComponent)
