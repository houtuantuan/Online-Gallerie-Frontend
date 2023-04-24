import './App.css';
import ExploreTime from './components/ExploreTime';
import Header from './components/header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import theme from './muiutils/themes';
import CanvasInterface from './components/CanvasInterface';
import {Routes,Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
     <ThemeProvider theme={theme}>
     <Header></Header>
      <Routes>
     <Route path="canvas" element={<CanvasInterface/>}/>
     </Routes>
     <ExploreTime theme={theme}></ExploreTime>     
     </ThemeProvider>
    </div>
  );
}

export default App;
