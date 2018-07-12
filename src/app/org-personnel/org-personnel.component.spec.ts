import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgPersonnelComponent } from './org-personnel.component';

describe('OrgPersonnelComponent', () => {
  let component: OrgPersonnelComponent;
  let fixture: ComponentFixture<OrgPersonnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgPersonnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
