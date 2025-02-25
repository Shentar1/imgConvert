import { Component, Input, IterableDiffers } from '@angular/core';
import { FileObject } from '../Classes/FileObject';

@Component({
  selector: 'selectedFileSettings',
  imports: [],
  templateUrl: './selected-file-settings.component.html',
  styleUrl: './selected-file-settings.component.css'
})
export class SelectedFileSettingsComponent {
  /**
   * inputs
   */
  @Input() selectedFile?:FileObject;
  /**
   * class properties - public get,private set
   */
  private _settingsArray = new Array();
  public get settingsArray(){
    return this._settingsArray;
  }
  private _imageSettings = new SettingsObject();
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
  private estimateLayers(){
    let layerCount = 0;
    let startingRed = this.imageSettings.startingColor.substring(1,3);
    let startingBlue = this.imageSettings.startingColor.substring(3,5);
    let startingGreen = this.imageSettings.startingColor.substring(5,7);
    try{
      let blue = parseInt("0x"+startingBlue);
      let red = parseInt("0x"+startingRed);
      let green = parseInt("0x"+startingGreen);
      layerCount = Math.ceil(256 / (this.imageSettings.colorSimilarity*256/100));
      this.imageSettings.layersToCreate = layerCount;
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