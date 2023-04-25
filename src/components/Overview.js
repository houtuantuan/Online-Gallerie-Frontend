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
import 'react-tabs/style/react-tabs.css'
import OverviewByTime from './OverviewByTime'

export default function Overview () {

  const yearRanges = [
    {
      beginYear: 1200,
      endYear: 1430
    },
    {
      beginYear: 1430,
      endYear: 1510
    },
    {
      beginYear: 1510,
      endYear: 1550
    },
    {
      beginYear: 1550,
      endYear: 1600
    },
    {
      beginYear: 1600,
      endYear: 1705
    },
    {
      beginYear: 1705,
      endYear: 1750
    },
    {
      beginYear: 1750,
      endYear: 1805
    },
    {
      beginYear: 1805,
      endYear: 1850
    },
    {
      beginYear: 1850,
      endYear: 1899
    },
    {
      beginYear: 1899,
      endYear: 1920
    }
  ]

  return (
    <>
      <div>Overview</div>
      <Tabs>
        <TabList>
          {yearRanges.map((el, i) => {
            return <Tab key={i}>{el.beginYear.toString()}</Tab>
          })}
        </TabList>
        {yearRanges.map((yearRange,i) => {
          return (
            <TabPanel  key={i} index={i}>
              <OverviewByTime yearRange={yearRange} />
            </TabPanel>
          )
        })}
      </Tabs>
    </>
  )
}
