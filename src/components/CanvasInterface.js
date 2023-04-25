import { Avatar, Stack, Typography, Container, Grid} from '@mui/material'
import Drawingspace from './Drawingspace'
import { useContext,useState,useEffect } from 'react'
import CanvasSettings from './CanvasSettings';

export default () => {

    const initialState ={
        brushSize: 1,
        brushColor: "#000000",
        brushDensity: 100
    }

    const [brushOptions,setbrushOptions] = useState(initialState);


    useEffect(() =>{
   
    },[])

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
    <Grid container md={9} border="solid black 1px">
            <Drawingspace brushOptions={brushOptions}/>
        </Grid>
        <Grid container md={3} direction="column">
            <Grid item>InterfaceRef</Grid>
            <Grid item><CanvasSettings
           brushOptions={brushOptions}
           setbrushOptions={setbrushOptions}/>
            </Grid>
        </Grid>
</Grid>  
</Container>
    )
}