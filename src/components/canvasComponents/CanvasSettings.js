import ColorWheel from "./ColorWheel";
import { useDispatch, useSelector } from 'react-redux'
import { increaseBrushSize, decreaseBrushSize, changeBrushSize,selectBrushOptions } from '../../redux/brushSlice'
import { Container } from "@mui/material";

export default ({setbrushOptions}) => {
  const brushOptions = useSelector(selectBrushOptions);  
  const dispatch = useDispatch();

 const increaseSize = () => {
   dispatch(increaseBrushSize());
 }

const decreaseSize = () => {
   dispatch(decreaseBrushSize());
   }

 const changeSize = () => {
   dispatch(changeBrushSize(document.getElementById("brushSize").value));
 }
 
    return(<>
      <Container
      container>
        <Container>



<div className="sizeToggle">
brushsize: 
    <button onClick={()=>decreaseSize()}>&lt;</button>
    <input onChange={()=>changeSize()} id="brushSize" value={brushOptions.brushSize}/>
    <button onClick={()=>increaseSize()}>&gt;</button>
</div>
</Container>

      <ColorWheel
      brushOptions={brushOptions}
      setbrushOptions={setbrushOptions}/>
</Container></>)   
}