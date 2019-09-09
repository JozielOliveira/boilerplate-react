import { createMuiTheme } from '@material-ui/core/styles'
import { colors } from './colors'

export { colors }

export default createMuiTheme({
  typography: {
    fontFamily: ['Montserrat'],
  },
  palette: {
    secondary: {
      light: colors.athensGray,
      main: colors.raven,
      dark: colors.doveGray,
      contrastText: colors.silver,
    },
    text: {
      primary: colors.black,
      secondary: colors.raven,
      hint: colors.catskillWhite,
    },
    primary: {
      light: colors.blueLight,
      main: colors.blue,
      dark: colors.blueDark,
      contrastText: colors.white,
    },
    background: {
      default: colors.background,
      primary: colors.bombay,
      secondary: colors.seashell,
    },
  },
})
