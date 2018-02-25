import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogDrawerComponent } from './log-drawer.component';

describe('LogDrawerComponent', () => {
  let component: LogDrawerComponent;
  let fixture: ComponentFixture<LogDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
