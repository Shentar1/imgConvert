import { Component, EventEmitter, Input, Output, viewChildren, ViewChildren} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ToolbarComponent} from './toolbar/toolbar.component'
import { ControlsComponent } from './controls/controls.component';
import { SelectedFilesSidebarComponent } from './selected-files-sidebar/selected-files-sidebar.component';
import { SelectedFileSettingsComponent } from './selected-file-settings/selected-file-settings.component';
import { ImgPreviewComponent } from './img-preview/img-preview.component';
import { ImgPreviewLayersComponent } from './img-preview-layers/img-preview-layers.component';
import { FileObject } from './Classes/FileObject'
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToolbarComponent,SelectedFileSettingsComponent,SelectedFilesSidebarComponent,ImgPreviewComponent,ImgPreviewLayersComponent,ControlsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'imgConvert';
  public clickedImage:any;
  public recoloredImage?:Array<string>;
  public noDragFunctions(e:Event){
    e.preventDefault();
    e.stopPropagation();
  }
  public imageClicked(e:FileObject){
    this.clickedImage = e;
  }
  public imageRecolored(s:Array<string>){
    this.recoloredImage = s;
  }
}
