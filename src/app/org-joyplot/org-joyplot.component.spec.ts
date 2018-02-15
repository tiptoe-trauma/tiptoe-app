import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgJoyplotComponent } from './org-joyplot.component';

describe('OrgJoyplotComponent', () => {
  let component: OrgJoyplotComponent;
  let fixture: ComponentFixture<OrgJoyplotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgJoyplotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgJoyplotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
