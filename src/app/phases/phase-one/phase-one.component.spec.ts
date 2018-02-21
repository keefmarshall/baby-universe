import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseOneComponent } from './phase-one.component';

describe('PhaseOneComponent', () => {
  let component: PhaseOneComponent;
  let fixture: ComponentFixture<PhaseOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhaseOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
