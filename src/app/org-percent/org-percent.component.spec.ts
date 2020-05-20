import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgPercentComponent } from './org-percent.component';

describe('OrgPercentComponent', () => {
  let component: OrgPercentComponent;
  let fixture: ComponentFixture<OrgPercentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgPercentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgPercentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
