import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector:'imgPreview',
  templateUrl:'./img-preview/img-preview.component.html',
  styleUrl:'./img-preview/img-preview.component.css'
})
export class imgPreview{}
@Component({
  selector:'imgPreviewLayers',
  templateUrl:'./img-preview-layers/img-preview-layers.component.html',
  styleUrl:'./img-preview-layers/img-preview-layers.component.css'
})
export class imgPreviewLayers{};
@Component({
  selector:'selectedFileSettings',
  templateUrl:'./selected-file-settings/selected-file-settings.component.html',
  styleUrl:'./selected-file-settings/selected-file-settings.component.css'
})
export class selectedFileSettings{};
@Component({
  selector:'selectedFilesSidebar',
  templateUrl:'./selected-files-sidebar/selected-files-sidebar.component.html',
  styleUrl:'./selected-files-sidebar/selected-files-sidebar.component.css'
})
export class selectedFilesSidebar{};
@Component({
  selector:'toolbar',
  templateUrl:'./toolbar/toolbar.component.html',
  styleUrl:'./toolbar/toolbar.component.css'
})
export class toolbar{};
@Component({
  selector:'controls',
  templateUrl:'./controls/controls.component.html',
  styleUrl:'./controls/controls.component.css'
})
export class controls{};
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, toolbar,selectedFileSettings,selectedFilesSidebar,imgPreview,imgPreviewLayers,controls],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'imgConvert';
}
