import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAddFormComponent } from './staff-add-form.component';

describe('StaffAddFormComponent', () => {
  let component: StaffAddFormComponent;
  let fixture: ComponentFixture<StaffAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
