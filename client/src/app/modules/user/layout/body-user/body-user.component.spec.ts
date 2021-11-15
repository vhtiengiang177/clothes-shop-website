import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyUserComponent } from './body-user.component';

describe('BodyUserComponent', () => {
  let component: BodyUserComponent;
  let fixture: ComponentFixture<BodyUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
