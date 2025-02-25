import { Component } from '@angular/core';

@Component({
  selector: 'selectedFilesSidebar ',
  imports: [],
  templateUrl: './selected-files-sidebar.component.html',
  styleUrl: './selected-files-sidebar.component.css'
})
export class SelectedFilesSidebarComponent {
  private _files = new Array;
  public get files(){
    return this._files;
  }
  private _totalFileSize = 0;
  public get totalFileSize(){
    return this._totalFileSize;
  }
  private set totalFileSize(total:number){
    this._totalFileSize = total;
  }
  //remove default handling of drag events, since we don't want to open a bunch of tabs
  dragOver(event:DragEvent){
    event.preventDefault();
    event.stopPropagation();
  }
  //handle adding the file information to the array of files
  //this will let us  retrieve the files as needed instead of trying to hold them all in memory and running out (possible)
  itemDropped(event:DragEvent){

    const items = event.dataTransfer?.files
    //remove default handling of drop events, since we still don't want to open a bunch of tabs
    event.preventDefault();
    event.stopPropagation();
    if(items){
      Array.from(items).forEach((item)=>{
        if(item){
          //use a web-worker to offload processing from the browser
          if (typeof Worker !== 'undefined') {
            // Create a new worker
            let worker = new Worker(new URL('./selected-files-sidebar.worker', import.meta.url));
            worker.onmessage = (data) => {
              let img = new Image();
              img.onload=()=>{
                if(this.files.length < 50 && item.size + this.totalFileSize <= 100000000){
                  //get the image in the form of a URL
                  var preview = data.data as string;
                  var itemHeight = img.height;
                  var itemWidth = img.width;
                  //resize image for thumbnail display
                  if(img.height < img.width){
                    img.height = img.height/(img.width/50);
                    img.width = img.width/(img.width/50);
                  }else{
                    img.width = img.width/(img.height/43);
                    img.height = img.height/(img.height/43);
                  }
                  //add all image details to the files array
                  this.files.push({
                    name:item.name,
                    size:item.size/1000000,
                    width:itemWidth,
                    height:itemHeight,
                    preview:preview,
                    icoHeight:img.height,
                    icoWidth:img.width,
                  })
                  //add file size to the total
                  this.totalFileSize += item.size;
                }else if (this.files.length < 50){
                  console.log('Attempted to load more than 50 files. Please remove some, or upload less, and try again.');
                }else{
                  console.log('Attempted to load files that would total over 100MB. Please remove some, resize the files, or upload fewer, and try again.');
                }
              }
              
              img.src = data.data;
            };
            worker.postMessage({item});
          } else {
            //fallback if the environment does not support web workers
            //open a file reader for each image
            const fr = new FileReader();
            fr.onload = (e)=>{
              let img = new Image();
              img.onload = ()=>{
                if(this.files.length < 50 && this.totalFileSize <= 100000000){
                  //get the image in the form of a URL
                  var preview = e.target?.result as string;
                  var itemHeight = img.height;
                  var itemWidth = img.width;
                  //resize image for thumbnail display
                  if(img.height < img.width){
                    img.height = img.height/(img.width/50);
                    img.width = img.width/(img.width/50);
                  }else{
                    img.width = img.width/(img.height/43);
                    img.height = img.height/(img.height/43);
                  }
                  //add all image details to the files array
                  this.files.push({
                    name:item.name,
                    size:item.size/1000000,
                    width:itemWidth,
                    height:itemHeight,
                    preview:preview,
                    icoHeight:img.height,
                    icoWidth:img.width,
                  })
                  //add file size to the total
                  this.totalFileSize += item.size;
                }else if (this.files.length < 50){
                  //placeholder for a message shown to user
                  console.log('Attempted to load more than 50 files. Please remove some, or upload less, and try again.');
                }else{
                  //placeholder for a message shown to user
                  console.log('Attempted to load files that would total over 100MB. Please remove some, resize the files, or upload fewer, and try again.');
                }
              }
              img.src = e.target?.result as string;
            }
          }
        }
      })
    }
  }
}