import { useEffect, useState } from "react";
import { useDispatch , useSelector  } from 'react-redux'
import { changeBrushColor, changeHueData,changeHue, selectHue,selectMode} from '../../redux/brushSlice'
import { Box, Container } from "@mui/material";


export default ({brushOptions}) => {
  // const [hue, setHue] = useState("rgba(1,180,255,1)");
  const dispatch = useDispatch();
  const hue = useSelector(selectHue);
  const mode = useSelector(selectHue);


useEffect(() => {
  
const createHueSpectrum = () => {
  const canvas = document.getElementById("hueC"), ctx = canvas.getContext("2d");
    canvas.width = 10;
    canvas.height = 200;
  const hueGradient = ctx.createLinearGradient(0,0,0,canvas.height);
   
   hueGradient.addColorStop(0.00, "hsl(0,100%,50%)");
   hueGradient.addColorStop(0.17, "hsl(298.8,100%,50%)");
   hueGradient.addColorStop(0.33, "hsl(241.2,100%,50%)");
   hueGradient.addColorStop(0.50, "hsl(180,100%,50%)");
   hueGradient.addColorStop(0.67, "hsl(118.8,100%,50%)");
   hueGradient.addColorStop(0.83, "hsl(61.2,100%,50%)");
   hueGradient.addColorStop(1.00, "hsl(360,100%,50%)");
   ctx.fillStyle = hueGradient;
   ctx.fillRect(0,0,canvas.width, canvas.height);
   return canvas;
   
}

const createSpectrum = (hue) => 
{

    const canvas = document.getElementById("valueSaturationC"), ctx = canvas.getContext("2d");
    canvas.height = 200;
    canvas.width= 212;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = hue;
    ctx.fillRect(0,0,canvas.width, canvas.height);

    const whiteGradient = ctx.createLinearGradient(0,0,canvas.width, 0);
    whiteGradient.addColorStop(0, "#fff")
    whiteGradient.addColorStop(1, "transparent");
    ctx.fillStyle= whiteGradient;
    ctx.fillRect(0,0,canvas.width, canvas.height);
    const blackGradient = ctx.createLinearGradient(0,0,0,canvas.height);
    blackGradient.addColorStop(0, "transparent")
    blackGradient.addColorStop(1, "#000");
    ctx.fillStyle= blackGradient;
    ctx.fillRect(0,0,canvas.width, canvas.height);
    return canvas;
}
createSpectrum();
 createHueSpectrum();

},[])


/// constant changes

useEffect(() => {

  const ongoingTouches = []; 
  function copyTouch(touch) {
    // console.log(touch);
    return {
      identifier: touch.pointerId,
      pageX: touch.clientX,
      pageY: touch.clientY,
      layerX: touch.layerX,
      layerY: touch.layerY
    };
  }

  const createHueSpectrum = () => {
    const canvas = document.getElementById("hueC"), ctx = canvas.getContext("2d");
      canvas.width = 10;
      canvas.height = 200;
    const hueGradient = ctx.createLinearGradient(0,0,0,canvas.height);
     
     hueGradient.addColorStop(0.00, "hsl(0,100%,50%)");
     hueGradient.addColorStop(0.17, "hsl(298.8,100%,50%)");
     hueGradient.addColorStop(0.33, "hsl(241.2,100%,50%)");
     hueGradient.addColorStop(0.50, "hsl(180,100%,50%)");
     hueGradient.addColorStop(0.67, "hsl(118.8,100%,50%)");
     hueGradient.addColorStop(0.83, "hsl(61.2,100%,50%)");
     hueGradient.addColorStop(1.00, "hsl(360,100%,50%)");
     ctx.fillStyle = hueGradient;
     ctx.fillRect(0,0,canvas.width, canvas.height);
     return canvas;
     
  }

  function ongoingTouchIndexById(idToFind) {
    for (let i = 0; i < ongoingTouches.length; i++) {
      const id = ongoingTouches[i].identifier;
  
      if (id === idToFind) {
        return i;
      }
    }
    return -1; // not found
  }
  
  
  function handleStart(evt) {
    evt.preventDefault();
      ongoingTouches.push(copyTouch(evt));
      const canvas = this;
      const ctx = canvas.getContext("2d");
      
      if(canvas.id === "valueSaturationC"){
        createSpectrum(hue);
        ctx.beginPath();
            ctx.arc(evt.layerX,evt.layerY, 5, 0, 2 * Math.PI);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#ffffff";
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(evt.layerX,evt.layerY, 4, 0, 2 * Math.PI);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#000000";
            ctx.stroke();  
      }
      else if(canvas.id === "hueC") {
        createHueSpectrum();
        ctx.beginPath();
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = "#000000";
        ctx.beginPath(); // Start a new path
        ctx.moveTo(0,evt.layerY - 2); // Move the pen to (30, 50)
        ctx.lineTo(canvas.width, evt.layerY -2); // Draw a line to (150, 100)
        ctx.stroke(); // Render the path
        ctx.beginPath();
        ctx.moveTo(0,evt.layerY + 2); // Move the pen to (30, 50)
        ctx.lineTo(canvas.width, evt.layerY +2); // Draw a line to (150, 100)
        ctx.stroke();

      const pixel = ctx.getImageData(evt.layerX,evt.layerY,1,1)
      const data =  pixel.data;
      const rgba = 'rgba(' + data[0] + ',' + data[1] +
           ',' + data[2] + ',' + (data[3] / 255) + ')';  
      createSpectrum(rgba);
      }
  }

  function pickHue(evt) {
    evt.preventDefault();
   
    const canvas = this;
    const ctx = canvas.getContext("2d");
    const idx = ongoingTouchIndexById(evt.pointerId);
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = "#000000";

    if(idx >= 0){
    
      createHueSpectrum();
      ctx.beginPath(); // Start a new path
      ctx.moveTo(0,evt.layerY - 2); // Move the pen to (30, 50)
      ctx.lineTo(canvas.width, evt.layerY -2); // Draw a line to (150, 100)
      ctx.stroke(); // Render the path
     
      ctx.beginPath();
      ctx.moveTo(0,evt.layerY + 2); // Move the pen to (30, 50)
      ctx.lineTo(canvas.width, evt.layerY +2); // Draw a line to (150, 100)
      ctx.stroke();

      const pixel = ctx.getImageData(evt.layerX,evt.layerY,1,1)
      const data =  pixel.data;
      const rgba = 'rgba(' + data[0] + ',' + data[1] +
           ',' + data[2] + ',' + (data[3] / 255) + ')';  
      createSpectrum(rgba);
      
      // dispatch(changeHue(rgba));
    }
  }

    function pickColor(evt){
      evt.preventDefault();
   
        const canvas = this;
        const ctx = canvas.getContext("2d");
        const idx = ongoingTouchIndexById(evt.pointerId);

        if(idx >= 0){
      
          createSpectrum(hue);
          ctx.beginPath();
          ctx.arc(evt.layerX,evt.layerY, 5, 0, 2 * Math.PI);
          ctx.lineWidth = 2;
          ctx.strokeStyle = "#ffffff";
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(evt.layerX,evt.layerY, 4, 0, 2 * Math.PI);
          ctx.lineWidth = 2;
          ctx.strokeStyle = "#000000";
          ctx.stroke();

        }
        
    }

    function handleEnd(evt) {
      evt.preventDefault();
      const canvas = this;
      const ctx = canvas.getContext("2d");
      const idx = ongoingTouchIndexById(evt.pointerId);
      
      if(canvas.id === "valueSaturationC"){
        
        const pixel = ctx.getImageData(evt.layerX, evt.layerY,1,1)
        const data =  pixel.data;
        const rgba = 'rgba(' + data[0] + ',' + data[1] +
             ',' + data[2] + ',' + (data[3] / 255) + ')';
        dispatch(changeHueData([data[0],data[1],data[2]]))

        dispatch(changeBrushColor(rgba));
    
      }
      else if (canvas.id === "hueC"){
      const pixel = ctx.getImageData(evt.layerX,evt.layerY,1,1)
      const data =  pixel.data;
      const rgba = 'rgba(' + data[0] + ',' + data[1] +
           ',' + data[2] + ',' + (data[3] / 255) + ')';  
      createSpectrum(rgba);
          dispatch(changeHue(rgba));

      }
      ongoingTouches.splice(idx, 1); // remove it; we're done
    }

    function handleCancel(evt) {
      evt.preventDefault();         
      const idx = ongoingTouchIndexById(evt.pointerId);
      ongoingTouches.splice(idx, 1); // remove it; we're done
      // ctx.save();     
    }
  
  const createSpectrum = (hue) => 
    {

        const canvas = document.getElementById("valueSaturationC"), ctx = canvas.getContext("2d");
        canvas.height = 200;
        canvas.width= 212;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = hue;
        ctx.fillRect(0,0,canvas.width, canvas.height);

        const whiteGradient = ctx.createLinearGradient(0,0,canvas.width, 0);
        whiteGradient.addColorStop(0, "#fff")
        whiteGradient.addColorStop(1, "transparent");
        ctx.fillStyle= whiteGradient;
        ctx.fillRect(0,0,canvas.width, canvas.height);
        const blackGradient = ctx.createLinearGradient(0,0,0,canvas.height);
        blackGradient.addColorStop(0, "transparent")
        blackGradient.addColorStop(1, "#000");
        ctx.fillStyle= blackGradient;
        ctx.fillRect(0,0,canvas.width, canvas.height);
        return canvas;
    }

    // const hueCanvas = createHueSpectrum();
    // const spectrumCanvas = createSpectrum();

    const spectrumCanvas = document.getElementById("valueSaturationC");
    const hueCanvas = document.getElementById("hueC");
   spectrumCanvas.addEventListener('pointerdown',handleStart,false);
   spectrumCanvas.addEventListener('pointermove',pickColor,false);
   spectrumCanvas.addEventListener('pointercancel',handleCancel,false);
   spectrumCanvas.addEventListener('pointerup',handleEnd,false);
   
   hueCanvas.addEventListener('pointerdown',handleStart,false);
   hueCanvas.addEventListener('pointermove',pickHue,false);
   hueCanvas.addEventListener('pointercancel',handleCancel,false);
   hueCanvas.addEventListener('pointerup',handleEnd,false);
  
   return () => {
   spectrumCanvas.removeEventListener('pointerdown',handleStart,false);
   spectrumCanvas.removeEventListener('pointermove',pickColor,false);
   spectrumCanvas.removeEventListener('pointercancel',handleCancel,false);
   spectrumCanvas.removeEventListener('pointerup',handleEnd,false);
   hueCanvas.removeEventListener('pointerdown',handleStart,false);
   hueCanvas.removeEventListener('pointermove',pickHue,false);
   hueCanvas.removeEventListener('pointercancel',handleCancel,false);
   hueCanvas.removeEventListener('pointerup',handleEnd,false);

  };
 
})
    
 return(<>
        <Container
        container   
        sx={{ display: 'flex' }}
        mt={5}
        ColumnSpace={{ xs: 2, md: 1, lg: 1 }}
      >    
       <Box sx={{border: 'solid black 2px',
                borderLeft: 'solid gray 2px',
                borderRight: 'solid gray 2px',
                height: 'min-content'}}>
            <div className="canvasFrame" id="valSatF">          
            <canvas id="valueSaturationC" className="nonTouch"/>  
            </div>
        </Box>
        <Box
        sx={{border: 'solid black 2px',
        borderLeft: 'solid gray 2px',
        marginLeft: '0.5rem'}}
        >
            <div className="canvasFrame" id="hueF"> 
            <canvas id="hueC" className="nonTouch"/>
            </div></Box>
     
        </Container>
        
        </>
    )
}