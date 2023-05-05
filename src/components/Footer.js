import React from 'react'

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Typography, Box, Container } from '@mui/material';


function Copyright() {
  return (
    <Typography variant="body1" color="text.secondary">
      <></>
      <div className='copyright'>
      {'Copyright © '}
      
        XanAndGer
    {' '}
      {new Date().getFullYear()}
      {'.'}
      </div>
    </Typography>
  );
}

function SocialLinks() {
    return (
      <div className='sociallinks'>
      <a href="https://github.com" target="#"><GitHubIcon /></a>
      <a href="https://linkedin.com" target="#"><LinkedInIcon /></a>
      <a href='https://facebook.com' target="#"><FacebookIcon /></a>
      <a href='https://instagram.com' target="#"><InstagramIcon /></a>
      </div>
    );
}

export default function StickyFooter() {
  return (
    <Container className='footer'>
          <Box item xs={12} sm={6} md={3}>
          <SocialLinks />
          </Box>
          <Box item xs={12} sm={6} md={3}>
          <Copyright />
          </Box>
         
     </Container>
    );
  }
  