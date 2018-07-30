import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgTpmSvgComponent } from './org-tpm-svg.component';

describe('OrgTpmSvgComponent', () => {
  let component: OrgTpmSvgComponent;
  let fixture: ComponentFixture<OrgTpmSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgTpmSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgTpmSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
