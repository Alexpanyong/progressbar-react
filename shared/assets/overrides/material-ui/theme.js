import { createMuiTheme } from '@material-ui/core/styles';
import Color from '@constants/color';

/**
 * For more override configuration,
 * visit https://material-ui.com/customization/themes/
 */

const theme = createMuiTheme({
  palette: {
    primary: {
      main: Color.primary,
      contrastText: Color.text_white,
    },
    secondary: {
      main: Color.error_color,
      contrastText: Color.text_white,
    },
    error: {
      main: Color.error_color,
    },
  },
  typography: {
    fontFamily: 'Lato',
    button: {
      fontWeight: 600,
      fontSize: 16,
    },
  },
});

export default theme;
