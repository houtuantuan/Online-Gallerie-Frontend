import { useEffect } from "react";

export default ({brushOptions, setbrushOptions}) => {

 const increaseSize = () => {
    console.log(setbrushOptions);
    const newSize = brushOptions.brushSize +1;
    const newBrushOptions = {...brushOptions,brushSize: newSize}
    setbrushOptions(newBrushOptions);

 }

const decreaseSize = () => {
    console.log(brushOptions);
    const newSize = brushOptions.brushSize -1;
    const newBrushOptions = {...brushOptions,brushSize: newSize}
    setbrushOptions(newBrushOptions);  
 }

 const changeSize = () => {
    const newSize = parseInt(document.getElementById("brushSize").value);
    const newBrushOptions = {...brushOptions,brushSize: newSize}
    setbrushOptions(newBrushOptions);  
 }
 
    return(
 <div>

<div className="sizeToggle">
brushsize: 
    <button onClick={()=>decreaseSize()}>&lt;</button>
    <input onChange={()=>changeSize()} id="brushSize" value={brushOptions.brushSize}/>
    <button onClick={()=>increaseSize()}>&gt;</button>
</div>


 </div>)   
}