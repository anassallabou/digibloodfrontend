import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewallreminderComponent} from './viewallreminder.component';

describe('ViewallreminderComponent', () => {
  let component: ViewallreminderComponent;
  let fixture: ComponentFixture<ViewallreminderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewallreminderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewallreminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
