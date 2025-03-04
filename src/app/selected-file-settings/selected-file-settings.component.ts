import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FileObject } from '../Classes/FileObject';
import { SettingsObject } from '../Classes/SettingsObject';
import { potrace, init} from 'esm-potrace-wasm'
import { GenerateSVGService } from '../generate-svg.service';

@Component({
  selector: 'selectedFileSettings',
  imports: [],
  templateUrl: './selected-file-settings.component.html',
  styleUrl: './selected-file-settings.component.css'
})
export class SelectedFileSettingsComponent {
  /**
   * constructor
   */
    public constructor(){
    this.initPotrace();
    this._settingsArray = new Array<SettingsObject>();
    this._imageSettings = new SettingsObject();
    this.generateSVGService = inject(GenerateSVGService);
  }
  /**
   * outputs
   */
  @Output() RecolouredImageEmitter = new EventEmitter<SVGSVGElement>;
  /**
   * inputs
   */
  @Input() selectedFile?:FileObject;
  /**
   * class properties - public get,private set
   */
  private generateSVGService:GenerateSVGService;
  private _settingsArray:Array<SettingsObject>;
  public get settingsArray(){
    return this._settingsArray;
  }
  private set settingsArray(settingsArray:Array<SettingsObject>){
    this._settingsArray = settingsArray;
  }
  private _imageSettings:SettingsObject;
  public get imageSettings(){
    return this._imageSettings;
  }
  private set imageSettings(settings:SettingsObject){
    this._imageSettings=settings;
  }
  public colorSimilarityChanged(s:string){  
    this.imageSettings.colorSimilarityChanged(s);
    if(this.selectedFile){
      this.recolorImage(this.selectedFile.source, this.imageSettings.colorSimilarity, this.imageSettings.backgroundColor);
    }
  }
  public startingColorChanged(s:string){
    this.imageSettings.startingColorChanged(s)
    if(this.selectedFile){
      this.recolorImage(this.selectedFile?.source, this.imageSettings.colorSimilarity, this.imageSettings.backgroundColor);
    }
  }
  private async initPotrace(){
    await init();
  }
  private async recolorImage(imgString:string,similarity:number,backgroundColor:string){
    this.generateSVGService.traceImage(this.imageSettings,imgString,similarity,backgroundColor)
  }
}