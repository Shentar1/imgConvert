import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FileObject } from '../Classes/FileObject';

@Component({
  selector: 'selectedFileSettings',
  imports: [],
  templateUrl: './selected-file-settings.component.html',
  styleUrl: './selected-file-settings.component.css'
})
export class SelectedFileSettingsComponent {
  /**
   * outputs
   */
  @Output() RecolouredImageEmitter = new EventEmitter<Array<string>>;
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
  private recolorImage(imgString?:string,similarity?:number,startingColor?:Array<number>){{
    if(imgString && similarity && startingColor){
      try{
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get canvas context');

        const img = new Image();
        img.src = imgString;
        canvas.width = img.width;
        canvas.height = img.height;
        new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        const layers = new Map<string, ImageData>();
        for (let i = 0; i < data.length; i += 4) {
          const red = data[i];
          const green = data[i + 1];
          const blue = data[i + 2];

          const preserveColor = (color: number) => Math.min(255, Math.max(0, color));

          const newRed = preserveColor(Math.round(red / similarity) * similarity);
          const newGreen = preserveColor(Math.round(green / similarity) * similarity);
          const newBlue = preserveColor(Math.round(blue / similarity) * similarity);

          const colorKey = `${newRed},${newGreen},${newBlue}`;
          if (!layers.has(colorKey)) {
            layers.set(colorKey, ctx.createImageData(canvas.width, canvas.height));
          }

          const layerData = layers.get(colorKey)!.data;
          layerData[i] = newRed;
          layerData[i + 1] = newGreen;
          layerData[i + 2] = newBlue;
          layerData[i + 3] = data[i + 3]; // copy alpha channel
        }
        let recoloredImage = new Array<string>;
        layers.forEach((layerData, colorKey) => {
          ctx.putImageData(layerData, 0, 0);
          const layerImage = canvas.toDataURL();
          recoloredImage.push(layerImage);
        });
        this.RecolouredImageEmitter.emit(recoloredImage);
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
      this.recolorImage(this.selectedFile?.source,Math.ceil(this.imageSettings.colorSimilarity*2.56),[red, blue, green]);
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