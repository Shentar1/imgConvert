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
          let validFiles = ['image/bmp','image/img','image/png','image/jpeg','image/webp','image/vnd.microsoft.com','image/svg+xml']
          var itemWidth = 0;
          var itemHeight = 0;
          var preview = "";
          const fr = new FileReader();
          fr.onload = (e)=>{
            let img = new Image();
            img.onload = ()=>{
              preview = e.target?.result as string;
              itemHeight = img.height;
              itemWidth = img.width;
              console.log(itemHeight);
              console.log(itemWidth);
              console.log(preview);
              this.files.unshift({
                name:item.name,
                path:item.webkitRelativePath,
                width:itemWidth,
                height:itemHeight,
                preview:preview
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
