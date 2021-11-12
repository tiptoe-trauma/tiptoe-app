import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiptoeComponent } from './tiptoe.component';

describe('TiptoeComponent', () => {
  let component: TiptoeComponent;
  let fixture: ComponentFixture<TiptoeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiptoeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiptoeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
