import './App.css'
import Overview from "./components/Overview"
import Header from './components/header'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import theme from './muiutils/themes'
import CanvasComp from './components/CanvasInterface'
import { Routes, Route } from 'react-router-dom'

import HomePage from './components/HomePage'
import SingleImage from './components/SingleImage'




function App () {
 
  return (


    <div className='App'>
      <ThemeProvider theme={theme}>
        <Header></Header>
        <Routes>
          <Route path="" element={<HomePage/>}/>
          <Route path='canvas' element={<CanvasComp />} />
          <Route path="gallery" element={<Overview/>} />
          <Route path="gallery/:_id" element={<SingleImage/>} />
        </Routes>
      </ThemeProvider>
    </div>
  )

}

export default App
