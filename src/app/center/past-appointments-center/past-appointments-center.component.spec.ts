import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastAppointmentsCenterComponent } from './past-appointments-center.component';

describe('PastAppointmentsCenterComponent', () => {
  let component: PastAppointmentsCenterComponent;
  let fixture: ComponentFixture<PastAppointmentsCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastAppointmentsCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastAppointmentsCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
