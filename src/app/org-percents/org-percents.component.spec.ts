import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgPercentsComponent } from './org-percents.component';

describe('OrgPercentsComponent', () => {
  let component: OrgPercentsComponent;
  let fixture: ComponentFixture<OrgPercentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgPercentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgPercentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
