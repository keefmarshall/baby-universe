import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterstitialZeroComponent } from './interstitial-zero.component';

describe('InterstitialZeroComponent', () => {
  let component: InterstitialZeroComponent;
  let fixture: ComponentFixture<InterstitialZeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterstitialZeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterstitialZeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
