import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionPanelComponent } from './construction-panel.component';

describe('ConstructionPanelComponent', () => {
  let component: ConstructionPanelComponent;
  let fixture: ComponentFixture<ConstructionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstructionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
