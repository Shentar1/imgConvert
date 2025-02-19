import { Component } from '@angular/core';

@Component({
  selector: 'controls',
  imports: [],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.css'
})
export class ControlsComponent {
  controlButtonMouseDown(e:HTMLElement){
    e.style.boxShadow = "#111 1px 1px 10px 1px inset"
  }
  controlButtonMouseUp(e:HTMLElement){
    e.style.boxShadow = "#111 1px 1px 10px 1px"
  }
}
