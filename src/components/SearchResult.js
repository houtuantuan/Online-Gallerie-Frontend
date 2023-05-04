import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { useEffect } from 'react'
import {
  Link,
} from 'react-router-dom'
import { Typography } from '@mui/material'

export default function SearchResult () {
  let [searchParams, setSearchParams] = useSearchParams()
  const [items, setItems] = useState([])

  const searchInput = searchParams.get('q')
  console.log(searchParams.get('q'))

  const getSearchResult = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BLOG_API}/gallery/search?q=${searchInput}`
    )
    const newItems = await res.json()
    console.log(newItems)

    setItems(newItems)
  }
  useEffect(() => {
    getSearchResult()
    console.log('searchResult')
  }, [searchInput])
  return (
    <>
      <Box margin={{ xs: 5, sm: 5, md: 5 }}>
        <Typography variant='h4' sx={{ margin: '1em' }}>Search Results</Typography>
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
              columnSpacing={{ xs: 1, sm: 1, md: 1 }}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <ImageListItem className='infoParent'>
                <Link to={`/gallery/${item._id}`}>
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
                  ></Box>
                </Link>
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
                    ></IconButton>
                  }
                />
              </ImageListItem>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  )
}
