import {useEffect,useState} from 'react';
import { stroke } from '../../canvasutils/drawFunctions';
// import brush1 from '../../assets/brush/Brushtest2.svg';
import { setCtx } from '../../canvasutils/canvas';
import { useDispatch, useSelector } from 'react-redux'
import { addUri, sliceUriList, selectCanvasUri, selectCanvasColor, changeBackground} from '../../redux/canvasSlice'
import {redo,undo} from '../../canvasutils/buttonfunctions';
import Instruction from './Instruction';
import { selectBrushOptions,selectMode,changeHueData  } from '../../redux/brushSlice';
import { Typography } from '@mui/material';

// import { setCtx,copyTouch,ongoingTouchIndexById, ongoingTouches } from '../canvasutils/drawFunctions';

export default () => {

  const dispatch = useDispatch();
  const mode = useSelector(selectMode);
  const image = useSelector(selectCanvasUri);
  const backgroundColor = useSelector(selectCanvasColor);
  const brushOptions = useSelector(selectBrushOptions);
  const[count,setcount] = useState(1);  
  const[shiftActive,setShiftActive] = useState(false);

  const keyMap = {};
 
  useEffect(() => {

    //Create First drawing canvas
    const currentFrame = document.getElementById("stage");
    const newCanvas = document.createElement("canvas");
    currentFrame.appendChild(newCanvas);
    newCanvas.setAttribute("id", "canvas"); 
    newCanvas.width = 620;
    newCanvas.height = 557; 
    
    const bgCanvas = document.getElementById('backgroundLayer');
    bgCanvas.width = 620;
    bgCanvas.height = 557;
    const bgCtx = setCtx("backgroundLayer");
    bgCtx.fillStyle = backgroundColor;
    bgCtx.fillRect(0,0,bgCanvas.width,bgCanvas.height);

    const stageToggler = document.getElementById("stageToggler"), stctx = stageToggler.getContext("2d");
    stageToggler.width = 620;
    stageToggler.height = 10;

      const blackGradient = stctx.createLinearGradient(0,0,stageToggler.width,0);
      blackGradient.addColorStop(0, "transparent")
      blackGradient.addColorStop(1, "#000");
      stctx.fillStyle= blackGradient;
      stctx.fillRect(0,0,stageToggler.width, stageToggler.height);

  }, []);

  useEffect(() => {
    const canvas = document.getElementById('canvas');
    const ctx = setCtx('canvas');
    const stageToggler = document.getElementById("stageToggler"), stctx = stageToggler.getContext("2d");
    const ongoingTouches = []; 

  
    const singleStroke = (origin,destination,ctx) => {

      ctx.beginPath();
    
      ctx.moveTo(origin[0], origin[1]);

      ctx.lineWidth = brushOptions.brushSize;
      ctx.fillStyle = brushOptions.brushColor;
      ctx.lineCap = "round";
    
    ctx.lineTo(destination[0], destination[1]);
    ctx.stroke();

    }

    const bristleStroke = () => {

    }


    const createToggler = ()  => {
      
      const stageToggler = document.getElementById("stageToggler"), stctx = stageToggler.getContext("2d");
      stctx.clearRect(0, 0, canvas.width, canvas.height);
      const blackGradient = stctx.createLinearGradient(0,0,stageToggler.width,0);
      blackGradient.addColorStop(0, "transparent")
      blackGradient.addColorStop(1, "#000");
      stctx.fillStyle= blackGradient;
      stctx.fillRect(0,0,stageToggler.width, stageToggler.height);
    }

        function copyTouch(touch) {
          return {
            identifier: touch.pointerId,
            pageX: touch.clientX,
            pageY: touch.clientY,
            layerX: touch.layerX,
            layerY: touch.layerY
          };
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




          if(shiftActive){

            const canvas = this;
            const ctx = canvas.getContext("2d");
            const pixel = ctx.getImageData(evt.layerX, evt.layerY,1,1)
            const data =  pixel.data;

            console.log([data[0],data[1],data[2]]);
            // const rgba = 'rgba(' + data[0] + ',' + data[1] +
            //      ',' + data[2] + ',' + (data[3] / 255) + ')';

                 dispatch(changeHueData([data[0],data[1],data[2]]));

                }

          // const ctx = setCtx('canvas');
              // const color = colorForTouch(evt);
              // ctx.beginPath();
              // ctx.fillStyle = color;
              // ctx.fill();
            }

          function handleMove(evt) {
            evt.preventDefault();
            const ctx = setCtx('canvas');
            const idx = ongoingTouchIndexById(evt.pointerId);
            if (idx >= 0) {
            //  stroke(evt,ctx,idx, ongoingTouches,brushOptions);

            if(evt.pointerType ==="mouse"){
            ctx.lineWidth = brushOptions.brushSize;
            }
            else{
            ctx.lineWidth = brushOptions.brushSize * evt.pressure;
            }
          //Brush regulation

            const brushColor = `rgba(${brushOptions.hueData[0]},${brushOptions.hueData[1]},${brushOptions.hueData[2]},${brushOptions.brushDensity/100})`
            const image = new Image(10,10);
             
              image.src="../../assets/brush/Brushtest2.svg";
              const pat = ctx.createPattern(image, "repeat");
              
              
            switch(mode){
              case "pen":
                ctx.globalCompositeOperation="source-over";
              break;
              case "eraser":
                ctx.globalCompositeOperation="destination-out";
                break;        
              case "smudge":
              ctx.globalCompositeOperation="source-over";
              const average = ctx.getImageData(evt.layerX,evt.layerY,brushOptions.brushSize,brushOptions.brushSize);
              const data = average.data;
              
              const newColorArray = [0,0,0,0];
              for(let i= 0; i<brushOptions.brushSize*brushOptions.brushSize; i++){

                if(data[i*4+3] !=0){
                  newColorArray[0] = newColorArray[0] + parseInt(data[i*4]); 
                  newColorArray[1] = newColorArray[1] + parseInt(data[i*4+1]); 
                  newColorArray[2] = newColorArray[2] + parseInt(data[i*4+2]); 
                  newColorArray[3] = newColorArray[3] + parseInt(data[i*4+3]); 
                }
              }
              newColorArray[0] = Math.floor(newColorArray[0] / (brushOptions.brushSize * brushOptions.brushSize));
              newColorArray[1] = Math.floor(newColorArray[1] / (brushOptions.brushSize * brushOptions.brushSize));
              newColorArray[2] = Math.floor(newColorArray[2] / (brushOptions.brushSize * brushOptions.brushSize));
              newColorArray[3] = Math.floor(newColorArray[3] / (brushOptions.brushSize * brushOptions.brushSize));
              const rgba = 'rgba(' + newColorArray[0] + ',' + newColorArray[1] +
              ',' + newColorArray[2] + ',' + (newColorArray[3] / 255) + ')';  
              ctx.strokeStyle = rgba;
              ctx.globalAlpha = 0.25;
      break; 
      case "waterColor":
        ctx.globalCompositeOperation="source-over";
        ctx.globalAlpha = 0.1;
        break;
              }

              
              ctx.strokeStyle = brushColor;
       
              if(mode==="bristle"){
       
                const bristleCount = 20 / 3;
    const gap = 20 / bristleCount;
    for (let i = 0; i < bristleCount; i++) {
      singleStroke(
        [ongoingTouches[idx].layerX + i *gap, ongoingTouches[idx].layerY],
        [evt.layerX + i * gap, evt.layerY],
        ctx
      )
    }
     
              }else{
          singleStroke(
            [ongoingTouches[idx].layerX, ongoingTouches[idx].layerY],
            [evt.layerX, evt.layerY],
            ctx
          )
        }

             

              ctx.globalAlpha = 1;
              ongoingTouches.splice(idx, 1, copyTouch(evt)); // swap in the new touch record
            } else {
            }
          }
        
          function handleEnd(evt) {
            evt.preventDefault();
            const ctx = setCtx('canvas');
            const idx = ongoingTouchIndexById(evt.pointerId);
            
            if (idx >= 0) {
          
              singleStroke(
                [ongoingTouches[idx].screenX, ongoingTouches[idx].screenY],
                [evt.layerX, evt.layerY],
                ctx
              )
          
              
              if(count > 1){
                dispatch(sliceUriList(count));
                setcount(1);
              }
              const newUri = canvas.toDataURL();
              dispatch(addUri(newUri))
              
              ongoingTouches.splice(idx, 1); // remove it; we're done
            } else {
            }
          }

          function handleQuickEnd(evt){
            const idx = ongoingTouchIndexById(evt.pointerId);
              ongoingTouches.splice(idx, 1); // remove it; we're done

            const canvas = this;
            const ctx = canvas.getContext("2d");
            const pixel = ctx.getImageData(evt.layerX,evt.layerY,1,1)
            const data =  pixel.data;
            const rgba = 'rgba(' + data[0] + ',' + data[1] +
                 ',' + data[2] + ',' + (data[3] / 255) + ')';  
            
                 const bgCanvas = document.getElementById('backgroundLayer');
                 const bgCtx = setCtx("backgroundLayer");
                 bgCtx.fillStyle = rgba;
                 bgCtx.clearRect(0,0,bgCanvas.width,bgCanvas.height);
                 bgCtx.fillRect(0,0,bgCanvas.width,bgCanvas.height);


                 ctx.beginPath(); // Start a new path
                 ctx.moveTo(evt.layerX -2,0); // Move the pen to (30, 50)
                 ctx.lineTo(evt.layerX -2, canvas.height); // Draw a line to (150, 100)
                 ctx.stroke(); // Render the path
                
                 ctx.beginPath();
                 ctx.moveTo(evt.layerX + 2,0); // Move the pen to (30, 50)
                 ctx.lineTo(evt.layerX + 2, canvas.height); // Draw a line to (150, 100)
                 ctx.stroke();
           
          }
        
          function handleCancel(evt) {
            evt.preventDefault();         
            const idx = ongoingTouchIndexById(evt.pointerId);
            ongoingTouches.splice(idx, 1); // remove it; we're done
            ctx.save();
          }

          function handleQuickCancel(evt) {
            evt.preventDefault();         
            const idx = ongoingTouchIndexById(evt.pointerId);
            ongoingTouches.splice(idx, 1); // remove it; we're done 
          }

        const clearLastLine = () => {
          ctx.clearRect(1, 1, canvas.width -1, canvas.height -1); 
      }


      function pickCanvasColor(evt) {
       
        evt.preventDefault();
        const canvas = this;
        const ctx = canvas.getContext("2d");
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = "#000000";
        
        createToggler();
        
        const idx = ongoingTouchIndexById(evt.pointerId);
        if(idx >= 0){
        
          ctx.beginPath(); // Start a new path
          ctx.moveTo(evt.layerX -2,0); // Move the pen to (30, 50)
          ctx.lineTo(evt.layerX -2, canvas.height); // Draw a line to (150, 100)
          ctx.stroke(); // Render the path
         
          ctx.beginPath();
          ctx.moveTo(evt.layerX + 2,0); // Move the pen to (30, 50)
          ctx.lineTo(evt.layerX + 2, canvas.height); // Draw a line to (150, 100)
          ctx.stroke();
    
        }
      }
      
      function keyOptions(evt){

        keyMap[evt.keyCode] = evt.type === "keydown";

          if(keyMap[17]&&keyMap[89]){
            undo(count,image,setcount);
          } 

          if(keyMap[17]){
            setShiftActive(true);
          }
            switch(evt.key){
              case "d": clearLastLine();
              break;
              case "z": if(count > 1) redo(count,image,setcount);
              break;
            }
        }

        function KeyOptions2(evt){
          keyMap[evt.keyCode] = evt.type === "keyup";
          if(keyMap[17]){
            setShiftActive(false);
          }

        }

        canvas.addEventListener('pointerdown',handleStart,false);
        canvas.addEventListener('pointerup',handleEnd.bind(brushOptions),false);
        canvas.addEventListener('pointermove',handleMove.bind(brushOptions),false);
        canvas.addEventListener('pointercancel', handleCancel,false);
        canvas.addEventListener('pointerleave', handleCancel,false);

        stageToggler.addEventListener('pointermove',pickCanvasColor,false);
        stageToggler.addEventListener('pointerdown',handleStart,false);
        stageToggler.addEventListener('pointerup',handleQuickEnd,false);
        stageToggler.addEventListener('pointercancel',handleQuickCancel,false);
        stageToggler.addEventListener('pointerleave',handleQuickCancel,false);

        document.addEventListener("keydown", keyOptions, false);
        document.addEventListener("keyup", KeyOptions2, false);
        // Do not forget to remove eventlisteners!
        return () => {
          canvas.removeEventListener('pointerdown',handleStart,false);
          canvas.removeEventListener('pointerup',handleEnd.bind(brushOptions),false);
          canvas.removeEventListener('pointermove',handleMove.bind(brushOptions),false);
          canvas.removeEventListener('pointercancel', handleCancel,false);
          canvas.removeEventListener('pointerleave', handleCancel,false);
      
          stageToggler.removeEventListener('pointermove',pickCanvasColor,false);
          stageToggler.removeEventListener('pointerdown',handleStart,false);
          stageToggler.removeEventListener('pointerup',handleQuickEnd,false);          
       
          stageToggler.removeEventListener('pointercancel',handleQuickCancel,false);
          stageToggler.removeEventListener('pointerleave',handleQuickCancel,false);

          document.removeEventListener("keydown", keyOptions, false);
          document.removeEventListener("keyup", KeyOptions2, false);
          
        };
       
    })

    return(<div>
<div className="optionPanel">
  <div><button onClick={(evt)=> undo(count,image,setcount)} disabled={(count-1=== image.length||image.length===0)?true:false}>&lt;</button>
  <button onClick={(evt)=>redo(count,image,setcount)} disabled={(count>1)?false:true}  >&gt;</button>
  </div>
  <Typography 
        variant='h4'
  >
    Drawing Board</Typography>
<Instruction/>
</div>
<div className="canvasFrame" id="stage">
        <canvas id="backgroundLayer" style={{border:"solid black 1px"}}></canvas>
</div>
<div className="stageTogglerF" id="stageTogglerF"
style={{height: "20px"}}>
      <canvas id="stageToggler" ></canvas>
</div>

<div style={{
  height: "1rem",
  display: "flex"
}}> <Typography>Brush Color:</Typography>
<div

style={{backgroundColor: `rgba(${brushOptions.hueData[0]},${brushOptions.hueData[1]},${brushOptions.hueData[2]},${brushOptions.brushDensity/100})`,
height: "1.2rem", width:"1.2rem", marginLeft:"1rem"}}

></div>
</div>
    </div>)
}