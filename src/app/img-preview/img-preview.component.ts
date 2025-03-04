import { Component, inject} from '@angular/core';
import { GenerateSVGService } from '../generate-svg.service';

@Component({
  selector: 'imgPreview',
  imports: [],
  templateUrl: './img-preview.component.html',
  styleUrl: './img-preview.component.css'
})
export class ImgPreviewComponent {
  protected generateSVGService = inject(GenerateSVGService);
  protected appendImage(e:Element, p:Element){
    if(p){
      p.innerHTML = '';
      p.innerHTML = e.outerHTML
    }
  }
}