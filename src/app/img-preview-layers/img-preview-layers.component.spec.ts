import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgPreviewLayersComponent } from './img-preview-layers.component';

describe('ImgPreviewLayersComponent', () => {
  let component: ImgPreviewLayersComponent;
  let fixture: ComponentFixture<ImgPreviewLayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgPreviewLayersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgPreviewLayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
