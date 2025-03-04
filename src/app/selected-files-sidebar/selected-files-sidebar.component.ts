import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FileObject } from '../Classes/FileObject';
import { GenerateSVGService } from '../generate-svg.service';

@Component({
  selector: 'selectedFilesSidebar ',
  imports: [],
  templateUrl: './selected-files-sidebar.component.html',
  styleUrl: './selected-files-sidebar.component.css'
})
export class SelectedFilesSidebarComponent {
  @Output() imageClickedEventEmitter = new EventEmitter<FileObject>
  
  protected generateSVGService = inject(GenerateSVGService);

  /**
   * BEGIN EVENT HANDLING SECTION
   */
  //Process clicked image and send it to imgPreview and selectedFileSettings components
  public imageClicked(n:number){
    if(this.generateSVGService.files[n]){
      this.generateSVGService.selectedFile = this.generateSVGService.files[n]
    }
  }
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
            worker.onmessage = async (data) => {
                await this.generateSVGService.loadImg(data.data, item)
              }
            worker.postMessage({item});
          } else {
            //fallback if the environment does not support web workers
            //open a file reader for each image
            const fr = new FileReader();
            fr.onload = (e)=>{
              if(e){
                this.generateSVGService.loadImg(e.target?.result, item);
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
  }
  //handle adding the file information to the array of files
  //this will let us  retrieve the files as needed instead of trying to hold them all in memory and running out (possible)
  itemDropped(event:DragEvent){
    const items = event.dataTransfer?.files
    //remove default handling of drop events, since we still don't want to open a bunch of tabs
    event.preventDefault();
    if(items){
      Array.from(items).forEach((item)=>{
        if(item){
          //use a web-worker to offload processing from the browser
          if (typeof Worker !== 'undefined') {
            // Create a new worker
            let worker = new Worker(new URL('./selected-files-sidebar.worker', import.meta.url));
            worker.onmessage = async (data) => {
              await this.generateSVGService.loadImg(data.data, item);
              }
            worker.postMessage({item});
          } else {
            //fallback if the environment does not support web workers
            //open a file reader for each image
            const fr = new FileReader();
            fr.onload = (e)=>{
              if(e){
                this.generateSVGService.loadImg(e.target?.result, item);
              }
            }
          }
        }
      })
    }
  }
}