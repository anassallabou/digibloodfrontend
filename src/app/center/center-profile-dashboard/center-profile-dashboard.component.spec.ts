import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterProfileDashboardComponent } from './center-profile-dashboard.component';

describe('CenterProfileDashboardComponent', () => {
  let component: CenterProfileDashboardComponent;
  let fixture: ComponentFixture<CenterProfileDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterProfileDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterProfileDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
