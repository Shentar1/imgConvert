import { Component, Input } from '@angular/core';

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
  private _backgroundImage = ''
  public get backgroundImage(){
    return this._backgroundImage;
  }
  private set backgroundImage(s:string){
    this._backgroundImage=s;
  }
  private _backgroundSize = 0;
  public get backgroundSize(){
    return this._backgroundSize;
  }
  private set backgroundSize(n:number){
    this._backgroundSize = n;
  }
  private loadImg(imgString:string,i:File) {
    let img = new Image();
    img.onload=()=>{
      if(this.files.length < 50 && i.size + this.totalFileSize <= 100000000){
        //get the image in the form of a URL
        var preview = imgString as string;
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
          name:i.name,
          size:i.size/1000000,
          width:itemWidth,
          height:itemHeight,
          preview:preview,
          icoHeight:img.height,
          icoWidth:img.width,
        })
        //add file size to the total
        this.totalFileSize += i.size;
        //calculate the end points of a gradient as a visual for how 'full' the application is 
        let backgroundSize = this.totalFileSize/1000000<this.files.length*100/50?this.files.length*100/50:this.totalFileSize/1000000
        let backgroundOpacityEnd = this.totalFileSize/1000000<this.files.length*255/50?Math.round(this.files.length*255/50):Math.round(this.totalFileSize*255/1000000)
        this.backgroundImage = "linear-gradient(to right, #aaa0, #aaaaaaa"+backgroundOpacityEnd.toString(16)+")"
        this.backgroundSize = backgroundSize;
      }else if (this.files.length >= 50){
        console.log('Attempted to load more than 50 files. Please remove some, or upload less, and try again.');
      }else{
        console.log('Attempted to load files that would total over 100MB. Please remove some, resize the files, or upload fewer, and try again.');
      }
    }
    img.src = imgString;
  };

  /**
   * BEGIN EVENT HANDLING SECTION
   */
  //Allows choosing of files from a file picking window
  public openFilePicker(e:Event){
    let target = e?.target as HTMLInputElement;
    if(target.files){
      Array.from(target.files).forEach((item)=>{
        if(item){
          //use a web-worker to offload processing from the browser
          if (typeof Worker !== 'undefined') {
            // Create a new worker
            let worker = new Worker(new URL('./selected-files-sidebar.worker', import.meta.url));
            worker.onmessage = (data) => {
                this.loadImg(data.data, item);
              }
            worker.postMessage({item});
          } else {
            //fallback if the environment does not support web workers
            //open a file reader for each image
            const fr = new FileReader();
            fr.onload = (e)=>{
              if(e){
                this.loadImg(e.target?.result as string, item)
              }
            }
          }
        }
      })
    }
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
                this.loadImg(data.data, item);
              }
            worker.postMessage({item});
          } else {
            //fallback if the environment does not support web workers
            //open a file reader for each image
            const fr = new FileReader();
            fr.onload = (e)=>{
              if(e){
                this.loadImg(e.target?.result as string, item)
              }
            }
          }
        }
      })
    }
  }
}