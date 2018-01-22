import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpMachinesComponent } from './help-machines.component';

describe('HelpMachinesComponent', () => {
  let component: HelpMachinesComponent;
  let fixture: ComponentFixture<HelpMachinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpMachinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpMachinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
