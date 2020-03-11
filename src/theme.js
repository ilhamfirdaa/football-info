
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#325E6B',
      main: '#5096AB',
      dark: '#6FCDEA',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#1BCC88',
      main: '#128C5D',
      dark: '#0A4D33',
      contrastText: '#ffffff',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
    fontFamily: 'Poppins, Open Sans, Roboto, sans-serif',
  },
})

export default theme
