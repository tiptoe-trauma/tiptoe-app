import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgPoliciesComponent } from './org-policies.component';

describe('OrgPoliciesComponent', () => {
  let component: OrgPoliciesComponent;
  let fixture: ComponentFixture<OrgPoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgPoliciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
