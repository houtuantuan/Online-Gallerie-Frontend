
export const ongoingTouches = [];


export function setCtx(){
    const el = document.getElementById("canvas");
    const ctx = el.getContext("2d");
    return ctx;
  }
export  function copyTouch(touch) {
  // console.log(touch);
  return {
    identifier: touch.pointerId,
    pageX: touch.clientX,
    pageY: touch.clientY,
    layerX: touch.layerX,
    layerY: touch.layerY
  };
}

  export  function ongoingTouchIndexById(idToFind) {
    for (let i = 0; i < ongoingTouches.length; i++) {
      const id = ongoingTouches[i].identifier;
  
      if (id === idToFind) {
        return i;
      }
    }
    return -1; // not found
  }

  