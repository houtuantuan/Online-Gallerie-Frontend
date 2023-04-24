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


        function copyTouch({ identifier, pageX, pageY }) {
            return { identifier, pageX, pageY };
          }
          
          function colorForTouch(touch) {
            let r = touch.identifier % 16;
            let g = Math.floor(touch.identifier / 3) % 16;
            let b = Math.floor(touch.identifier / 7) % 16;
            r = r.toString(16); // make it a hex digit
            g = g.toString(16); // make it a hex digit
            b = b.toString(16); // make it a hex digit
            const color = `#${r}${g}${b}`;
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
            const touches = evt.changedTouches;
          
            for (let i = 0; i < touches.length; i++) {
              ongoingTouches.push(copyTouch(touches[i]));
              const color = colorForTouch(touches[i]);
              ctx.beginPath();
              ctx.fillStyle = color;
              ctx.fill();
            }
          }
        
          function handleMove(evt) {
            evt.preventDefault();
            const ctx = setCtx();
            const touches = evt.changedTouches;
          
            const y = evt.target.parentNode.offsetTop;

        
            
            for (let i = 0; i < touches.length; i++) {
          
              const color = colorForTouch(touches[i]);
              const idx = ongoingTouchIndexById(touches[i].identifier);
          
              if (idx >= 0) {
                ctx.beginPath();
                ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY -y);
                ctx.lineTo(touches[i].pageX, touches[i].pageY -y);
                ctx.lineWidth = 1;
                ctx.strokeStyle = color;
                ctx.stroke();
          
                ongoingTouches.splice(idx, 1, copyTouch(touches[i])); // swap in the new touch record
              } else {
              }
            }
          
        }
        
          function handleEnd(evt) {
            evt.preventDefault();
            const ctx = setCtx();
            const touches = evt.changedTouches;

            for (let i = 0; i < touches.length; i++) {
              const color = colorForTouch(touches[i]);
              let idx = ongoingTouchIndexById(touches[i].identifier);
          
              if (idx >= 0) {
                ctx.lineWidth = 1;
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
                ctx.lineTo(touches[i].pageX, touches[i].pageY);
                ongoingTouches.splice(idx, 1); // remove it; we're done
              } else {
              }
            }
          }
        
          function handleCancel(evt) {
            evt.preventDefault();
            const touches = evt.changedTouches;
          
            for (let i = 0; i < touches.length; i++) {
              let idx = ongoingTouchIndexById(touches[i].identifier);
              ongoingTouches.splice(idx, 1); // remove it; we're done
            }
          }
          
        canvas.addEventListener('pointerdown',handleStart,false);
        canvas.addEventListener('pointerup',handleEnd,false);
        canvas.addEventListener('pointercancel', handleCancel,false);
        canvas.addEventListener('pointermove',handleMove,false);
        
        document.addEventListener("keydown", clearlastline);
        
        function clearlastline() {
            ctx.clearRect(1, 1, canvas.width -1, canvas.height -1); 
        }
    
    })

    return(<div>
        <canvas id="canvas"></canvas>
    </div>)
}