export const stroke = (evt,ctx,idx,ongoingTouches,brushOptions) => {

  const y = evt.target.parentNode.offsetTop;
  const x = evt.target.parentNode.offsetLeft;
  
  ctx.beginPath();
  ctx.moveTo(ongoingTouches[idx].layerX, ongoingTouches[idx].layerY);
  ctx.lineTo(evt.layerX, evt.layerY);

  ctx.lineWidth = brushOptions.brushSize;
  
  ctx.strokeStyle = brushOptions.brushColor;
  ctx.stroke();
}