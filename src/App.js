import './App.css'
import Overview from './components/Overview'
import Header from './components/Header.js'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import theme from './muiutils/themes'
import CanvasComp from './components/canvasComponents/CanvasInterface'
import { Routes, Route } from 'react-router-dom'

import StickyFooter from './components/Footer'
import HomePage from './components/HomePage'
import SingleImage from './components/SingleImage'
import SearchResult from './components/SearchResult'
import TodayColor from './components/TodayColor'
import Loading from './components/loginComps/Loading'
import SignUp from './components/loginComps/SignUp'
import SignIn from './components/loginComps/SignIn'
import Profile from './components/Profile'
import { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { getUser } from './utils/authUtils'

function App () {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loadingAuthRequest, setLoadingAuthRequest] = useState(false)

  useEffect(() => {
    const validateToken = async () => {
      try {
        setLoadingAuthRequest(true)
        const { data, error } = await getUser(token)
        if (error) throw error
        setUser(data)
        setIsAuthenticated(true)
        setLoadingAuthRequest(false)
      } catch (error) {
        localStorage.removeItem('token')
        setToken(null)
        setLoadingAuthRequest(false)
        toast.error(error.message)
      }
    }
    token && validateToken()
  }, [token])

  const logOut = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    setIsAuthenticated(false)
  }
  console.log(isAuthenticated)

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Header
          isAuthenticated={isAuthenticated}
          theme={theme}
          logOut={logOut}
          user={user}
        ></Header>
        <Routes>
          <Route path='Online-Gallerie-Frontend' element={<HomePage />} />
          <Route
            path='Online-Gallerie-Frontend/canvas'
            element={<CanvasComp />}
          />
          <Route
            path='Online-Gallerie-Frontend/canvas/:_id'
            element={<CanvasComp />}
          />
          <Route
            path='Online-Gallerie-Frontend/gallery'
            element={<Overview />}
          />
          <Route
            path='Online-Gallerie-Frontend/gallery/search'
            element={<SearchResult />}
          />
          <Route
            path='Online-Gallerie-Frontend/gallery/todayColor'
            element={<TodayColor />}
          />
          <Route
            path='Online-Gallerie-Frontend/gallery/:_id'
            element={<SingleImage token={token} />}
            theme={theme}
          />
          <Route
            path='Online-Gallerie-Frontend/signup'
            element={
              <SignUp
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                setToken={setToken}
                loadingAuthRequest={loadingAuthRequest}
                setLoadingAuthRequest={setLoadingAuthRequest}
              />
            }
            theme={theme}
          />
          <Route
            path='Online-Gallerie-Frontend/signin'
            element={
              <SignIn
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                setToken={setToken}
                loadingAuthRequest={loadingAuthRequest}
                setLoadingAuthRequest={setLoadingAuthRequest}
              />
            }
            theme={theme}
          />
          <Route
            path='Online-Gallerie-Frontend/profile'
            element={
              <Profile token={token} setIsAuthenticated={setIsAuthenticated} />
            }
          ></Route>
        </Routes>
        <p />
        <StickyFooter></StickyFooter>
      </ThemeProvider>
    </div>
  )
}

export default App
