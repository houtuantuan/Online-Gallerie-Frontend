import { Typography } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import { Outlet, Link, NavLink } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function Profile ({ token, setIsAuthenticated }) {
  const [favorites, setFavorites] = useState([])
  const [userInfo, setUserInfo] = useState()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const fetchFavorite = async () => {
    try {
      const getData = await fetch(
        `${process.env.REACT_APP_BLOG_API}/users/like`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      const parseData = await getData.json()
      setFavorites(parseData)
      console.log(parseData)
    } catch (error) {
      console.log(error.message)
    }
  }

  const fetchUserInfo = async () => {
    try {
      const getData = await fetch(`${process.env.REACT_APP_BLOG_API}/auth/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const parseData = await getData.json()
      setUserInfo(parseData)
      console.log(parseData)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchFavorite()
    fetchUserInfo()
  }, [])

  const navigate = useNavigate()
  const deleteUser = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BLOG_API}/auth/me`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setOpen(false)
      setIsAuthenticated(false)
      localStorage.removeItem('token')
      navigate('/')

      return
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: '83vh',
          marginTop: '4em'
        }}
      >
        <Tabs>
          <TabList>
            <Tab>
              <Typography variant='h5' >My Account</Typography>
            </Tab>

            <Tab>
              <Typography variant='h5'>My Favorites</Typography>
            </Tab>
          </TabList>
          <TabPanel>
            <List>
              <ListItem>
                <ListItemText
                  primary='First Name'
                  secondary={userInfo && userInfo.firstName}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary='Last Name'
                  secondary={userInfo && userInfo.lastName}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary='E-Mail'
                  secondary={userInfo && userInfo.email}
                />
              </ListItem>
            </List>

            <Button 
            sx={{margin:"1em"}}
            color='warning'
            variant='outlined' onClick={handleClickOpen}>
              Delete your accout
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <DialogTitle id='alert-dialog-title'>
                {'Are you sure to delete your account?'}
              </DialogTitle>

              <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={deleteUser} autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </TabPanel>
          <TabPanel>
            {favorites.length &&
              favorites.map(el => (
                <>
                  <ListItem
                    key={el._id}
                    sx={{
                      //   border: 'solid',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                      width: '30%',
                      maxWidth: '500px',
                      minWidth: '350px'
                    }}
                  >
                    <Avatar
                      key={el._id}
                      alt={el.paintingTitle}
                      src={el.paintingUrl}
                      sx={{ width: 80, height: 80, margin: '1em' }}
                    />
                    <Link
                      to={`/gallery/${el.paintingId}`}
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      <ListItemText key={el._id} primary={el.paintingTitle} />
                    </Link>
                  </ListItem>
                  {/* <Typography>{el.paintingTitle}</Typography> */}
                </>
              ))}
          </TabPanel>
        </Tabs>
      </Box>
    </>
  )
}
