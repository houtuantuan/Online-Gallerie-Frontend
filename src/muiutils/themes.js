
import {createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      light: '#fff0ef',
      main: '#d8dbbe',
      dark: '#5960a1',
      contrastText: '#000',
    },
    secondary: {
      light: '#ffffff',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

export default theme;