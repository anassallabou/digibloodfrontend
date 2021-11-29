import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewallnotificationsComponent} from './viewallnotifications.component';

describe('ViewallnotificationsComponent', () => {
  let component: ViewallnotificationsComponent;
  let fixture: ComponentFixture<ViewallnotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewallnotificationsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewallnotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
