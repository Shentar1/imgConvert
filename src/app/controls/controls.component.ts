import { Component, inject } from '@angular/core';
import { GenerateSVGService } from '../generate-svg.service';
import { ThisReceiver } from '@angular/compiler';
import { SettingsObject } from '../Classes/SettingsObject';

@Component({
  selector: 'controls',
  imports: [],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.css'
})
export class ControlsComponent {
  private generateSVGService = inject(GenerateSVGService);

  controlButtonMouseDown(e:HTMLElement){
    e.style.boxShadow = "#111 1px 1px 10px 1px inset"
  }
  controlButtonMouseUp(e:HTMLElement){
    e.style.boxShadow = "#111 1px 1px 10px 1px"
  }
  protected convertClicked(){
    if(this.generateSVGService.selectedFile)
    this.generateSVGService.traceImage(this.generateSVGService.selectedFile.source ,this.generateSVGService.imageSettings.colorSimilarity)
  }
  protected resetClicked(){
    if(this.generateSVGService.imageSettings)
      this.generateSVGService.imageSettings.resetOptions();
  }
}
