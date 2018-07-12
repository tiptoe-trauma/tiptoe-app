import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgTmdSvgComponent } from './org-tmd-svg.component';

describe('OrgTmdSvgComponent', () => {
  let component: OrgTmdSvgComponent;
  let fixture: ComponentFixture<OrgTmdSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgTmdSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgTmdSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
