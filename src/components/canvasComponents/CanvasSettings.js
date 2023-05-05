import ColorWheel from "./ColorWheel";
import { useDispatch, useSelector } from 'react-redux'
import { increaseBrushSize, decreaseBrushSize, changeBrushSize,selectBrushOptions,
increaseBrushDensity, decreaseBrushDensity, changeBrushDensity } from '../../redux/brushSlice'
import { Container, Grid } from "@mui/material";

export default ({setbrushOptions}) => {
  const brushOptions = useSelector(selectBrushOptions);  
  const dispatch = useDispatch();

  const {brushSize,brushDensity} = brushOptions;


  const validate = (value) => {
    if(value>100||value<0){
      return false;
    }
    return true;
  }


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



    return(<>
      <Container
      container>
        <Grid container>
<Grid item>
<div className="sizeToggle">
brushsize: 
    <button onClick={()=>decreaseSize()} disabled={(brushSize<=0)?true:false}>&lt;</button>
    <input onChange={()=>changeSize()} id="brushSize" value={brushOptions.brushSize}/>
    <button onClick={()=>increaseSize()} disabled={(brushSize>=100)?true:false}>&gt;</button>
</div>
</Grid>

<Grid item>
  brushDensity: 
    <button onClick={()=>decreaseDensity()} disabled={(brushDensity<=0)?true:false}>&lt;</button>
    <input onChange={()=>changeDensity()} id="brushDensity" value={brushOptions.brushDensity}/>
    <button onClick={()=>increaseDensity()} disabled={(brushDensity>=100)?true:false}>&gt;</button>
</Grid>
</Grid>

      <ColorWheel
      brushOptions={brushOptions}
      setbrushOptions={setbrushOptions}/>
</Container></>)   
}