export class FileObject{
    
    private _name : string = '';
    public get name() : string {
        return this._name;
    }
    public set name(v : string) {
        this._name = v;
    }
    
    private _size : number = 0;
    public get size() : number {
        return this._size;
    }
    public set size(v : number) {
        this._size = v;
    }
    
    private _width : number = 0;
    public get width() : number{
        return this._width;
    }
    public set width(v : number) {
        this._width = v;
    }
    
    private _height : number = 0;
    public get height() : number {
        return this._height;
    }
    public set height(v : number) {
        this._height = v;
    }
    
    private _source : string = '';
    public get source() : string {
        return this._source;
    }
    public set source(v : string) {
        this._source = v;
    }
    
    private _icoHeight : number = 0;
    public get icoHeight() : number {
        return this._icoHeight;
    }
    public set icoHeight(v : number) {
        this._icoHeight = v;
    }
    
    private _icoWidth : number = 0;
    public get icoWidth() : number {
        return this._icoWidth;
    }
    public set icoWidth(v : number) {
        this._icoWidth = v;
    }
    
    public constructor(name:string,size:number,width:number,height:number,source:string,icoHeight:number,icoWidth:number){
        this.name = name;
        this.size = size;
        this.width = width;
        this.height = height;
        this.source = source;
        this.icoHeight = icoHeight;
        this.icoWidth = icoWidth;
    }
}