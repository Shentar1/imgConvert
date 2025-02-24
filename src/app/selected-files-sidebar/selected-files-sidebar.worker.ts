/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const item = data.item;
  //define valid upload types for security and application stability
  let validFiles = ['image/bmp','image/img','image/png','image/jpeg','image/webp','image/vnd.microsoft.com','image/svg+xml']
  //open a file reader for each image
  const fr = new FileReader();
  fr.onload = (e)=>{
      postMessage(e.target?.result as string)
    }
  if(validFiles.includes(item.type)){
    fr.readAsDataURL(item as Blob)
  }
});
