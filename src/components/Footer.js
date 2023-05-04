import React from 'react'

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Typography, Link } from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit">
        XanGerAnd
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <>
      <div className='footer'>
              <GitHubIcon to='https://github.com' >GitHub</GitHubIcon>
              <p />           
              <LinkedInIcon to='https://linkedin.com' >LinkedIn</LinkedInIcon>
              <p />  
              <FacebookIcon to='https://facebook.com' >Facebook</FacebookIcon>
              <p />  
              <InstagramIcon to='https://instagram.com' >Instagram</InstagramIcon>
              <Typography variant="body1">
                 <Link to='./public/imprint.html'>Imprint</Link>
                 <br />
                 <Link to='./public/dsgvo.html'>Private Policies</Link>
                 <br />
              </Typography>
              <Copyright />
         </div>
      </> 
    )
  }
