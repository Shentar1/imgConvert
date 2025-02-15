import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedFilesSidebarComponent } from './selected-files-sidebar.component';

describe('SelectedFilesSidebarComponent', () => {
  let component: SelectedFilesSidebarComponent;
  let fixture: ComponentFixture<SelectedFilesSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedFilesSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedFilesSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
