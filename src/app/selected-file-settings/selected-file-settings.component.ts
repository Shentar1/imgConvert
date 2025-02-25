import { Component } from '@angular/core';

@Component({
  selector: 'selectedFileSettings',
  imports: [],
  templateUrl: './selected-file-settings.component.html',
  styleUrl: './selected-file-settings.component.css'
})
export class SelectedFileSettingsComponent {
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
}
class SettingsObject{
  /**
   * class properties - public get, private set
   */
  private _name = '';
  
  public get name() : string {
    return this._name 
  }
  private set name(s:string){
    this.name = s;
  }
  private _size = 0;
  public get size():number{
    return this._size;
  }
  private set size(n:number){
    this._size=n
  }
  private _height = 0;
  public get height():number{
    return this._height;
  }
  private set height(n:number){
    this._height= n;
  }
  private _width = 0;
  public get width():number{
    return this._width;
  }
  private set width(n:number){
    this._width = n;
  }
  private _source = '';
  public get source():string{
    return this._source;
  }
  private set source(s:string){
    this._source = s;
  }
  private _startingColor = '';
  public get startingColor():string{
    return this._startingColor;
  }
  private set startingColor(s:string){
    this._startingColor = s;
  }
  private _colorSimilarity = 0;
  public get colorSimilarity():number{
    return this._colorSimilarity;
  }
  private _layersToCreate = 0;
  public get layersToCreate():number{
    return this._layersToCreate;
  }
  private set layersToCreate(n:number){
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

}