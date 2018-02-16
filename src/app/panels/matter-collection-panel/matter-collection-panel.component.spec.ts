import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterCollectionPanelComponent } from './matter-collection-panel.component';

describe('MatterCollectionPanelComponent', () => {
  let component: MatterCollectionPanelComponent;
  let fixture: ComponentFixture<MatterCollectionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatterCollectionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatterCollectionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
