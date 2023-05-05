export const stroke = (evt,ctx,idx,ongoingTouches,brushOptions) => {

  ctx.beginPath();

  //Idx starts with 0;
  ctx.moveTo(ongoingTouches[idx].layerX, ongoingTouches[idx].layerY);

// curve through the last two ongoingTouches
  ctx.lineTo(evt.layerX, evt.layerY);

  ctx.lineWidth = brushOptions.brushSize;
  
  ctx.strokeStyle = brushOptions.brushColor;
  ctx.stroke();
}