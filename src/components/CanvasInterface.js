import { Avatar, Stack, Typography, Container, Grid} from '@mui/material'
import Drawingspace from './Drawingspace'

export default () => {

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
            <Drawingspace></Drawingspace>
        </Grid>
        <Grid container md={3} direction="column">
            <Grid item>InterfaceRef</Grid>
            <Grid item>InterFaceUI</Grid>
        </Grid>
</Grid>  
</Container>
    )
}