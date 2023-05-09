import { useSelector} from 'react-redux'
import {selectItem} from '../../redux/itemSlice';
import {selectColor} from '../../redux/colorSlice';
import {selectBrush, changeBrushColor,changeHueData,selectHue } from '../../redux/brushSlice'
import { useDispatch } from 'react-redux'

import { useState } from 'react';


import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import { CardActionArea, IconButton, Grid, Box, Button, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom';


export default () => {

  const [tempColor, setTempColor] = useState("");

  const dispatch = useDispatch();
  const hue = useSelector(selectHue);
    const image = useSelector(selectItem)
    const colors = useSelector(selectColor);

    function hexToRgbA(hex){
      if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        let c= hex.substring(1).split('');
          if(c.length== 3){
              c= [c[0], c[0], c[1], c[1], c[2], c[2]];
          }
          c= '0x'+c.join('');
          return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
      }
      throw new Error('Bad Hex');
  }
  
    function switchColor(e) {
   const color = e.target.style.backgroundColor;
const newColor = color.substring(4, color.length-1)
         .replace(/ /g, '')
         .split(',');

         const rgba = 'rgba(' + newColor[0] + ',' + newColor[1] +
             ',' + newColor[2] + ',' + 1 + ')';
             dispatch(changeHueData([newColor[0],newColor[1],newColor[2]]))
             dispatch(changeBrushColor(rgba));
             setTempColor(rgba);
}
    return(
        <>
          <Card sx={{minWidth: 340, maxHeight: 400, minHeight: 360 }}>
            <CardActionArea>
              {image ? (
                <CardMedia
                  component='img'
                  image={image.primaryImage}
                  alt={image.title}
                />
              ): <div><p>Please select an Image for study</p>
              <ul>
              <li>   
                <Link to='/Online-Gallerie-Frontend/gallery'>Explore</Link>
              </li>
              </ul>
              </div>}
            </CardActionArea>
          </Card>
          <Container>
            <Grid container 
              sx={{marginTop: 1, marginBotton:1}}>
              <Typography>Ref.C:</Typography>
          {
           colors&& colors.map((color) => (
            <Grid item>
            <button className="colorPick"
            style={
             (hexToRgbA(color)==tempColor)? { backgroundColor:`${color}`, border:"solid green 3px"}:
             { backgroundColor:`${color}`}
            }
                onClick={(e) => switchColor(e)}></button>
            </Grid>
           ))
          }
          
          </Grid>
          </Container>
        </>
    )
}