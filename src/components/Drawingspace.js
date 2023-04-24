import {useEffect} from 'react';

export default () => {

    useEffect(() => {

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

        const ongoingTouches = [];


        function copyTouch(touch) {
          console.log(touch);
          return {
            identifier: touch.pointerId,
            pageX: touch.clientX,
            pageY: touch.clientY,
            layerX: touch.layerX,
            layerY: touch.layerY
          };
        }
          
          function colorForTouch(touch) {
            let r = touch.identifier % 16;
            let g = Math.floor(touch.identifier / 3) % 16;
            let b = Math.floor(touch.identifier / 7) % 16;
            r = r.toString(16); // make it a hex digit
            g = g.toString(16); // make it a hex digit
            b = b.toString(16); // make it a hex digit
            // const color = `#${r}${g}${b}`;
            const color ='#000000';
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

            console.log(evt);

            if (idx >= 0) {
              const y = evt.target.parentNode.offsetTop;
              const x = evt.target.parentNode.offsetLeft;
         
              ctx.beginPath();
              ctx.moveTo(ongoingTouches[idx].layerX -x, ongoingTouches[idx].layerY -y);
              ctx.lineTo(evt.layerX -x, evt.layerY -y);
              ctx.lineWidth = 1;
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
              
              ctx.lineWidth = 4;
              ctx.fillStyle = color;
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
        canvas.addEventListener('pointerup',handleEnd,false);
        canvas.addEventListener('pointermove',handleMove,false);
        canvas.addEventListener('pointercancel', handleCancel,false);
        
        document.addEventListener("keydown", clearlastline);
        
        function clearlastline() {
            ctx.clearRect(1, 1, canvas.width -1, canvas.height -1); 
        }
    
    })

    return(<div>
        <canvas id="canvas"></canvas>
    </div>)
}