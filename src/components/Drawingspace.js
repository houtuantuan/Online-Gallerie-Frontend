import {useEffect} from 'react';
// import { setCtx,copyTouch,ongoingTouchIndexById, ongoingTouches } from '../canvasutils/drawFunctions';

export default ({brushOptions}) => {


  useEffect(() => {
    return () => {
    };
  },[]);

  useEffect(() => {

      const ongoingTouches = [];
            
      function setCtx(){
        const el = document.getElementById("canvas");
        const ctx = el.getContext("2d");
        return ctx;
      }
   
      const canvas = document.querySelector('canvas');
        const ctx = setCtx();
        canvas.width = 808;
        canvas.height = 576;
        ctx.strokeRect(0,0,canvas.width,canvas.height);

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
          
          function colorForTouch(touch) {
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

            evt.preventDefault();
          
          const ctx = setCtx();
            const color = colorForTouch(evt);
            const idx = ongoingTouchIndexById(evt.pointerId);

            if (idx >= 0) {
              const y = evt.target.parentNode.offsetTop;
              const x = evt.target.parentNode.offsetLeft;

              ctx.beginPath();
              ctx.moveTo(ongoingTouches[idx].layerX -x, ongoingTouches[idx].layerY -y);
              ctx.lineTo(evt.layerX -x, evt.layerY -y +brushOptions.brushSize -1);
              ctx.lineWidth = brushOptions.brushSize;
              
              ctx.strokeStyle = color;
              ctx.stroke();
          
              ongoingTouches.splice(idx, 1, copyTouch(evt)); // swap in the new touch record
            } else {
            }
            
          }
        
          function handleEnd(evt) {
            evt.preventDefault();
          
          const ctx = setCtx();
            const color = colorForTouch(evt);
            const idx = ongoingTouchIndexById(evt.pointerId);
            
            
            if (idx >= 0) {
              
              const y = evt.target.parentNode.offsetTop;
              const x = evt.target.parentNode.offsetLeft;
              
              ctx.lineWidth = brushOptions.brushSize;
              
              ctx.fillStyle = color;
              // ctx.lineCap = "round";
              ctx.beginPath();
              ctx.moveTo(ongoingTouches[idx].layerX -x, ongoingTouches[idx].layerY-y);
              ctx.lineTo(evt.layerX -x, evt.layerY -y);
              ongoingTouches.splice(idx, 1); // remove it; we're done
            } else {
            }
          }
        
          function handleCancel(evt) {
            evt.preventDefault();         
            const idx = ongoingTouchIndexById(evt.pointerId);
            ongoingTouches.splice(idx, 1); // remove it; we're done
          }

                
        canvas.addEventListener('pointerdown',handleStart,false);
        canvas.addEventListener('pointerup',handleEnd.bind(brushOptions),false);
        canvas.addEventListener('pointermove',handleMove.bind(brushOptions),false);
        canvas.addEventListener('pointercancel', handleCancel,false);

       

        document.addEventListener("keydown", clearlastline);
        
        function clearlastline() {
            ctx.clearRect(1, 1, canvas.width -1, canvas.height -1); 
        }
        
        return () => {
          canvas.removeEventListener('pointerdown',handleStart,false);
          canvas.removeEventListener('pointerup',handleEnd.bind(brushOptions),false);
          canvas.removeEventListener('pointermove',handleMove.bind(brushOptions),false);
          canvas.removeEventListener('pointercancel', handleCancel,false);
  
        };
       
    })

    return(<div>
        <canvas id="canvas"></canvas>
    </div>)
}