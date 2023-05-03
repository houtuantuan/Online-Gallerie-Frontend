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
import { useEffect } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
// import 'react-tabs/style/react-tabs.css'
import OverviewByTime from './OverviewByTime'
import { Typography } from '@mui/material'
import {LOCAL_STORAGE_YEAR_RANGE_KEY, YEAR_RANGES} from '../utils/constants'

export default function Overview () {  

  const previousYearRangeIndex = localStorage.getItem(
    LOCAL_STORAGE_YEAR_RANGE_KEY
  )

  const handleSelect = index => {
    localStorage.setItem(LOCAL_STORAGE_YEAR_RANGE_KEY, index)
  }

  return (
    <>
      {/* <Typography variant='h4'>Explore in Timeline</Typography> */}
      <Tabs
        onSelect={handleSelect}
        defaultIndex={previousYearRangeIndex ? Number(previousYearRangeIndex) : 0}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 2, xl: 2 }}
          //   columns={{ xs: 4, sm: 8, md: 10, lg: 12 }}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <TabList className='tabList'>
            {YEAR_RANGES.map((el, i) => {
              return <Tab key={i}>{el.beginYear.toString()}</Tab>
            })}
          </TabList>
          {YEAR_RANGES.map((yearRange, i) => {
            return (
              <TabPanel key={i} index={i}>
                <OverviewByTime yearRange={yearRange} />
              </TabPanel>
            )
          })}
        </Grid>
      </Tabs>
    </>
  )
}
