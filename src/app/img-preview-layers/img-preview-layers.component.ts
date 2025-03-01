import { Component, Input } from '@angular/core';

@Component({
  selector: 'imgPreviewLayers',
  imports: [],
  templateUrl: './img-preview-layers.component.html',
  styleUrl: './img-preview-layers.component.css'
})
export class ImgPreviewLayersComponent {
  @Input() recoloredImage?:Element;

  public insertSVGPaths?:Function;
  ngOnInit(){
    /*this.insertSVGPaths = (e:Element)=>{
      let container = document.getElementById('imgContainer');
      if(e.children.length > 1){
        for(let i = 0; i < e.children.length; i++){
          let layer = document.createElement('svg')
          layer.appendChild(e.children[i]);
          container?.appendChild(layer);
        }
      }
    };*/
  }
}
