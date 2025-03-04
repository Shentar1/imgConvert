

export class SettingsObject{
    /**
     * class properties - public get, private set
     */
    private _colorSimilarity = 1;
    public get colorSimilarity():number{
      return this._colorSimilarity;
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
  }