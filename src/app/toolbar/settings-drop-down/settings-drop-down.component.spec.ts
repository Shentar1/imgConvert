import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsDropDownComponent } from './settings-drop-down.component';

describe('SettingsDropDownComponent', () => {
  let component: SettingsDropDownComponent;
  let fixture: ComponentFixture<SettingsDropDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsDropDownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
