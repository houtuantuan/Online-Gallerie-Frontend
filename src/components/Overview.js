import React from 'react'
import ScrollToTop from 'react-scroll-to-top'

import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import ListSubheader from '@mui/material/ListSubheader'
import IconButton from '@mui/material/IconButton'
import InfoIcon from '@mui/icons-material/Info'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import '../css/overview.css'

export default function Overview () {
  const [items, setItems] = useState([
    {
      _id: '6446e171f4c4a0ab41583d1c',
      title: 'Study for "A Sunday on La Grande Jatte"',
      period: '',
      primaryImage:
        'https://images.metmuseum.org/CRDImages/ep/original/DP259921.jpg',
      primaryImageSmall:
        'https://images.metmuseum.org/CRDImages/ep/web-large/DP259921.jpg',
      classification: 'Paintings',
      objectDate: '1884',
      objectBeginDate: 1884,
      objectEndDate: 1884,
      medium: 'Oil on canvas',
      dimensions: '27 3/4 x 41 in. (70.5 x 104.1 cm)',
      objectURL: 'https://www.metmuseum.org/art/collection/search/437658',
      artistDisplayName: 'Georges Seurat',
      artistDisplayBio: 'French, Paris 1859–1891 Paris',
      __v: 0
    },
    {
      _id: '6446e171f4c4a0ab41583d1e',
      title: 'Self-Portrait with a Straw Hat (obverse: The Potato Peeler)',
      period: '',
      primaryImage:
        'https://images.metmuseum.org/CRDImages/ep/original/DT1502_cropped2.jpg',
      primaryImageSmall:
        'https://images.metmuseum.org/CRDImages/ep/web-large/DT1502_cropped2.jpg',
      classification: 'Paintings',
      objectDate: '1887',
      objectBeginDate: 1887,
      objectEndDate: 1887,
      medium: 'Oil on canvas',
      dimensions: '16 x 12 1/2 in. (40.6 x 31.8 cm)',
      objectURL: 'https://www.metmuseum.org/art/collection/search/436532',
      artistDisplayName: 'Vincent van Gogh',
      artistDisplayBio: 'Dutch, Zundert 1853–1890 Auvers-sur-Oise',
      __v: 0
    },
    {
      _id: '6446e172f4c4a0ab41583d20',
      title: 'A Hunting Scene',
      period: '',
      primaryImage:
        'https://images.metmuseum.org/CRDImages/ep/original/DP-19296-001.jpg',
      primaryImageSmall:
        'https://images.metmuseum.org/CRDImages/ep/web-large/DP-19296-001.jpg',
      classification: 'Paintings',
      objectDate: 'ca. 1494–1500',
      objectBeginDate: 1494,
      objectEndDate: 1500,
      medium: 'Tempera and oil transferred to Masonite',
      dimensions: '27 3/4 x 66 3/4 in. (70.5 x 169.5 cm)',
      objectURL: 'https://www.metmuseum.org/art/collection/search/437283',
      artistDisplayName:
        "Piero di Cosimo (Piero di Lorenzo di Piero d'Antonio)",
      artistDisplayBio: 'Italian, Florence 1462–1522 Florence',
      __v: 0
    },
    {
      _id: '6446e173f4c4a0ab41583d22',
      title: 'Still Life with a Skull and a Writing Quill',
      period: '',
      primaryImage:
        'https://images.metmuseum.org/CRDImages/ep/original/DP145929.jpg',
      primaryImageSmall:
        'https://images.metmuseum.org/CRDImages/ep/web-large/DP145929.jpg',
      classification: 'Paintings',
      objectDate: '1628',
      objectBeginDate: 1628,
      objectEndDate: 1628,
      medium: 'Oil on wood',
      dimensions: '9 1/2 x 14 1/8 in. (24.1 x 35.9 cm)',
      objectURL: 'https://www.metmuseum.org/art/collection/search/435904',
      artistDisplayName: 'Pieter Claesz',
      artistDisplayBio: 'Dutch, Berchem? 1596/97–1660 Haarlem',
      __v: 0
    },
    {
      _id: '6446e174f4c4a0ab41583d24',
      title: 'Holy Family with an Angel',
      period: '',
      primaryImage:
        'https://images.metmuseum.org/CRDImages/ep/original/DP-15089-001.jpg',
      primaryImageSmall:
        'https://images.metmuseum.org/CRDImages/ep/web-large/DP-15089-001.jpg',
      classification: 'Paintings',
      objectDate: 'ca. 1490',
      objectBeginDate: 1485,
      objectEndDate: 1495,
      medium: 'Tempera on canvas, transferred from wood',
      dimensions: '22 x 15 in. (55.9 x 38.1 cm)',
      objectURL: 'https://www.metmuseum.org/art/collection/search/437368',
      artistDisplayName:
        "Raffaellino del Garbo (also known as Raffaelle de' Capponi and Raffaelle de' Carli)",
      artistDisplayBio:
        'Italian, San Lorenzo a Vigliano, near Florence, ca. 1470–after 1527 Florence',
      __v: 0
    },
    {
      _id: '6446e175f4c4a0ab41583d26',
      title: 'Portrait of a Woman with a Man at a Casement',
      period: '',
      primaryImage:
        'https://images.metmuseum.org/CRDImages/ep/original/DP159891.jpg',
      primaryImageSmall:
        'https://images.metmuseum.org/CRDImages/ep/web-large/DP159891.jpg',
      classification: 'Paintings',
      objectDate: 'ca. 1440',
      objectBeginDate: 1435,
      objectEndDate: 1445,
      medium: 'Tempera on wood',
      dimensions: '25 1/4 x 16 1/2 in. (64.1 x 41.9 cm)',
      objectURL: 'https://www.metmuseum.org/art/collection/search/436896',
      artistDisplayName: 'Fra Filippo Lippi',
      artistDisplayBio: 'Italian, Florence ca. 1406–1469 Spoleto',
      __v: 0
    },
    {
      _id: '6446e176f4c4a0ab41583d28',
      title: 'A Dance in the Country',
      period: '',
      primaryImage:
        'https://images.metmuseum.org/CRDImages/ep/original/DT8976.jpg',
      primaryImageSmall:
        'https://images.metmuseum.org/CRDImages/ep/web-large/DT8976.jpg',
      classification: 'Paintings',
      objectDate: 'ca. 1755',
      objectBeginDate: 1750,
      objectEndDate: 1760,
      medium: 'Oil on canvas',
      dimensions: '29 3/4 x 47 1/4 in. (75.6 x 120 cm)',
      objectURL: 'https://www.metmuseum.org/art/collection/search/437812',
      artistDisplayName: 'Giovanni Domenico Tiepolo',
      artistDisplayBio: 'Italian, Venice 1727–1804 Venice',
      __v: 0
    },
    {
      _id: '6446e177f4c4a0ab41583d2a',
      title: 'Woman with a Pink',
      period: '',
      primaryImage:
        'https://images.metmuseum.org/CRDImages/ep/original/DP145910.jpg',
      primaryImageSmall:
        'https://images.metmuseum.org/CRDImages/ep/web-large/DP145910.jpg',
      classification: 'Paintings',
      objectDate: 'early 1660s',
      objectBeginDate: 1660,
      objectEndDate: 1663,
      medium: 'Oil on canvas',
      dimensions: '36 1/4 x 29 3/8 in. (92.1 x 74.6 cm)',
      objectURL: 'https://www.metmuseum.org/art/collection/search/437402',
      artistDisplayName: 'Rembrandt (Rembrandt van Rijn)',
      artistDisplayBio: 'Dutch, Leiden 1606–1669 Amsterdam',
      __v: 0
    },
    {
      _id: '6446e178f4c4a0ab41583d2c',
      title: 'Roses in a Bowl',
      period: '',
      primaryImage:
        'https://images.metmuseum.org/CRDImages/ep/original/DT10260.jpg',
      primaryImageSmall:
        'https://images.metmuseum.org/CRDImages/ep/web-large/DT10260.jpg',
      classification: 'Paintings',
      objectDate: '1883',
      objectBeginDate: 1883,
      objectEndDate: 1883,
      medium: 'Oil on canvas',
      dimensions: '11 3/4 x 16 3/8 in. (29.8 x 41.6 cm)',
      objectURL: 'https://www.metmuseum.org/art/collection/search/437995',
      artistDisplayName: 'Henri Fantin-Latour',
      artistDisplayBio: 'French, Grenoble 1836–1904 Buré',
      __v: 0
    },
    {
      _id: '6446e17af4c4a0ab41583d2e',
      title: 'A Woman Seated beside a Vase of Flowers (Madame Paul Valpinçon?)',
      period: '',
      primaryImage:
        'https://images.metmuseum.org/CRDImages/ep/original/DP-25460-001.jpg',
      primaryImageSmall:
        'https://images.metmuseum.org/CRDImages/ep/web-large/DP-25460-001.jpg',
      classification: 'Paintings',
      objectDate: '1865',
      objectBeginDate: 1865,
      objectEndDate: 1865,
      medium: 'Oil on canvas',
      dimensions: '29 x 36 1/2 in. (73.7 x 92.7 cm)',
      objectURL: 'https://www.metmuseum.org/art/collection/search/436121',
      artistDisplayName: 'Edgar Degas',
      artistDisplayBio: 'French, Paris 1834–1917 Paris',
      __v: 0
    },
    {
      _id: '6446e17af4c4a0ab41583d30',
      title: 'Merry Company on a Terrace',
      period: '',
      primaryImage:
        'https://images.metmuseum.org/CRDImages/ep/original/DP146455.jpg',
      primaryImageSmall:
        'https://images.metmuseum.org/CRDImages/ep/web-large/DP146455.jpg',
      classification: 'Paintings',
      objectDate: 'ca. 1670',
      objectBeginDate: 1665,
      objectEndDate: 1675,
      medium: 'Oil on canvas',
      dimensions: '55 1/2 x 51 3/4 in. (141 x 131.4 cm)',
      objectURL: 'https://www.metmuseum.org/art/collection/search/437749',
      artistDisplayName: 'Jan Steen',
      artistDisplayBio: 'Dutch, Leiden 1626–1679 Leiden',
      __v: 0
    },
    {
      _id: '6446e17bf4c4a0ab41583d32',
      title: 'A Matador',
      period: '',
      primaryImage:
        'https://images.metmuseum.org/CRDImages/ep/original/DT1933.jpg',
      primaryImageSmall:
        'https://images.metmuseum.org/CRDImages/ep/web-large/DT1933.jpg',
      classification: 'Paintings',
      objectDate: '1866–67',
      objectBeginDate: 1866,
      objectEndDate: 1867,
      medium: 'Oil on canvas',
      dimensions: '67 3/8 x 44 1/2 in. (171.1 x 113 cm)',
      objectURL: 'https://www.metmuseum.org/art/collection/search/436960',
      artistDisplayName: 'Edouard Manet',
      artistDisplayBio: 'French, Paris 1832–1883 Paris',
      __v: 0
    },
    {
      _id: '6446e17cf4c4a0ab41583d34',
      title: 'Still Life with a Glass and Oysters',
      period: '',
      primaryImage:
        'https://images.metmuseum.org/CRDImages/ep/original/DP147903.jpg',
      primaryImageSmall:
        'https://images.metmuseum.org/CRDImages/ep/web-large/DP147903.jpg',
      classification: 'Paintings',
      objectDate: 'ca. 1640',
      objectBeginDate: 1635,
      objectEndDate: 1645,
      medium: 'Oil on wood',
      dimensions: '9 7/8 x 7 1/2 in. (25.1 x 19.1 cm)',
      objectURL: 'https://www.metmuseum.org/art/collection/search/436636',
      artistDisplayName: 'Jan Davidsz de Heem',
      artistDisplayBio: 'Dutch, Utrecht 1606–1683/84 Antwerp',
      __v: 0
    },
    {
      _id: '6446e17df4c4a0ab41583d36',
      title: 'Man with a Magnifying Glass',
      period: '',
      primaryImage:
        'https://images.metmuseum.org/CRDImages/ep/original/DP145909.jpg',
      primaryImageSmall:
        'https://images.metmuseum.org/CRDImages/ep/web-large/DP145909.jpg',
      classification: 'Paintings',
      objectDate: 'early 1660s',
      objectBeginDate: 1660,
      objectEndDate: 1663,
      medium: 'Oil on canvas',
      dimensions: '36 x 29 1/4 in. (91.4 x 74.3 cm)',
      objectURL: 'https://www.metmuseum.org/art/collection/search/437399',
      artistDisplayName: 'Rembrandt (Rembrandt van Rijn)',
      artistDisplayBio: 'Dutch, Leiden 1606–1669 Amsterdam',
      __v: 0
    },
    {
      _id: '6446e17ff4c4a0ab41583d38',
      title: 'Woman with a Parrot',
      period: '',
      primaryImage:
        'https://images.metmuseum.org/CRDImages/ep/original/DP-17680-001.jpg',
      primaryImageSmall:
        'https://images.metmuseum.org/CRDImages/ep/web-large/DP-17680-001.jpg',
      classification: 'Paintings',
      objectDate: '1866',
      objectBeginDate: 1866,
      objectEndDate: 1866,
      medium: 'Oil on canvas',
      dimensions: '51 x 77 in. (129.5 x 195.6 cm)',
      objectURL: 'https://www.metmuseum.org/art/collection/search/436002',
      artistDisplayName: 'Gustave Courbet',
      artistDisplayBio: 'French, Ornans 1819–1877 La Tour-de-Peilz',
      __v: 0
    }
  ])
  const [hasMore, setHasMore] = useState(true)

  console.log(111)
  const getMorePost = async () => {
    const res = await fetch(
      `http://localhost:4000/gallery?itemOffset=${items.length}&limit=4`
    )
    const newItems = await res.json()
    setItems(item => [...item, ...newItems])
    console.log(items)
    console.log(2222)
  }

  return (
    <>
      <div>Overview</div>
      <ScrollToTop smooth />

      <InfiniteScroll
        dataLength={items.length}
        next={getMorePost}
        hasMore={hasMore}
        loader={<h3> Loading...</h3>}
        endMessage={<h4>Nothing more to show</h4>}
      >
        {/* <ImageList sx={{ width: 500, height: 450 }}> */}
        <Box margin={{ xs: 5, sm: 5, md: 5 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 2, xl: 2 }}
            columns={{ xs: 4, sm: 8, md: 10, lg: 12 }}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            {items.map(item => (
              <Grid
                item
                key={item._id}
                // xs={12}
                // sm={12}
                // md={6}
                // lg={4}
                // xl={3}
                columnSpacing={{ xs: 1, sm: 1, md: 1 }}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <ImageListItem className='infoParent'>
                  <Box
                    xs={6}
                    sm={5}
                    md={4}
                    lg={3}
                    className='center-cropped'
                    sx={{
                      backgroundImage: `url(${item.primaryImageSmall})`,
                      display: 'flex',
                      justifyContent: 'center',
                      boxShadow: 'grey 0px 7px 29px 0px',
                      borderRadius: '25px'
                    }}
                  >
                    {/* <img
                      src={item.primaryImageSmall}
                      //   srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.title}
                      loading='lazy'
                    /> */}
                  </Box>
                  <ImageListItemBar
                    sx={{ borderRadius: '0 0 25px 25px' }}
                    className='imageInfo'
                    xs={6}
                    sm={4}
                    md={4}
                    xl={3}
                    title={item.title}
                    subtitle={item.artistDisplayName}
                    actionIcon={
                      <IconButton
                        sx={{
                          color: 'rgba(255, 255, 255, 0.54)'
                        }}
                        aria-label={`info about ${item.title}`}
                      >
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              </Grid>
            ))}
          </Grid>
        </Box>
        {/* </ImageList> */}
      </InfiniteScroll>
    </>
  )
}
