import React from 'react'
import { Avatar, Stack, Typography, Container, Grid } from '@mui/material'

export default function ExploreTime () {
  const AvatarImages = []
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
          {Array.from(Array(10)).map((_, index) => (
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
                sx={{
                  width: '100px',
                  height: '100px',
                  marginBottom: '1em',
                  border: '7px solid white',
                  boxShadow: 5
                }}
              ></Avatar>
              <Typography>1400</Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}
