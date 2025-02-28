import { Component, Input} from '@angular/core';

@Component({
  selector: 'imgPreview',
  imports: [],
  templateUrl: './img-preview.component.html',
  styleUrl: './img-preview.component.css'
})
export class ImgPreviewComponent {
  @Input() recoloredImage?:Array<string>;
}
