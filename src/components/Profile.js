import { Typography } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import { Outlet, Link, NavLink } from 'react-router-dom'

export default function Profile ({ token }) {
  const [favorites, setFavorites] = useState([])
  const { _id } = useParams()

  const fetchFavorite = async () => {
    try {
      const getData = await fetch('http://localhost:4000/users/like', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const parseData = await getData.json()
      setFavorites(parseData)
      console.log(parseData)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchFavorite()
  }, [])

  return (
    <>
      <Box
        sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
      >
        <Typography variant='h4' sx={{ margin: '1.5em' }}>
          My Favorites
        </Typography>
        {favorites.length &&
          favorites.map(el => (
            <>
              <ListItem
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
                  alt={el.paintingTitle}
                  src={el.paintingUrl}
                  sx={{ width: 80, height: 80, margin: '1em' }}
                />
                <Link
                  to={`/gallery/${el.paintingId}`}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <ListItemText primary={el.paintingTitle} />
                </Link>
              </ListItem>
              {/* <Typography>{el.paintingTitle}</Typography> */}
            </>
          ))}
      </Box>
    </>
  )
}
