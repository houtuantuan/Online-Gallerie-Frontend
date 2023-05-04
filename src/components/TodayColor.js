import React from 'react'
import Box from '@mui/material/Box'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import { Container, Typography } from '@mui/material'
import '../css/todayColor.css'
import { Outlet, Link, NavLink } from 'react-router-dom'

export default function TodayColor () {
  const greenImages = [
    {
      title: 'The Monet Family in Their Garden at Argenteuil',
      url: 'https://images.metmuseum.org/CRDImages/ep/original/DP-25465-001.jpg',
      id: '6446e502f4c4a0ab41584284'
    },
    {
      title: 'Women Picking Olives',
      url: 'https://images.metmuseum.org/CRDImages/ep/original/DP-17161-001.jpg',
      id: '6446e281f4c4a0ab41583ef2'
    },
    {
      title: 'Roses',
      url: 'https://images.metmuseum.org/CRDImages/ep/original/DP346475.jpg',
      id: '6446e4b2f4c4a0ab415841fc'
    },
    {
      title: 'Still Life with Apples and Pitcher',
      url: 'https://images.metmuseum.org/CRDImages/ep/original/DP-21958-001.jpg',
      id: '6446e56cf4c4a0ab4158432a'
    },
    {
      title: 'The Flowering Orchard',
      url: 'https://images.metmuseum.org/CRDImages/ep/original/DP-14936-045.jpg',
      id: '6446e601f4c4a0ab41584414'
    },
    {
      title: 'Bouquet of Flowers in a Vase',
      url: 'https://images.metmuseum.org/CRDImages/ep/original/DT7098.jpg',
      id: '6446e20cf4c4a0ab41583e20'
    },
    {
      title: 'Cypresses',
      url: 'https://images.metmuseum.org/CRDImages/ep/original/DP130999.jpg',
      id: '6446e27bf4c4a0ab41583ee6'
    },
    {
      title: 'Still Life with Apples and a Pot of Primroses',
      url: 'https://images.metmuseum.org/CRDImages/ep/original/DT47.jpg',
      id: '6446e19bf4c4a0ab41583d6a'
    },
    {
      title: 'Dancers, Pink and Green',
      url: 'https://images.metmuseum.org/CRDImages/ep/original/DP-14936-033.jpg',
      id: '6446e724f4c4a0ab415845ce'
    },
    {
      title: 'The Dance Class',
      url: 'https://images.metmuseum.org/CRDImages/ep/original/DP-20101-001.jpg',
      id: '6446e1c0f4c4a0ab41583da6'
    }
  ]

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
    >
      <Typography variant='h2' mt={10}>
        Green
      </Typography>
      <Typography variant='p' sx={{ width: '60%', margin: '2em 0 3em 0' }}>
        The color green has played an important role in European painting
        throughout history. In the medieval period, green was often used as a
        symbol of paradise and represented the promise of eternal life. During
        the Renaissance, the use of green pigments became more widespread, with
        artists using shades of green to depict landscapes, foliage, and
        clothing. In the Baroque period, artists such as Caravaggio used green
        to create dramatic contrasts and to highlight the naturalism of their
        compositions. In the Impressionist movement, green was used to capture
        the fleeting qualities of light and to convey a sense of atmosphere and
        mood in outdoor scenes. In contemporary art, green continues to be used
        for a wide range of purposes, from representing nature and the
        environment to expressing emotions such as envy or jealousy.
      </Typography>
      {/* <Container sx={{ display: 'flex', justifyContent: 'center' }}> */}

      <ImageList
        variant='masonry'
        cols={3}
        gap={10}
        sx={{
          // display: 'flex',
          // justifyContent: 'center',
          //   border: 'solid',
          width: '60vw'
        }}
      >
        {greenImages.map(item => (
          <Link key={item.url} to={`/Online-Gallerie-Frontend/gallery/${item.id}`}>
            <ImageListItem key={item.url} className='greenImage'>
              <img
                style={{ padding: '3px' }}
                src={item.url}
                alt={item.title}
                loading='lazy'
              />
            </ImageListItem>
          </Link>
        ))}
      </ImageList>

      {/* </Container> */}
    </Box>
  )
}
