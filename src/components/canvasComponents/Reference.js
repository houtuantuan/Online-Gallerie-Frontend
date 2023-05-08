import { useSelector} from 'react-redux'
import {selectItem} from '../../redux/itemSlice';
import {selectColor} from '../../redux/colorSlice';
import {selectBrush, changeBrushColor } from '../../redux/brushSlice'
import { useDispatch } from 'react-redux'


import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import { CardActionArea, IconButton, Grid, Box, Button, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom';


export default () => {

  const dispatch = useDispatch();

    const image = useSelector(selectItem)
    const colors = useSelector(selectColor);

    function switchColor(e) {
     const color = e.target.style.backgroundColor;

  dispatch(changeBrushColor(color));
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
                <Link to='/gallery'>Explore</Link>
              </li>
              </ul>
              </div>}
            </CardActionArea>
          </Card>
          <Container>
            <Grid container>
              <Typography>Ref.C:</Typography>
          {
           colors&& colors.map((color) => (
            <Grid item><button className="colorPick"
              style={{ backgroundColor: `${color}`}}
                onClick={(e) => switchColor(e)}></button></Grid>
           ))
          }
          </Grid>
          </Container>
        </>
    )
}