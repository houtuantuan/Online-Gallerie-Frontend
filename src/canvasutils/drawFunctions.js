export const stroke = (evt,ctx,color,idx,ongoingTouches,brushOptions) => {

  const y = evt.target.parentNode.offsetTop;
  const x = evt.target.parentNode.offsetLeft;
  
  ctx.beginPath();
  ctx.moveTo(ongoingTouches[idx].layerX -x, ongoingTouches[idx].layerY -y);
  ctx.lineTo(evt.layerX -x, evt.layerY -y +brushOptions.brushSize -1);

  ctx.lineWidth = brushOptions.brushSize;
  
  ctx.strokeStyle = color;
  ctx.stroke();
}