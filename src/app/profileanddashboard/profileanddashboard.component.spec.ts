import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileanddashboardComponent } from './profileanddashboard.component';

describe('ProfileanddashboardComponent', () => {
  let component: ProfileanddashboardComponent;
  let fixture: ComponentFixture<ProfileanddashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileanddashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileanddashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
