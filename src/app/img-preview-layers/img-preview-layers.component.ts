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
    let parent = document.querySelector('imgPreviewLayers');
    let g = sender.querySelector('g');
    if(parent && g){
      let s = parent.querySelectorAll('div');
      if(s){
        let siblings = Array.from(s)
        let index = siblings.indexOf(sender as HTMLDivElement);
        if(this.generateSVGService.svgElement.children[index] && this.generateSVGService.svgElement.children[index -1]){
          this.generateSVGService.svgElement.insertBefore(this.generateSVGService.svgElement.children[index], this.generateSVGService.svgElement.children[index -1])
        }
      }
    }
  }
  protected moveDownClicked(e:Event, sender:Element){
    let parent = document.querySelector('imgPreviewLayers');
    let g = sender.querySelector('g');
    if(parent && g){
      let s = parent.querySelectorAll('div');
      if(s){
        let siblings = Array.from(s)
        let index = siblings.indexOf(sender as HTMLDivElement);
        if(this.generateSVGService.svgElement.children[index] && this.generateSVGService.svgElement.children[index + 1]){
          this.generateSVGService.svgElement.insertBefore(this.generateSVGService.svgElement.children[index+1], this.generateSVGService.svgElement.children[index])
        }
      }
    }
  }
  protected mergeUpClicked(e:Event, sender:Element){
    let parent = document.querySelector('imgPreviewLayers')
    let paths = sender.querySelectorAll('path')
    if(parent){
      let siblings = Array.from(parent.querySelectorAll('div'));
      if(siblings){
        let index = siblings.indexOf(sender as HTMLDivElement);
        if(this.generateSVGService.svgElement.children[index-1]){
          paths.forEach(path => {
            this.generateSVGService.svgElement.children[index-  1].innerHTML += path.outerHTML;
          })
          this.generateSVGService.svgElement.removeChild(this.generateSVGService.svgElement.children[index])
        }
      }
    }
  }
  protected mergeDownClicked(e:Event, sender:Element){
    let parent = document.querySelector('imgPreviewLayers')
    let paths = sender.querySelectorAll('path')
    if(parent){
      let siblings = Array.from(parent.querySelectorAll('div'));
      if(siblings){
        let index = siblings.indexOf(sender as HTMLDivElement);
        if(this.generateSVGService.svgElement.children[index+1]){
          paths.forEach(path => {
            this.generateSVGService.svgElement.children[index+1].innerHTML += path.outerHTML;
          })
          this.generateSVGService.svgElement.removeChild(this.generateSVGService.svgElement.children[index])
        }
      }
    }
  }
  protected deleteClicked(e:Event, sender:Element){
    let siblings = document.querySelector('imgPreviewLayers')?.querySelectorAll('div')
    if(siblings){
      let index = Array.from(siblings).indexOf(sender as HTMLDivElement);
      if(this.generateSVGService.svgElement.children[index]){
        this.generateSVGService.svgElement.removeChild(this.generateSVGService.svgElement.children[index])
      }
    }
  }
}
