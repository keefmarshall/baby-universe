import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeployButtonComponent } from './deploy-button.component';

describe('DeployButtonComponent', () => {
  let component: DeployButtonComponent;
  let fixture: ComponentFixture<DeployButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeployButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeployButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
