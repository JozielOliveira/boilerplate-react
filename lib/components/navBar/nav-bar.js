import React, { PureComponent } from 'react'
import { withStyles, AppBar, Button, Typography } from '@material-ui/core'
import { ArrowDropDown as ArrowDropDownIcon } from '@material-ui/icons'

import { TabsComponent } from './tabs'
import { TabComponent } from './tab'

type Props = {
  pages: Array,
  history: Object,
}

class NavBar extends PureComponent<Props> {
  state = {
    pageIndex: 0,
  }

  componentDidMount() {
    const {
      pages,
      history: {
        location: { pathname },
        listen,
      },
    } = this.props

    this.handleChangePageName(pages, pathname)
    listen(event => this.handleChangePageName(pages, event.pathname))
  }

  handleChangePageName = (pages, pathname) => {
    pages.map(
      (page, index) =>
        pathname.search(page.path) !== -1 && this.setState({ pageIndex: index })
    )
  }

  handleChangePageIndex = (event, pageIndex) => {
    const {
      pages,
      history: { push },
    } = this.props

    this.setState({ pageIndex })
    pages.map((route, index) => index === pageIndex && push(route.path))
  }

  render() {
    const { pages, classes } = this.props
    const { pageIndex } = this.state

    return (
      <AppBar position="static" color="secondary" className={classes.navBar}>
        <Typography className={classes.title} variant="h6" noWrap>
          Logo
        </Typography>
        <TabsComponent
          value={pageIndex}
          onChange={this.handleChangePageIndex}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
        >
          {pages.map((page, index) => (
            <TabComponent key={index} label={page.name} />
          ))}
        </TabsComponent>
        <Button className={classes.buttonText} disableRipple onClick={() => {}}>
          Olá, Admin
          <ArrowDropDownIcon />
        </Button>
      </AppBar>
    )
  }
}

const styles = theme => ({
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    boxShadow: '0px 3px 6px #00000029',
    background: theme.palette.common.white,
    color: theme.palette.secondary.main,
  },
  title: {
    width: 100,
    background: theme.palette.background.default,
    color: theme.palette.text.secondary,
    textAlign: 'center',
  },
  buttonText: {
    textTransform: 'none',
    fontSize: 14,
    color: theme.palette.text.secondary,
    fontWeight: 600,
    marginRight: 12,
  },
})

export const NavBarComponent = withStyles(styles)(NavBar)
