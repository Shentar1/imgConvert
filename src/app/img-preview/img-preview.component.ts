import { XmlParser } from '@angular/compiler';
import { Component, contentChild, Input} from '@angular/core';

@Component({
  selector: 'imgPreview',
  imports: [],
  templateUrl: './img-preview.component.html',
  styleUrl: './img-preview.component.css'
})
export class ImgPreviewComponent {
  @Input() recoloredImage?:Element;

  public insertSVG(e:Element){
    let container = document.getElementById('imgContainer');
    if(container){
      container.innerHTML = '';
      container.appendChild(e);
    }
  };
  
}