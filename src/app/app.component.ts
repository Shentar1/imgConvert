import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector:'imgPreview',
  templateUrl:'./img-preview/img-preview.component.html',
  styleUrl:'./img-preview/img-preview.component.css'
})
@Component({
  selector:'imgPreviewLayers',
  templateUrl:'./img-preview-layers/img-preview-layers.component.html',
  styleUrl:'./img-layers-preview/img-preview-layers.component.css'
})
@Component({
  selector:'selectedFileSettings',
  templateUrl:'./selected-file-settings/selected-file-settings.component.html',
  styleUrl:'./selected-file-settings/selected-file-settings.component.css'
})
@Component({
  selector:'selectedFilesSidebar',
  templateUrl:'./selected-files-sidebar/selected-files-sidebar.component.html',
  styleUrl:'./selected-files-sidebar/selected-files-sidebar.component.css'
})

@Component({
  selector:'toolbar',
  templateUrl:'./toolbar/toolbar.component.html',
  styleUrl:'./toolbar/toolbar.component.css'
})

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'imgConvert';
}
