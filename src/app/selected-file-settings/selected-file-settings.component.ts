import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FileObject } from '../Classes/FileObject';
import { potrace, init} from 'esm-potrace-wasm'

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
  }
  /**
   * outputs
   */
  @Output() RecolouredImageEmitter = new EventEmitter<Element>;
  /**
   * inputs
   */
  @Input() selectedFile?:FileObject;
  /**
   * class properties - public get,private set
   */

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
    this.estimateLayers();
  }
  public startingColorChanged(s:string){
    this.imageSettings.startingColorChanged(s)
    this.estimateLayers()
  }
  private async initPotrace(){
    await init();
  }
  private async recolorImage(imgString?:string,similarity?:number,startingColor?:Array<number>){{
    if(imgString && similarity && startingColor){
      try{
        console.log(similarity);
        const img = new Image();
        img.src = imgString;
        var parser = new DOMParser();
        const svg = await potrace(img,{
          turdsize:similarity,
          turnpolicy:4,
          alphamax:0,
          opticurve:1,
          opttolerance:0.2,
          pathonly:false,
          extractcolors:false,
          posterizelevel:0,
          posterizationalgorithmn:0,
        });
        let e = parser.parseFromString(svg, "image/svg+xml").firstElementChild;
        if(e){
          this.RecolouredImageEmitter.emit(e);
        }else{
          console.log(e)
        }
      }catch(e){
        console.log(e)
      }
    }
  }}
  private estimateLayers(){
    let layerCount = 0;
    let startingRed = this.imageSettings.startingColor.substring(1,3);
    let startingBlue = this.imageSettings.startingColor.substring(3,5);
    let startingGreen = this.imageSettings.startingColor.substring(5,7);
    try{
      let blue = parseInt("0x"+startingBlue);
      let red = parseInt("0x"+startingRed);
      let green = parseInt("0x"+startingGreen);
      this.imageSettings.layersToCreate = layerCount;
      this.recolorImage(this.selectedFile?.source,Math.ceil(this.imageSettings.colorSimilarity),[red, blue, green]);
    }catch(e){
      console.log(e)
    }
  }
}
class SettingsObject{
  /**
   * class properties - public get, private set
   */
  private _startingColor = '#888888';
  public get startingColor():string{
    return this._startingColor;
  }
  private set startingColor(s:string){
    this._startingColor = s;
  }
  private _colorSimilarity = 25;
  public get colorSimilarity():number{
    return this._colorSimilarity;
  }
  private _layersToCreate = 4;
  public get layersToCreate():number{
    return this._layersToCreate;
  }
  set layersToCreate(n:number){
    this._layersToCreate = n
  }
  private set colorSimilarity(n:number){
    this._colorSimilarity=n;
  }
  private _outputFormat = '';
  public get outputFormat():string{
    return this._outputFormat;
  }
  private set outputFormat(s:string){
    this._outputFormat = s;
  }
  public colorSimilarityChanged(s:string){
    this.colorSimilarity = parseInt(s);
  }
  public startingColorChanged(s:string){
    this.startingColor = s;
  }
}