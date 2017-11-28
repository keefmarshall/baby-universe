import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeploymentPanelComponent } from './deployment-panel.component';

describe('DeploymentPanelComponent', () => {
  let component: DeploymentPanelComponent;
  let fixture: ComponentFixture<DeploymentPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeploymentPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeploymentPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
