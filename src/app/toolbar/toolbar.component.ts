import { Component, output } from '@angular/core';
import { EditDropDownComponent } from './edit-drop-down/edit-drop-down.component';
import { FileDropDownComponent } from './file-drop-down/file-drop-down.component';
import { SettingsDropDownComponent } from './settings-drop-down/settings-drop-down.component';

@Component({
  selector: 'toolbar',
  imports: [EditDropDownComponent,FileDropDownComponent,SettingsDropDownComponent],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  fileDisplay = 'none';
  editDisplay = 'none';
  settingsDisplay = 'none';
  toolbarItemClicked(c:any){
    c.visible==='hidden'?c.visible='visible':c.visible='hidden';
  }
}