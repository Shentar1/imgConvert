import { Injectable } from '@angular/core';
import { FileObject } from './Classes/FileObject';
import { SettingsObject } from './Classes/SettingsObject';
import { potrace} from 'esm-potrace-wasm'
import * as save from 'file-saver'

@Injectable({
  providedIn: 'root'
})
export class GenerateSVGService {

  public files:Array<FileObject> = [];
  public totalFileSize:number = 0;
  public backgroundImage:string = '';
  public backgroundSize:number = 0;
  public svgElement:SVGSVGElement = document.createElementNS('http://www.w3.org/2000/svg','svg');
  public svgElementLayers?:HTMLCollection;
  public viewBoxSize = '0 0 0 0';
  public imageSettings:SettingsObject = new SettingsObject();
  public selectedFile?:FileObject;
  public loadImg:Function = (imgString:string, i:File, index:number)=>{
    let img = new Image();
    img.onload=()=> {
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
      this.files.push(new FileObject(i.name,i.size,itemWidth,itemHeight, source, img.height, img.width, index))
      //add file size to the total
      this.totalFileSize += i.size/1000000;
    }
    img.src = imgString;
  }
  public removeFile(n:number){
    if(this.files[n]){
      this.totalFileSize -= this.files[n].size/1000000;
      this.files.splice(n,1);
     }
     else{
      console.log('nothing to remove');
     }
  }
  //use potrace to create a new SVG from the image file
  public async traceImage(imgString:string,similarity:number){
    try{
      if(imgString && similarity){
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
  public saveSVG(){
    if (this.svgElement && this.selectedFile) {
      let blob = new Blob([this.svgElement.outerHTML], {type: 'image/svg+xml'})
      if(blob){
        save.default(blob,this.selectedFile.name);
        console.log('saved');
      }
    } else {
      console.log('no SVG created yet');
    }
  }
  constructor() { }
}
