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
  protected moveUpClicked(e:Event, sender:Element){
    if(sender.parentElement){
      let siblings = Array.from(sender.parentElement.getElementsByTagName('div'));
      let parent = sender.parentElement;
      console.log(siblings);
      for(let i = 1; i<siblings.length; i++){
        if(siblings[i]===sender){
          let currentCopy = sender;
          let previousElementCopy = siblings[i-1];
          siblings[i] = previousElementCopy;
          siblings[i-1] = currentCopy as HTMLDivElement;
          siblings.forEach(element => {
            parent.appendChild(element)
          });
        }
      }
    }
  }
  protected moveDownClicked(e:Event, sender:Element){
    if(sender.parentElement){
      let siblings = Array.from(sender.parentElement.getElementsByTagName('div'));
      let parent = sender.parentElement;
      console.log(siblings);
      for(let i = 0; i<siblings.length-1; i++){
        if(siblings[i]===sender){
          let currentCopy = sender;
          let nextElementCopy = siblings[i+1];
          siblings[i] = nextElementCopy;
          siblings[i+1] = currentCopy as HTMLDivElement;
          siblings.forEach(element => {
            parent.appendChild(element)
          });
          i=Number.MAX_SAFE_INTEGER;
        }
      }
    }
  }
  protected mergeUpClicked(e:Event, sender:Element){

  }
  protected mergeDownClicked(e:Event, sender:Element){

  }
  protected deleteClicked(e:Event, sender:Element){
    
  }
  private refreshSVG(layers:HTMLCollection){

  }
}
