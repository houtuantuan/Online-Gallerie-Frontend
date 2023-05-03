import { Avatar, Stack, Typography, Container, Grid} from '@mui/material'
import Drawingspace from './Drawingspace'
import { useContext,useState,useEffect } from 'react'
import Reference from './Reference'
import CanvasSettings from './CanvasSettings' 
import "../../css/canvas.scss"

export default () => {
    
    const initialState ={
        brushSize: 1,
        brushColor: "#000000",
        brushDensity: 100
    }
    
    const [brushOptions,setbrushOptions] = useState(initialState);

    return(
        <>
    <Container >
        <Grid container
         mt={10}
         ColumnSpace={{ xs: 2, md: 3, lg: 5 }}
         sx={{ display: 'flex', justifyContent: 'center' }}
        >
            <Grid item>
           <Drawingspace 
            brushOptions={brushOptions} 
        />
        </Grid>
        <Grid item md={3} sx={{ m: 1 }}>
            <Grid item><Reference/></Grid>
            <CanvasSettings
           brushOptions={brushOptions}
           setbrushOptions={setbrushOptions}/>
        </Grid>
</Grid>  
</Container>
</>
    )
}