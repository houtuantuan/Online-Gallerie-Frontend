import React from 'react'
import {
  Avatar,
  Stack,
  Typography,
  Container,
  Grid,
  Button
} from '@mui/material'
import ReactCardSlider from 'react-card-slider-component'
import { Outlet, Link, NavLink } from 'react-router-dom'
import { LOCAL_STORAGE_YEAR_RANGE_KEY, YEAR_RANGES } from '../utils/constants'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

export default function HomePage () {
  const slides = [
    {
      image: 'https://picsum.photos/200/300',
      title: 'This is a title',
      description: 'This is a description'
      // clickEvent: sliderClick
    },
    {
      image: 'https://picsum.photos/600/500',
      title: 'This is a second title',
      description: 'This is a second description'
      // clickEvent: sliderClick
    },
    {
      image: 'https://picsum.photos/700/600',
      title: 'This is a third title',
      description: 'This is a third description'
      // clickEvent: sliderClick
    },
    {
      image: 'https://picsum.photos/500/400',
      title: 'This is a fourth title',
      description: 'This is a fourth description'
      // clickEvent: sliderClick
    },
    {
      image: 'https://picsum.photos/200/300',
      title: 'This is a fifth title',
      description: 'This is a fifth description'
      // clickEvent: sliderClick
    },
    {
      image: 'https://picsum.photos/800/700',
      title: 'This is a sixth title',
      description: 'This is a sixth description'
      // clickEvent: sliderClick
    },
    {
      image: 'https://picsum.photos/800/900',
      title: 'This is a seventh title',
      description: 'This is a seventh description'
      // clickEvent: sliderClick
    }
  ]
  const imageData = [
    {
      title: 'Flower Garden and Bungalow',
      url: 'https://images.metmuseum.org/CRDImages/ad/original/DP-21451-001.jpg'
    },
    {
      title: 'Women Picking Olives',
      url: 'https://images.metmuseum.org/CRDImages/ep/original/DP-17161-001.jpg'
    },
    {
      title: 'Roses',
      url: 'https://images.metmuseum.org/CRDImages/ep/original/DP346475.jpg'
    },
    {
      title: 'Study in Black and Green (Oil Sketch)',
      url: 'https://images.metmuseum.org/CRDImages/ad/original/DP105798.jpg'
    }
  ]
  const handleClick = index => {
    localStorage.setItem(LOCAL_STORAGE_YEAR_RANGE_KEY, index)
  }
  return (
    <>
      {/* Today's topci */}
      <Container>
        <Grid
          container
          mt={10}
          ColumnSpace={{ xs: 2, md: 3,lg:5 }}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Grid item xs={12} md={5}>
            <Typography variant='h6'>Today's Color</Typography>
            <Typography variant='h4'>Get Inspiration by Green</Typography>
            <Typography>
              Green is a color that is associated with nature, growth, and
              renewal. It is often considered a calming and soothing color that
              promotes relaxation and harmony.
            </Typography>
            <Button
            sx={{paddingLeft:"0",color:"#9CA777",fontWeight:"bold"}}
            >Learn More</Button>
          </Grid>
          <Grid xs={12} md={5} item>
            <ImageList variant='masonry' cols={3} gap={8}>
              {imageData.map(item => (
                <ImageListItem key={item.img}>
                  <img src={item.url} alt={item.title} loading='lazy' />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        </Grid>
      
      </Container>
      {/* explore in timeline */}
      <Container>
        <Grid xs={12} md={6}sx={{ marginTop: '3em', display: 'block' }}>
          <Typography
            wrap
            variant='h4'
            fontFamily='josefin_sans'
            sx={{ marginBottom: '1em', marginTop: '3em' }}
            marginLeft={{lg:"2.7em",xs:"0em",md:"2.2em"}}
          >
            Explore Color in Timeline
          </Typography>
        </Grid>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{
            justifyContent: 'center',
            display: 'flex',
            marginTop: '2em',
            // border: 'solid',
            width: '60em'
          }}
        >
          {YEAR_RANGES.map((el, index) => (
            <Grid
              item
              xs={4}
              sm={4}
              md={2.2}
              key={index}
              sx={{
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Link to='/gallery' onClick={() => handleClick(index)}>
                <Avatar
                  src={el.imageUrl}
                  sx={{
                    width: '100px',
                    height: '100px',
                    marginBottom: '1em',
                    border: '7px solid white',
                    boxShadow: 5
                  }}
                ></Avatar>
              </Link>
              <Typography>{el.period}</Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container
        sx={{ marginTop: '5em', display: 'flex', justifyContent: 'center' }}
      >
        <ReactCardSlider slides={slides} />
      </Container>
    </>
  )
}
