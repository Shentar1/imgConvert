import { Component } from '@angular/core';

@Component({
  selector: 'selectedFilesSidebar ',
  imports: [],
  templateUrl: './selected-files-sidebar.component.html',
  styleUrl: './selected-files-sidebar.component.css'
})
export class SelectedFilesSidebarComponent {
  files = new Array;
  //remove default handling of drag events, since we don't want to open a bunch of tabs
  dragOver(event:DragEvent){
    event.preventDefault();
    event.stopPropagation();
  }
  //handle adding the file information to the array of files
  //this will let us  retrieve the files as needed instead of trying to hold them all in memory and running out (possible)
  itemDropped(event:DragEvent){
    const items = event.dataTransfer?.files
    event.preventDefault();
    event.stopPropagation();
    let fr = new FileReader;
    if(items){
      Array.from(items).forEach((item)=>{
        if(item){
          //define valid upload types for security and application stability
          let validFiles = ['image/bmp','image/img','image/png','image/jpeg','image/webp','image/vnd.microsoft.com','image/svg+xml']
          //open a file reader for each image
          const fr = new FileReader();
          fr.onload = (e)=>{
            let img = new Image();
            img.onload = ()=>{
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
              this.files.unshift({
                name:item.name,
                size:((item.size/1024)/1024).toFixed(2).toString() + "MB",
                width:itemWidth,
                height:itemHeight,
                preview:preview,
                icoHeight:img.height,
                icoWidth:img.width,
              })
            }
            img.src = e.target?.result as string;
          }
          if(item)
          if(validFiles.includes(item.type)){
            fr.readAsDataURL(item as Blob)
          }
        }
      })
    }
  }
}
