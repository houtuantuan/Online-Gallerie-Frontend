import ColorWheel from "./ColorWheel";
import { useDispatch, useSelector } from 'react-redux'
import { increaseBrushSize, decreaseBrushSize, changeBrushSize,selectBrushOptions, selectHue,
increaseBrushDensity, decreaseBrushDensity, changeBrushDensity,changeMode ,selectMode} from '../../redux/brushSlice'
import { Container, Grid, Popover, Button, Typography } from "@mui/material";
import { useEffect,useState } from "react";

export default ({setbrushOptions}) => {

  const [modes,setModes] = useState(["pen","eraser","smudge","waterColor","bristle"])
  
  const brushOptions = useSelector(selectBrushOptions);  
  const dispatch = useDispatch();
  const currentMode = useSelector(selectMode);
  const options = useSelector(selectBrushOptions);
  const {brushSize,brushDensity} = brushOptions;
  const validate = (value) => {
      if(value>100||value<0){
      return false;
    }
    return true;
  }
useEffect(() =>{

},[])
const increaseSize = () => {
  const value =   parseInt(document.getElementById("brushSize").value);
  if(value <= 100) dispatch(increaseBrushSize());
 }

const decreaseSize = () => {
 const value =   parseInt(document.getElementById("brushSize").value);
 if(value >= 0) dispatch(decreaseBrushSize());
  }

const changeSize = () => {
 const value =   document.getElementById("brushSize").value;
 const pass = validate(value);
 pass && dispatch(changeBrushSize(value));
}

const increaseDensity = () => {
 dispatch(increaseBrushDensity());
}

const decreaseDensity = () => {
 dispatch(decreaseBrushDensity());
 }

const changeDensity = () => {
 const value =   document.getElementById("brushDensity").value;
 const pass = validate(value);
 pass && dispatch(changeBrushDensity(value));
}

const switchMode = (mode) => {
  dispatch(changeMode(mode));
}

const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    
      const open = Boolean(anchorEl);
      const id = open ? 'simple-popover' : undefined;
  
return(<>
      <Container
      container
      >
        <Grid container    
        sx={{ display: 'flex', justifyContent: 'flex-start' }}>
<Grid item>
<div className="sizeToggle">
size: 
    <button onClick={()=>decreaseSize()} disabled={(brushSize<=0)?true:false}>&lt;</button>
    <input onChange={()=>changeSize()} id="brushSize" value={brushOptions.brushSize}/>
    <button onClick={()=>increaseSize()} disabled={(brushSize>=100)?true:false}>&gt;</button>
</div>
</Grid>

<Grid item>
  Density: 
    <button onClick={()=>decreaseDensity()} disabled={(brushDensity<=0)?true:false}>&lt;</button>
    <input onChange={()=>changeDensity()} id="brushDensity" value={brushOptions.brushDensity}/>
    <button onClick={()=>increaseDensity()} disabled={(brushDensity>=100)?true:false}>&gt;</button>
</Grid>
</Grid>
<Grid container>

  <Grid item>
  <Button aria-describedby={1} variant="contained" onClick={handleClick} style={{height:"1rem"}}>
        brushtypes
      </Button>
      <Popover
        id={1}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>
        <h2>Brushes</h2>
       
      {
        modes.map((mode) => (
        (currentMode === mode)? <Button onClick={() => switchMode(mode)}
        style={{backgroundColor:"rgb(128, 135, 78)",
        color:"white"}}>{mode}</Button>:
        <Button 
        onClick={() => switchMode(mode)}
      
        >{mode}</Button>
        ))
      }
        </Typography>
      </Popover>
  </Grid>
  {/* <Grid item
  
  sx={{ display: 'flex', justifyContent: 'flex-start',marginLeft:1}}
  >
    <Typography>BrushColor: </Typography>
     <div style={{backgroundColor:brushOptions.brushColor,width: 20, height: 20,marginLeft:1}}></div>
  </Grid> */}
  
</Grid>

      <ColorWheel
      brushOptions={brushOptions}
      setbrushOptions={setbrushOptions}/>
</Container></>)   
}