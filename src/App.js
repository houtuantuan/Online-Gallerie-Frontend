import './App.css';
import ExploreTime from './components/ExploreTime';
import Header from './components/header';
import red from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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

function App() {
  return (
    <div className="App">
     <ThemeProvider theme={theme}>
     <Header theme={theme}></Header>
     <ExploreTime theme={theme}></ExploreTime>
     </ThemeProvider>
    </div>
  );
}

export default App;
