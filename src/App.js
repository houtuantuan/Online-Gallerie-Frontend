import './App.css';
import ExploreTime from './components/ExploreTime';
import Header from './components/header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import theme from './util/themes';
import CanvasComp from './components/CanvasComp';
import {Routes,Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
     <ThemeProvider theme={theme}>
     <Header></Header>
      <Routes>
     <Route path="canvas" element={<CanvasComp/>}/>
     </Routes>
     <ExploreTime theme={theme}></ExploreTime>     </ThemeProvider>
    </div>
  );
}

export default App;
