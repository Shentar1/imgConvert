import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDropDownComponent } from './file-drop-down.component';

describe('FileDropDownComponent', () => {
  let component: FileDropDownComponent;
  let fixture: ComponentFixture<FileDropDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileDropDownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
