import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlsComponent } from './controls.component';

describe('ControlsComponent', () => {
  let component: ControlsComponent;
  let fixture: ComponentFixture<ControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have 4 buttons',()=>{
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.getElementsByClassName('button').length).toEqual(4);
  })
  it('should have a reset, convert, save, and cancel button',()=>{
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.getElementsByClassName('button');
    const b = Array.from(buttons);
    var validOptions = ['RESET', 'CONVERT', 'SAVE', 'CANCEL']
    b.forEach(button =>{
      if(button.textContent){
        if(validOptions.includes(button.textContent)){
          var index = validOptions.indexOf(button.textContent)
          validOptions.splice(index,1);
        }
      }
    })
    expect(validOptions.length).toEqual(0);
  })
});
