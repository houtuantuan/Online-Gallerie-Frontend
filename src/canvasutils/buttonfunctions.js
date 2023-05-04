export const undo = async (count,image,setcount) => {

    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext("2d");
    let newCount = count +1;
    setcount(newCount);

    ctx.clearRect(1, 1, canvas.width -2, canvas.height -2); 
    const img = new Image(); 
    const url = image[image.length-1-count];
    await new Promise(r => img.onload=r, img.src=url);
    ctx.drawImage(img,0,0);
  }
  
export const redo = async (count,image,setcount) => {
    

    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext("2d");
    let newCount = count -1;
    setcount(newCount);
    ctx.clearRect(1, 1, canvas.width -2, canvas.height -2); 
    const img = new Image(); 
    const url = image[image.length-count+1];
    await new Promise(r => img.onload=r, img.src=url);
    ctx.drawImage(img,0,0);
  
  }
