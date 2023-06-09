/* eslint-disable no-template-curly-in-string */
import React from 'react'
import {
  Avatar,
  Stack,
  Typography,
  Container,
  Grid,
  Button
} from '@mui/material'
import { Outlet, Link, NavLink } from 'react-router-dom'
import { LOCAL_STORAGE_YEAR_RANGE_KEY, YEAR_RANGES } from '../src/utils/constants'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import Box from '@mui/material/Box'
import { Copyright } from '@mui/icons-material'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

export default function HomePage () {
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
          // ColumnSpace={{ xs: 2, md: 3, lg: 5 }}
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
            <Link to='/gallery/todayColor'>
              <Button
                sx={{ paddingLeft: '0', color: '#9CA777', fontWeight: 'bold' }}
              >
                Learn More
              </Button>
            </Link>
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
        <Grid xs={12} md={6} sx={{ marginTop: '3em', display: 'block' }}>
          <Typography
            
            variant='h4'
            fontFamily='josefin_sans'
            sx={{ marginBottom: '1em', marginTop: '3em' }}
            marginLeft={{ lg: '2.7em', xs: '0em', md: '2.2em' }}
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
      <br />
      <Container>
        <Grid container mt={10} ColumnSpace={{ xs: 2, md: 3, lg: 5 }}>
          <Typography
            id='top10'
           
            variant='h4'
            fontFamily='josefin_sans'
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            Top 10 of popular Paintings
          </Typography>
        </Grid>
      </Container>
      <br />
      <Swiper
        watchSlidesProgress={true}
        slidesPerView={3}
        spaceBetween={30}
        className='mySwiper'
      >
        <SwiperSlide>
          <a href='/gallery/6446e65df4c4a0ab41584498'>
            <img src='/gallery/6446e65df4c4a0ab41584498' alt='Top 1' />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href='/gallery/6446e1fef4c4a0ab41583e0a'>
            <img src='/gallery/6446e1fef4c4a0ab41583e0a' alt='Top 1' />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href='/gallery/6446e1c0f4c4a0ab41583da6'>
            <img src='/gallery/6446e1c0f4c4a0ab41583da6' alt='Top 1' />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href='/gallery/6446e171f4c4a0ab41583d1e'>
            <img src='/gallery/6446e171f4c4a0ab41583d1e' alt='Top 1' />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href='/gallery/6446e4d2f4c4a0ab41584234'>
            <img src='/gallery/6446e4d2f4c4a0ab41584234' alt='Top 1' />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href='/gallery/6446e175f4c4a0ab41583d26'>
            <img src='/gallery/6446e175f4c4a0ab41583d26' alt='Top 1' />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href='/gallery/6446e18ff4c4a0ab41583d56'>
            <img src='/gallery/6446e18ff4c4a0ab41583d56' alt='Top 1' />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href='/gallery/6446eaa2f4c4a0ab41584b0c'>
            <img src='/gallery/6446eaa2f4c4a0ab41584b0c' alt='Top 1' />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href='/gallery/6446e17ff4c4a0ab41583d38'>
            <img src='/gallery/6446e17ff4c4a0ab41583d38' alt='Top 1' />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href='/gallery/6446e177f4c4a0ab41583d2a'>
            <img src='/gallery/6446e177f4c4a0ab41583d2a' alt='Top 1' />
          </a>
        </SwiperSlide>
      </Swiper>
      <br />
      <Box>
        <Container maxWidth='sm'>
          <Typography variant='body2'>
            <a href='/public/dsgvo.html'>Datenschutzbestimmungen</a>
          </Typography>
          <Copyright />
          <a href='/public/imprint.html'>Impressum</a>
        </Container>
      </Box>
    </>
  )
}
