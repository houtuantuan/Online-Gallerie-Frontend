import {useEffect,useState} from 'react';
import { stroke } from '../../canvasutils/drawFunctions';
import { setCtx } from '../../canvasutils/canvas';
import { useDispatch, useSelector } from 'react-redux'
import { addUri, sliceUriList, selectCanvasUri } from '../../redux/canvasSlice'
import {redo,undo} from '../../canvasutils/buttonfunctions';


// import { setCtx,copyTouch,ongoingTouchIndexById, ongoingTouches } from '../canvasutils/drawFunctions';

export default ({brushOptions}) => {

  const dispatch = useDispatch();
  const image = useSelector(selectCanvasUri);
  const[count,setcount] = useState(1);  
  const[canvasObject,setCanvasObject] = useState({});

  console.log(count);

 
  useEffect(() => {
    
    const canvas = document.querySelector('canvas');
    canvas.width = 620;
    canvas.height = 576;
    const ctx = setCtx();
    ctx.strokeRect(0,0,canvas.width,canvas.height);
  },[]);

  useEffect(() => {


    const canvas = document.querySelector('canvas');
    const ctx = setCtx();

      const ongoingTouches = []; 

      // const canvas = document.querySelector('canvas');
      // canvas.width = 808;
      // canvas.height = 576;
      // const ctx = setCtx();

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
            const ctx = setCtx();
              ongoingTouches.push(copyTouch(evt));
              const color = colorForTouch(evt);
              ctx.beginPath();
              ctx.fillStyle = color;
              ctx.fill();
          }
        
          function handleMove(evt) {

            // const color = colorForTouch(evt);
          
            evt.preventDefault();
          
          const ctx = setCtx();
            const idx = ongoingTouchIndexById(evt.pointerId);

            if (idx >= 0) {

              stroke(evt,ctx,idx, ongoingTouches,brushOptions);
          
              ongoingTouches.splice(idx, 1, copyTouch(evt)); // swap in the new touch record
            } else {
            }
            
       
          }
        
          function handleEnd(evt) {
            evt.preventDefault();
          
          const ctx = setCtx();
            const idx = ongoingTouchIndexById(evt.pointerId);
            
            if (idx >= 0) {
              
              const y = evt.target.parentNode.offsetTop;
              const x = evt.target.parentNode.offsetLeft;
              
              ctx.lineWidth = brushOptions.brushSize;
              
              ctx.fillStyle = brushOptions.brushColor;
              // ctx.lineCap = "round";
              ctx.beginPath();
              ctx.moveTo(ongoingTouches[idx].layerX -x, ongoingTouches[idx].layerY-y);
              ctx.lineTo(evt.layerX -x, evt.layerY -y);
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
        
        evt.preventDefault();
            console.log(evt.key);
            switch(evt.key){
              case "d": clearLastLine();
              break;
              case "y": undo(count,image,setcount);
              break;
              case "z": if(count > 1) redo(count,image,setcount);
              break;
            }
        }

        canvas.addEventListener('pointerdown',handleStart,false);
        canvas.addEventListener('pointerup',handleEnd.bind(brushOptions),false);
        canvas.addEventListener('pointermove',handleMove.bind(brushOptions),false);
        canvas.addEventListener('pointercancel', handleCancel,false);
        document.addEventListener("keyup", keyOptions, false);


        // Do not forget to remove eventlisteners!

        return () => {
          canvas.removeEventListener('pointerdown',handleStart,false);
          canvas.removeEventListener('pointerup',handleEnd.bind(brushOptions),false);
          canvas.removeEventListener('pointermove',handleMove.bind(brushOptions),false);
          canvas.removeEventListener('pointercancel', handleCancel,false);
          document.removeEventListener("keyup", keyOptions, false);
        };
       
    })

    return(<div>
<div className="optionPanel">
  <div><button onClick={(evt)=> undo(count,image,setcount)}>&lt;</button>
  <button onClick={(evt)=>redo(count,image,setcount)} disabled={(count>1)?false:true}  >&gt;</button></div>
</div>
<div className="Canvaspostion">
        <canvas id="canvas"></canvas>
</div>
        
        <h2>Anleitung: </h2>
        <p>Press y to return to last state of Image</p>
        <p>Press z to return to recent state of Image</p>
        <p>press d to delete Canvas</p>

    </div>)
}