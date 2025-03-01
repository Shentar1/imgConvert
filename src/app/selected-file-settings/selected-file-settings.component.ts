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
  private async recolorImage(imgString?:string,similarity?:number,backgroundColor?:Array<number>){{
    if(imgString && similarity && backgroundColor){
      try{
        const img = new Image();
        img.src = imgString;
        var parser = new DOMParser();
        const svg = await potrace(img,{
          turdsize:similarity,
          posterizelevel:1,
          posterizationalgorithm:0
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
    let startingRed = this.imageSettings.backgroundColor.substring(1,3);
    let startingBlue = this.imageSettings.backgroundColor.substring(3,5);
    let startingGreen = this.imageSettings.backgroundColor.substring(5,7);
    try{
      let blue = parseInt("0x"+startingBlue);
      let red = parseInt("0x"+startingRed);
      let green = parseInt("0x"+startingGreen);
      this.recolorImage(this.selectedFile?.source,Math.ceil(this.imageSettings.colorSimilarity),[red, green, blue]);
    }catch(e){
      console.log(e)
    }
  }
}
class SettingsObject{
  /**
   * class properties - public get, private set
   */
  private _backgroundColor = '#888888';
  public get backgroundColor():string{
    return this._backgroundColor;
  }
  private set startingColor(s:string){
    this._backgroundColor = s;
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