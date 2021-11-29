import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatListItemComponent } from './mat-list-item.component';

describe('MatListItemComponent', () => {
  let component: MatListItemComponent;
  let fixture: ComponentFixture<MatListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
