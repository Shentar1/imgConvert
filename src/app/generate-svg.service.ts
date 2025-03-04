import { Injectable } from '@angular/core';
import { FileObject } from './Classes/FileObject';
import { SettingsObject } from './Classes/SettingsObject';
import { potrace, init} from 'esm-potrace-wasm'
import { FormArrayName } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GenerateSVGService {

  public files:Array<FileObject> = [];
  public totalFileSize:number = 0;
  public backgroundImage:string = '';
  public backgroundSize:number = 0;
  private backgroundOpacityEnd:number = 0;
  public svgElement:SVGSVGElement = document.createElementNS('http://www.w3.org/2000/svg','svg');
  public svgElementLayers?:HTMLCollection;
  public viewBoxSize = '0 0 0 0';
  public loadImg:Function = (imgString:string, i:File)=>{
    let img = new Image();
    let loadedImg:Object;
    img.onload=()=> {
      if(this.files.length < 50 && i.size + this.totalFileSize <= 100000000){
        //get the image in the form of a URL
        var source = imgString as string;
        // compress image data to a maximum of 500x500 pixels, maintaining aspect ratio
        const maxDimension = 1000;
        let itemHeight = img.height;
        let itemWidth = img.width;
        if (itemHeight > maxDimension || itemWidth > maxDimension) {
          if (itemHeight > itemWidth) {
            itemWidth = (itemWidth / itemHeight) * maxDimension;
            itemHeight = maxDimension;
          } else {
            itemHeight = (itemHeight / itemWidth) * maxDimension;
            itemWidth = maxDimension;
          }
        }
        // Create a canvas to resize the image
        const canvas = document.createElement('canvas');
        canvas.width = itemWidth;
        canvas.height = itemHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, itemWidth, itemHeight);
          // Get the resized image data
          var source = canvas.toDataURL('image/jpeg', 0.7); // Adjust the quality as needed
        }
        //resize image for thumbnail display
        if(img.height < img.width){
          img.height = img.height/(img.width/50);
          img.width = img.width/(img.width/50);
        }else{
          img.width = img.width/(img.height/43);
          img.height = img.height/(img.height/43);
        }
        //add all image details to the files array
        this.files.push(new FileObject(i.name,i.size,itemWidth,itemHeight, source, img.height, img.width))
        //add file size to the total
        this.totalFileSize += i.size/1000000;
        //calculate the end points of a gradient as a visual for how 'full' the application is 
        this.backgroundSize = this.totalFileSize/1000000<this.files.length*100/50?this.files.length*100/50:this.totalFileSize/1000000
        this.backgroundOpacityEnd = this.totalFileSize/1000000<this.files.length*255/50?Math.round(this.files.length*255/50):Math.round(this.totalFileSize*255/1000000)
        this.backgroundImage = "linear-gradient(to right, #aaa0, #aaaaaaa"+this.backgroundOpacityEnd.toString(16)+")"
      }else if (this.files.length >= 50){
        console.log('Attempted to load more than 50 files. Please remove some, or upload less, and try again.');
      }else{
        console.log('Attempted to load files that would total over 100MB. Please remove some, resize the files, or upload fewer, and try again.');
      }
    }
    img.src = imgString;
  }
  public removeFile(n:number){
    if(this.files[n]){
      this.totalFileSize -= this.files[n].size;
      this.files.splice(n,1);
      this.backgroundSize = this.totalFileSize/1000000<this.files.length*100/50?this.files.length*100/50:this.totalFileSize/1000000
      this.backgroundOpacityEnd = this.totalFileSize/1000000<this.files.length*255/50?Math.round(this.files.length*255/50):Math.round(this.totalFileSize*255/1000000)
      this.backgroundImage = "linear-gradient(to right, #aaa0, #aaaaaaa"+this.backgroundOpacityEnd.toString(16)+")"
    }
  }
  public async traceImage(imageSettings:SettingsObject,imgString:string,similarity:number,backgroundColor:string){
    let startingRed = imageSettings.backgroundColor.substring(1,3);
    let startingBlue = imageSettings.backgroundColor.substring(3,5);
    let startingGreen = imageSettings.backgroundColor.substring(5,7);
    try{
      let blue = parseInt("0x"+startingBlue);
      let red = parseInt("0x"+startingRed);
      let green = parseInt("0x"+startingGreen);
      if(imgString && similarity && backgroundColor){
        const img = new Image();
        img.src = imgString;
        this.viewBoxSize = "0 0 " + img.width + " " + img.height;
        var parser = new DOMParser();
        const svg = await potrace(img,{
          turdsize:1,
          posterizelevel:similarity,
          posterizationalgorithm:0
        });
        let e = await parser.parseFromString(svg, "image/svg+xml").firstElementChild;
        if(e){
          this.svgElement = e as SVGSVGElement;
        }
      }
    }catch(e){
      console.log(e)
    }
  }
  constructor() { }
}
