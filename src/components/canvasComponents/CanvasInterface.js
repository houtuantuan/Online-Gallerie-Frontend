import { Avatar, Stack, Typography, Container, Grid} from '@mui/material'
import Drawingspace from './Drawingspace'
import { useContext,useState,useEffect } from 'react'
import Reference from './Reference'
import CanvasSettings from './CanvasSettings' 

export default () => {
    
    const initialState ={
        brushSize: 1,
        brushColor: "#000000",
        brushDensity: 100
    }
    
    const [brushOptions,setbrushOptions] = useState(initialState);

    return(
        <Container>
    <Typography 
        fontFamily='josefin_sans'
        wrap
        variant='h4'
        sx={{ marginBottom: '1em', marginTop: '1em' }}
    >
        Drawing Board</Typography>
<Grid container>
    <Grid container md={7}>
            <Drawingspace 
            brushOptions={brushOptions} 
        />
        </Grid>
        <Grid container md={3} direction="column">
            <Grid item><Reference/></Grid>
            <Grid item><CanvasSettings
           brushOptions={brushOptions}
           setbrushOptions={setbrushOptions}/>
            </Grid>
        </Grid>
</Grid>  
</Container>
    )
}