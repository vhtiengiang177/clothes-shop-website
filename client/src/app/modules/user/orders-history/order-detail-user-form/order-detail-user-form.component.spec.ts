import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailUserFormComponent } from './order-detail-user-form.component';

describe('OrderDetailUserFormComponent', () => {
  let component: OrderDetailUserFormComponent;
  let fixture: ComponentFixture<OrderDetailUserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailUserFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
