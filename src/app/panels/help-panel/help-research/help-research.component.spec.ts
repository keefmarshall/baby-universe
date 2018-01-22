import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpResearchComponent } from './help-research.component';

describe('HelpResearchComponent', () => {
  let component: HelpResearchComponent;
  let fixture: ComponentFixture<HelpResearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpResearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
