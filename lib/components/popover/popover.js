import React, { Component } from 'react'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import { Menu, MenuItem, ListItemIcon, makeStyles } from '@material-ui/core'

export const Popover = ({
  icon = Component,
  menuItems = [
    {
      action: Function,
      text: String,
      iconMenu: Component,
    },
  ],
}) => {
  const classes = useStyles()

  const anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'left',
  }

  const transformOrigin = {
    vertical: 'top',
    horizontal: 'right',
  }

  const Icon = icon

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {popupState => (
        <>
          <Icon {...bindTrigger(popupState)} />
          <Menu
            {...bindMenu(popupState)}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
          >
            {menuItems.map(({ action, text, iconMenu }, index) => {
              const IconMenu = iconMenu
              return (
                <MenuItem
                  key={index}
                  onClick={action}
                  className={[
                    classes.menuItems,
                    index !== menuItems.length - 1 && classes.menuItem,
                  ]}
                >
                  {iconMenu && (
                    <ListItemIcon
                      className={[classes.menuItems, classes.listItemIcon]}
                    >
                      <IconMenu />
                    </ListItemIcon>
                  )}
                  {text}
                </MenuItem>
              )
            })}
          </Menu>
        </>
      )}
    </PopupState>
  )
}
const useStyles = makeStyles(theme => ({
  menuItem: {
    borderBottom: `1px solid ${theme.palette.background.secondary}`,
  },
  menuItems: {
    color: theme.palette.text.secondary,
    fontSize: 15,
    fontWeight: 500,
  },
  listItemIcon: {
    minWidth: 40,
  },
}))
