import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedFileSettingsComponent } from './selected-file-settings.component';

describe('SelectedFileSettingsComponent', () => {
  let component: SelectedFileSettingsComponent;
  let fixture: ComponentFixture<SelectedFileSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedFileSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedFileSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
