import { cyan, grey, red } from '@material-ui/core/colors';
// import { fade } from '@material-ui/core/styles/colorManipulator';
import createMuiTheme, { Theme, ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import zIndex from '@material-ui/core/styles/zIndex';

const white = '#ffffff';
// const lightBlack = 'rgba(0, 0, 0, 0.54)';
// const darkBlack = 'rgba(0, 0, 0, 0.87)';

const themeOptions: ThemeOptions = {
  zIndex: {
    ...zIndex,
    appBar: 2000
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: red[500]
    },
    secondary: {
      main: cyan[500],
      contrastText: white
    },
    divider: grey[500],
    action: {
      disabledBackground: '#ccc', // defaults to rgba(0, 0, 0, 0.12)
    },
  }
};

const theme: Theme = createMuiTheme(themeOptions);

export default theme;
