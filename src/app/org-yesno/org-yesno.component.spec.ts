import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgYesNoComponent } from './org-yesno.component';

describe('OrgYesNoComponent', () => {
  let component: OrgYesNoComponent;
  let fixture: ComponentFixture<OrgYesNoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgYesNoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgYesNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
