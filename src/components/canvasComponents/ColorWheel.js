import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { changeBrushColor, changeHueData } from '../../redux/brushSlice'
import { Box, Container } from "@mui/material";


export default ({brushOptions}) => {
  const dispatch = useDispatch();
useEffect(() => {

  function pickHue(evt) {

    const canvas = this, ctx = canvas.getContext("2d");
    const pixel = ctx.getImageData(evt.layerX,evt.layerY,1,1)
    const data =  pixel.data;
    const rgba = 'rgba(' + data[0] + ',' + data[1] +
         ',' + data[2] + ',' + (data[3] / 255) + ')';

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
        createSpectrum(rgba);
  }

    function pickColor(evt){
        const canvas = this;
        const ctx = canvas.getContext("2d");
        const pixel = ctx.getImageData(evt.layerX,evt.layerY,1,1)
        const data =  pixel.data;
                const rgba = 'rgba(' + data[0] + ',' + data[1] +
                     ',' + data[2] + ',' + (data[3] / 255) + ')';
        dispatch(changeHueData([data[0],data[1],data[2]]))
                     
        const huepixel = ctx.getImageData(canvas.width -1,0,1,1)
        const hueData = huepixel.data;
        const huergba = 'rgba(' + hueData[0] + ',' + hueData[1] +
             ',' + hueData[2] + ',' + (hueData[3] / 255) + ')';

        

             console.log(hueData[3]/255);

       dispatch(changeBrushColor(rgba));
      
        createSpectrum(huergba);
        ctx.beginPath();
        ctx.arc(evt.layerX,evt.layerY, 5, 0, 2 * Math.PI);
        ctx.lineWidth = brushOptions.brushSize;
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(evt.layerX,evt.layerY, 4, 0, 2 * Math.PI);
        ctx.lineWidth = brushOptions.brushSize;
        ctx.strokeStyle = "#000000";
        ctx.stroke();
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


  const createSpectrum = (hue="rgba(1,180,255,1)") => 
    {

      console.log("create new Spectrum");
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

    const hueCanvas = createHueSpectrum();
    const spectrumCanvas = createSpectrum();

  spectrumCanvas.addEventListener('pointerdown',pickColor,false);
   hueCanvas.addEventListener('pointerdown',pickHue,false);

},[])
    
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
            <canvas id="valueSaturationC"/>  
            </div>
        </Box>
        <Box
        sx={{border: 'solid black 2px',
        borderLeft: 'solid gray 2px',
        marginLeft: '0.5rem'}}
        >
            <div className="canvasFrame" id="hueF"> 
            <canvas id="hueC"/>
            </div></Box>
     
        </Container>
        
        </>
    )
}