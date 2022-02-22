import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterDashboardComponent } from './center-dashboard.component';

describe('CenterDashboardComponent', () => {
  let component: CenterDashboardComponent;
  let fixture: ComponentFixture<CenterDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
