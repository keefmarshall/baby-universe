import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterTableComponent } from './matter-table.component';

describe('MatterTableComponent', () => {
  let component: MatterTableComponent;
  let fixture: ComponentFixture<MatterTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatterTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
