import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperaturePanelComponent } from './temperature-panel.component';

describe('TemperaturePanelComponent', () => {
  let component: TemperaturePanelComponent;
  let fixture: ComponentFixture<TemperaturePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemperaturePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemperaturePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
