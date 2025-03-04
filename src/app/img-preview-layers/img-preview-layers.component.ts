import { Component, inject} from '@angular/core';
import { GenerateSVGService } from '../generate-svg.service';

@Component({
  selector: 'imgPreviewLayers',
  imports: [],
  templateUrl: './img-preview-layers.component.html',
  styleUrl: './img-preview-layers.component.css'
})
export class ImgPreviewLayersComponent {
  generateSVGService = inject(GenerateSVGService);
  protected appendLayer(e:Element, p:HTMLElement){
    p.innerHTML = e.outerHTML;
  }
}
