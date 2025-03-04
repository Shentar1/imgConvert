

export class SettingsObject{
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
    private _colorSimilarity = 1;
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