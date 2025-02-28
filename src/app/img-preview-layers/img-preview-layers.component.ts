import { Component, Input } from '@angular/core';

@Component({
  selector: 'imgPreviewLayers',
  imports: [],
  templateUrl: './img-preview-layers.component.html',
  styleUrl: './img-preview-layers.component.css'
})
export class ImgPreviewLayersComponent {
  @Input() recoloredImage?:Array<string>

  public getLayerDetails(i:number):string{
    let src = "";
    if(this.recoloredImage){
      if(this.recoloredImage[i]){
        src = this.recoloredImage[i]
      }
    }
    return src;
  }
}
