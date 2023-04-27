import { useSelector} from 'react-redux'
import {selectItem} from '../../redux/itemSlice';
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { CardActionArea, IconButton, Grid, Box, Button } from '@mui/material'


export default () => {

    const image = useSelector(selectItem)

    return(
        <div>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            maxWidth: 400,
            border: 'solid pink',
            display: 'flex'
          }}
          justifyContent={{ xs: 'center', xl: 'flex-end' }}
        >
          <Card sx={{ maxWidth: 400, maxHeight: 400, border: 'solid red' }}>
            <CardActionArea>
              {image && (
                <CardMedia
                  component='img'
                  height='600'
                  image={image.primaryImage}
                  alt={image.title}
                />
              )}
            </CardActionArea>
          </Card>
        </Grid>
        </div>
    )
}