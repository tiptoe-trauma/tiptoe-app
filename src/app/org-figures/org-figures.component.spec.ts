import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgFigureComponent } from './org-figures.component';

describe('OrgFigureComponent', () => {
  let component: OrgFigureComponent;
  let fixture: ComponentFixture<OrgFigureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgFigureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgFigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
