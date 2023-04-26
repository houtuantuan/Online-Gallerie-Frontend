import './App.css'
import ExploreTime from './components/ExploreTime'
import Overview from "./components/Overview"
import Header from './components/header'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import theme from './muiutils/themes'
import CanvasComp from './components/CanvasInterface'
import { Routes, Route } from 'react-router-dom'

function App () {
 
  return (

    <><div className='App'>
      <ThemeProvider theme={theme}>
        <Header></Header>
        <Routes>
          <Route path='canvas' element={<CanvasComp />} />
          <Route path="gallery" element={<Overview />} />
        </Routes>
        {/* <ExploreTime theme={theme}></ExploreTime>{' '} */}

        <div className='Carousel'>
      <ThemeProvider theme={theme}>
        <ReactCardSlider theme={theme}></ReactCardSlider>{' '}
      </ThemeProvider>    
    </div>
      </ThemeProvider>
    </div>
    <p />
    <div className='Carousel'>
        <ThemeProvider theme={theme}>
          <ReactCardSlider theme={theme}></ReactCardSlider>{' '}
        </ThemeProvider>
      </div></>
  )
}

export default App
