import { withStyles, Tabs } from '@material-ui/core'

export const TabsComponent = withStyles(theme => ({
  indicator: {
    height: 4,
  },
}))(Tabs)
