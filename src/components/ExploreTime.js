import React from 'react'
import { Avatar, Stack, Typography, Container, Grid } from '@mui/material'

export default function ExploreTime () {
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
      imageUrl:
        'https://images.metmuseum.org/CRDImages/ep/web-large/DT2138.jpg'
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
    },

  ]
  return (
    <>
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
    </>
  )
}
