import { useSelector} from 'react-redux'
import {selectItem} from '../../redux/itemSlice';
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { CardActionArea, IconButton, Grid, Box, Button, Container } from '@mui/material'
import { Link } from 'react-router-dom';

export default () => {
    const image = useSelector(selectItem)
    return(
        <>
{/* 
<Container>
<Box        >

          <div className="canvasFrame" id="referenceF"> 
          <canvas id="reference"/>
          </div></Box>
     
        </Container> */}

          <Card sx={{maxWidth: 300, maxHeight: 400, minHeight: 360 }}>
            <CardActionArea>
              {image ? (
                <CardMedia
                  component='img'
                  height='600'
                  image={image.primaryImage}
                  alt={image.title}
                />
              ): <div><p>Please select an Image for study</p>
              <ul>
              <li>   <Link to='../gallery'>Explore</Link>
         </li>
                </ul></div>}
            </CardActionArea>
          </Card>
        </>
    )
}