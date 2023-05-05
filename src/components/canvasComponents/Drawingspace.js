import {useEffect,useState} from 'react';
import { stroke } from '../../canvasutils/drawFunctions';
import { setCtx } from '../../canvasutils/canvas';
import { useDispatch, useSelector } from 'react-redux'
import { addUri, sliceUriList, selectCanvasUri } from '../../redux/canvasSlice'
import {redo,undo} from '../../canvasutils/buttonfunctions';
import Instruction from './Instruction';
import { selectBrushOptions } from '../../redux/brushSlice';
import { Typography } from '@mui/material';


// import { setCtx,copyTouch,ongoingTouchIndexById, ongoingTouches } from '../canvasutils/drawFunctions';

export default () => {

  const dispatch = useDispatch();
  const image = useSelector(selectCanvasUri);
  const brushOptions = useSelector(selectBrushOptions);
  const[count,setcount] = useState(1);  
  
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
    bgCtx.fillStyle ="#fff";
    bgCtx.fillRect(0,0,bgCanvas.width,bgCanvas.height);
  },[]);

  useEffect(() => {
    const canvas = document.getElementById('canvas');
    const ctx = setCtx('canvas');
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
          
          function colorForTouch() {
            const color = brushOptions.brushColor;
            return color;
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
            const ctx = setCtx('canvas');
              ongoingTouches.push(copyTouch(evt));
              const color = colorForTouch(evt);
              ctx.beginPath();
              ctx.fillStyle = color;
              ctx.fill();
          }
        
          function handleMove(evt) {
            evt.preventDefault();
            const ctx = setCtx('canvas');
            const idx = ongoingTouchIndexById(evt.pointerId);
            if (idx >= 0) {
            //  stroke(evt,ctx,idx, ongoingTouches,brushOptions);
            ctx.beginPath();
        
            
            ctx.moveTo(ongoingTouches[idx].layerX, ongoingTouches[idx].layerY);   
          // curve through the last two ongoingTouches
          
          // const controlPointX = 2*evt.pageX -ongoingTouches[idx].layerX/2 -evt.layerX/2;
          // const controlPointY = 2*evt.pageY -ongoingTouches[idx].layerY/2 -evt.layerY/2;
          // console.log(ongoingTouches[idx].layerX +"to" + evt.layerX);
          
          ctx.lineTo(evt.layerX, evt.layerY);
          // ctx.quadraticCurveTo(controlPointX, controlPointY, evt.layerX, evt.layerY);

          
          //Brush regulation
            ctx.lineWidth = brushOptions.brushSize;
            const brushColor = `rgba(${brushOptions.hueData[0]},${brushOptions.hueData[1]},${brushOptions.hueData[2]},${brushOptions.brushDensity/100})`
console.log(brushColor);
console.log(brushOptions.brushColor);

            // ctx.strokeStyle = "rgba(0,0,0,0.22)";
            ctx.strokeStyle = brushColor;
        
            ctx.lineCap = 'round';
             ctx.lineJoin = 'round';
    
            ctx.stroke();

              ongoingTouches.splice(idx, 1, copyTouch(evt)); // swap in the new touch record
            } else {
            }
            
       
          }
        
          function handleEnd(evt) {
            evt.preventDefault();
          
          const ctx = setCtx('canvas');
            const idx = ongoingTouchIndexById(evt.pointerId);
            
            if (idx >= 0) {
              
              const y = evt.target.parentNode.offsetTop;
              const x = evt.target.parentNode.offsetLeft;
              
              ctx.lineWidth = brushOptions.brushSize;
              
              ctx.fillStyle = brushOptions.brushColor;
              // ctx.lineCap = "round";
              ctx.beginPath();
              ctx.moveTo(ongoingTouches[idx].screenX, ongoingTouches[idx].screenY);
              ctx.lineTo(evt.layerX, evt.layerY);
              ongoingTouches.splice(idx, 1); // remove it; we're done
            
              if(count > 1){
                dispatch(sliceUriList(count));
                setcount(1);
              }
              const newUri = canvas.toDataURL();
              dispatch(addUri(newUri))
              
            } else {
            }
          }
        
          function handleCancel(evt) {
            evt.preventDefault();         
            const idx = ongoingTouchIndexById(evt.pointerId);
            ongoingTouches.splice(idx, 1); // remove it; we're done
            ctx.save();
           
          }


        const clearLastLine = () => {
          ctx.clearRect(1, 1, canvas.width -1, canvas.height -1); 
      }

      function keyOptions(evt){

        // evt.preventDefault(); mal schauen.
        keyMap[evt.keyCode] = evt.type == "keydown";
          if(keyMap[17]&&keyMap[89]){
            undo(count,image,setcount);
          } 
            switch(evt.key){
              case "d": clearLastLine();
              break;
              case "z": if(count > 1) redo(count,image,setcount);
              break;
            }
        }

        canvas.addEventListener('pointerdown',handleStart,false);
        canvas.addEventListener('pointerup',handleEnd.bind(brushOptions),false);
        canvas.addEventListener('pointermove',handleMove.bind(brushOptions),false);
        canvas.addEventListener('pointercancel', handleCancel,false);
        document.addEventListener("keydown", keyOptions, false);

        // Do not forget to remove eventlisteners!

        return () => {
          canvas.removeEventListener('pointerdown',handleStart,false);
          canvas.removeEventListener('pointerup',handleEnd.bind(brushOptions),false);
          canvas.removeEventListener('pointermove',handleMove.bind(brushOptions),false);
          canvas.removeEventListener('pointercancel', handleCancel,false);
          document.removeEventListener("keydown", keyOptions, false);
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
        <canvas id="backgroundLayer"></canvas>
</div>
    </div>)
}