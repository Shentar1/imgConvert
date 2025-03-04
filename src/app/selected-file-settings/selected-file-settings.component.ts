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
  protected generateSVGService:GenerateSVGService;
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
    this.generateSVGService.imageSettings = this.imageSettings;
  }
  public startingColorChanged(s:string){
    this.imageSettings.startingColorChanged(s)
    this.generateSVGService.imageSettings = this.imageSettings;
  }
  private async initPotrace(){
    await init();
  }
}