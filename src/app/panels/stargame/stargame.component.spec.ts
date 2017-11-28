import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StargameComponent } from './stargame.component';

describe('StargameComponent', () => {
  let component: StargameComponent;
  let fixture: ComponentFixture<StargameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StargameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StargameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
