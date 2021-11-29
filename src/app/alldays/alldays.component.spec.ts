import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AlldaysComponent} from './alldays.component';

describe('AlldaysComponent', () => {
  let component: AlldaysComponent;
  let fixture: ComponentFixture<AlldaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlldaysComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlldaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
