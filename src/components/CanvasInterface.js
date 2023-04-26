import { Avatar, Stack, Typography, Container, Grid} from '@mui/material'
import Drawingspace from './Drawingspace'
import { useContext,useState,useEffect } from 'react'
import CanvasSettings from './CanvasSettings';

export default () => {

    const [color,setColor] = useState("#000000");

    // const style ={
    //     background: 'repeating-linear-gradient(45deg,rgba(255,255,255,0.5), rgba(0,0,0,0.2) 1px)'
    // }

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
            <Drawingspace 
            brushOptions={brushOptions} 
            color={color}/>
        </Grid>
        <Grid container md={3} direction="column">
            <Grid item>InterfaceRef</Grid>
            <Grid item><CanvasSettings
           brushOptions={brushOptions}
           setColor ={setColor}
           setbrushOptions={setbrushOptions}/>
            </Grid>
        </Grid>
</Grid>  
</Container>
    )
}