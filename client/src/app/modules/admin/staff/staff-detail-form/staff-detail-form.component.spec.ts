import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffDetailFormComponent } from './staff-detail-form.component';

describe('StaffDetailFormComponent', () => {
  let component: StaffDetailFormComponent;
  let fixture: ComponentFixture<StaffDetailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffDetailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
