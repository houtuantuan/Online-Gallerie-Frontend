import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import {
  CardActionArea,
  IconButton,
  Grid,
  Box,
  Button,
  Divider,
  Container
} from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Color, { Palette, useColor } from 'color-thief-react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Outlet, Link, NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addImage } from '../redux/itemSlice'
import Modal from '@mui/material/Modal'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

export default function SingleImage ({ token }) {
  const { _id } = useParams()
  const [image, setImage] = useState()
  const [colorUrl, setColorUrl] = useState(null)
  const [liked, setLiked] = useState(false)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleFavorite = async () => {
    if (!token) {
      window.alert('Please login first')
    }
    try {
      const resData = await fetch('http://localhost:4000/users/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          paintingId: image && image._id,
          paintingUrl: image && image.primaryImageSmall,
          paintingTitle: image && image.title,
          liked: !liked
        })
      })
      setLiked(prevState => !prevState)
    } catch (e) {
      console.log(e)
    }
  }

  const fetchData = async () => {
    try {
      const getData = await fetch(`http://localhost:4000/gallery/${_id}`)
      if (!getData)
        throw new Error(`Request failes with a status of ${getData.status}`)
      const parseData = await getData.json()
      setImage(parseData)
      dispatch(addImage(parseData || ''))
      console.log(parseData)
    } catch (error) {
      console.log(error.message)
    }
  }

  const fetchFavorite = async () => {
    try {
      const getData = await fetch(`http://localhost:4000/users/like/${_id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const parseData = await getData.json()

      if (parseData.length === 0) {
        setLiked(false)
      } else {
        setLiked(true)
      }
    } catch (error) {
      setLiked(false)
      console.log(error.message)
    }
  }

  const fetchUrl = async () => {
    try {
      const data = await fetch('http://localhost:4000/gallery/color', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: image && image.primaryImage
        })
      })
      const blob = await data.blob()
      const colorUrl = URL.createObjectURL(blob)
      setColorUrl(colorUrl)
    } catch (e) {
      console.log(e)
    }
  }

  const pickRef = image => {
    dispatch(addImage(image || ''))
  }
  // console.log(image)
  useEffect(() => {
    fetchData()
    fetchFavorite()
  }, [])

  useEffect(() => {
    fetchUrl()
  }, [image])

  const Loading = () => <div>Loading...</div>

  return (
    <Box>
      <Grid
        flexWrap
        container
        mt={5}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        // columns={{ xs: 4, sm: 8, md: 10, lg: 10 }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            maxWidth: 375,
            // border: 'solid pink',
            display: 'flex'
          }}
          justifyContent={{ xs: 'center' }}
        >
          <Card
            sx={{
              // maxWidth: 400,
              // maxHeight: 500,
              border: 'solid',
              borderColor: '#F1F6F9',
              borderWidth: '15px'
            }}
          >
            <CardActionArea>
              {image && (
                <>
                  <CardMedia
                    component='img'
                    width='auto'
                    height='400'
                    image={image.primaryImage}
                    alt={image.title}
                  />
                </>
              )}
            </CardActionArea>
            {image && (
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Box
                  sx={{
                    // transform: 'translate(-50%, -50%)',
                    maxHeight: 750,
                    height: 750,
                    maxWidth: '80vw',
                    width: 'auto',
                    bgcolor: 'background.paper',
                    border: '2px solid #000',

                    boxShadow: 24,
                    p: 4,
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <img
                    id='modal-modal-title'
                    alt={image.title}
                    src={image.primaryImage}
                  />
                </Box>
              </Modal>
            )}
          </Card>
        </Grid>
      </Grid>
      {/* zomm in icon */}
      <Grid
        item
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '1em',
          flexDirection: 'column'
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <ZoomInIcon
            onClick={handleOpen}
            sx={{ '&:hover': { cursor: 'pointer' }, margin: '0.5em' }}
          />
          <IconButton onClick={handleFavorite} sx={{ color: 'black' }}>
            {liked ? (
              <FavoriteIcon sx={{ color: '#ad4f39' }}></FavoriteIcon>
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </Box>

        <Divider
          sx={{ width: '80%', marginTop: '3em' }}
          variant='middle'
        ></Divider>
      </Grid>

      {/* artwork details and color panel */}
      <Grid
        container
        m={5}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 3, md: 6 }}
        columns={{ xs: 4, sm: 10, md: 12, lg: 12 }}
        sx={{
          padding: '0 10em 0 10em',
          display: 'flex',
          justifyContent: 'center'
          // border: 'solid grey'
        }}
      >
        {/* artwork details */}
        <Grid
          item
          xs={12}
          md={5}
          lg={4}
          xl={3}
          sx={{
            display: 'block',
            // border: 'solid red',

            flexDirection: 'column'
          }}
          alignItems={{ xs: 'center', md: 'flex-end' }}
          justifyContent={{ xs: 'center', md: 'flex-end' }}
        >
          <Typography
            sx={{
              mt: 4,
              mb: 2,
              borderBottom: 'solid #afafaf',
              paddingLeft: '0.5em',
              fontFamily: 'josefin_sans'
            }}
            variant='h5'
            component='div'
          >
            Artwork Details
          </Typography>

          <List>
            {image && (
              <>
                <ListItem>
                  <ListItemText primary='Title' secondary={image.title} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary='Artist'
                    secondary={image.artistDisplayName}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary='Date' secondary={image.objectDate} />
                </ListItem>
                <ListItem>
                  <ListItemText primary='Medium' secondary={image.medium} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary='Dimensions'
                    secondary={image.dimensions}
                  />
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary='Learn more'
                    secondary={image.objectURL}
                  />
                </ListItem>
              </>
            )}
          </List>
        </Grid>
        {/* color panel */}
        {colorUrl && (
          <Grid item xs={12} md={6} lg={4} xl={3}>
            {/* <Color src={colorUrl} crossOrigin='Anonymous' format='hex'>
              {({ data, loading, error }) => {
                console.log(error)
                if (loading) return <Loading />
                return (
                  <>
                    
                    <Typography style={{ color: data, backgroundColor: data }}>
                      <br />
                      <strong>{data}</strong>
                    </Typography>
                  </>
                )
              }}
            </Color> */}
            <Box sx={{ maxWidth: 375, minWidth: '300px' }}>
              {/* <Typography>Predominant colors:</Typography> */}
              <Palette
                src={colorUrl}
                crossOrigin='Anonymous'
                colorCount={5}
                format='hex'
                className='colorPanel'
              >
                {({ data, loading, error }) => {
                  if (loading) return <Loading />
                  return (
                    <List
                      sx={{
                        color: data,
                        border: '1em solid #F1F6F9',
                        borderRadius: '5%',
                        height: 'auto',
                        padding: '0',
                        marginTop: '4em'
                      }}
                    >
                      {data &&
                        data.map(color => (
                          <ListItem
                            key={color}
                            sx={{
                              backgroundColor: color,
                              height: 50,
                              color: 'white'
                            }}
                          >
                            {color}
                          </ListItem>
                        ))}
                    </List>
                  )
                }}
              </Palette>
              <Container
                sx={{
                  marginTop: '1em',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Link to='/canvas'>
                  <Button
                    onClick={pickRef(image)}
                    variant='outlined'
                    sx={{
                      color: 'black',
                      '&:active': { textDecoration: 'underline black' }
                    }}
                  >
                    Draw it!
                  </Button>
                </Link>
              </Container>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}
