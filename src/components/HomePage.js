import React from 'react'
import { Avatar, Stack, Typography, Container, Grid } from '@mui/material'
import ReactCardSlider from 'react-card-slider-component'

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

  const AvatarImages = [
    {
      period: '1200',
      imageUrl:
        'https://images.metmuseum.org/CRDImages/ep/web-large/DP-19549-001.jpg'
    },
    {
      period: '1430',
      imageUrl:
        'https://images.metmuseum.org/CRDImages/ep/web-large/DP234678.jpg'
    },
    {
      period: '1510',
      imageUrl:
        'https://images.metmuseum.org/CRDImages/ep/web-large/DP-17396-001.jpg'
    },
    {
      period: '1550',
      imageUrl:
        'https://images.metmuseum.org/CRDImages/ep/web-large/DP119115.jpg'
    },
    {
      period: '1600',
      imageUrl:
        'https://images.metmuseum.org/CRDImages/ep/web-large/DP349564.jpg'
    },
    {
      period: '1705',
      imageUrl:
        'https://images.metmuseum.org/CRDImages/ep/web-large/DP-14286-009.jpg'
    },
    {
      period: '1750',
      imageUrl:
        'https://images.metmuseum.org/CRDImages/ep/web-large/DP-24221-001.jpg'
    },
    {
      period: '1805',
      imageUrl: 'https://images.metmuseum.org/CRDImages/ep/web-large/DT2138.jpg'
    },
    {
      period: '1850',
      imageUrl:
        'https://images.metmuseum.org/CRDImages/ep/web-large/DT1502_cropped2.jpg'
    },
    {
      period: '1899',
      imageUrl:
        'https://images.metmuseum.org/CRDImages/ep/web-large/DP243354.jpg'
    }
  ]
  return (
    <>
      {/* explore in timeline */}
      <Container>
        <Typography
          wrap
          variant='h4'
          fontFamily='josefin_sans'
          sx={{ marginBottom: '1em', marginTop: '1em' }}
        >
          Explore in Timeline
        </Typography>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{
            justifyContent: 'center',
            display: 'flex',
            marginTop: '2em',

            width: '80vw'
          }}
        >
          {AvatarImages.map((el, index) => (
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
              <Typography>{el.period}</Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container sx={{ marginTop: '5em',display:"flex",justifyContent:"center" }}>
        <ReactCardSlider slides={slides} />
      </Container>
    </>
  )
}
