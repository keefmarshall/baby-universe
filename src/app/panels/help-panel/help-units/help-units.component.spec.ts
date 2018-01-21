import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpUnitsComponent } from './help-units.component';

describe('HelpUnitsComponent', () => {
  let component: HelpUnitsComponent;
  let fixture: ComponentFixture<HelpUnitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpUnitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
