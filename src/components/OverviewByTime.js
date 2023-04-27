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
import { useEffect } from 'react'
import '../css/overview.css'
import { useDispatch } from 'react-redux'
import { addImage } from '../redux/itemSlice'





export default function OverviewByTime ({ yearRange }) {
  const [items, setItems] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const dispatch = useDispatch();
  console.log(yearRange)

  const getMorePost = async () => {
    const res = await fetch(
      `http://localhost:4000/gallery?itemOffset=${items.length}&limit=20&beginYear=${yearRange.beginYear}&endYear=${yearRange.endYear}`
    )
    const newItems = await res.json()
    console.log(newItems)
    if(!newItems.length){
        setHasMore(false);
    }
    
    setItems(prevItems => [...prevItems, ...newItems])
  }
  useEffect(() => {
    getMorePost()
    console.log('here')
  }, [])
  return (
    <div>
      <InfiniteScroll
        dataLength={items.length}
        next={getMorePost}
        hasMore={hasMore}
        loader={<h3> Loading...</h3>}
        endMessage={<h4>Nothing more to show</h4>}
      >
        <ScrollToTop smooth />

        

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
                
                columnSpacing={{ xs: 1, sm: 1, md: 1 }}
                sx={{ display: 'flex', justifyContent: 'center'}}
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
      </InfiniteScroll>
    </div>
  )
}
