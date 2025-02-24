import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ToolbarComponent} from './toolbar/toolbar.component'
import { ControlsComponent } from './controls/controls.component';
import { SelectedFilesSidebarComponent } from './selected-files-sidebar/selected-files-sidebar.component';
import { SelectedFileSettingsComponent } from './selected-file-settings/selected-file-settings.component';
import { ImgPreviewComponent } from './img-preview/img-preview.component';
import { ImgPreviewLayersComponent } from './img-preview-layers/img-preview-layers.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToolbarComponent,SelectedFileSettingsComponent,SelectedFilesSidebarComponent,ImgPreviewComponent,ImgPreviewLayersComponent,ControlsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'imgConvert' 
}
